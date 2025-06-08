
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import CourseModel from '../../../models/Course'; // Relative path
import { ITEMS_PER_PAGE } from '../../../lib/constants'; // Relative path

interface ApiResponse {
  courses: any[]; // Using any for now, replace with actual Course type if available
  totalPages: number;
  currentPage: number;
  totalCourses: number;
}

export async function GET(request: NextRequest) {
  console.log('🟢 [/api/courses] GET request received');
  let query: any = { approvalStatus: 'approved' }; 
  let sort: any = {}; 

  try {
    await dbConnect();
    console.log('🟢 [/api/courses] MongoDB connected successfully.');

    const searchParams = request.nextUrl.searchParams;
    console.log('🟢 [/api/courses] Search Params:', searchParams.toString());

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE), 10);
    const sortOption = searchParams.get('sort') || 'relevance';
    const searchQuery = searchParams.get('q'); // Can be null or empty string
    const categories = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const ratings = searchParams.getAll('rating').map(Number).filter(r => !isNaN(r) && r > 0);
    const levels = searchParams.getAll('level');
    const instructorTypes = searchParams.getAll('instructor');
    const languages = searchParams.getAll('language');
    const certification = searchParams.get('certification');

    console.log(`🟢 [/api/courses] Parsed Params: page=${page}, limit=${limit}, sort=${sortOption}, q=${searchQuery}, categories=${categories.join(',')}, ratings=${ratings.join(',')}`);

    // Build the query object
    if (searchQuery && searchQuery.trim() !== '') {
      query.$text = { $search: searchQuery.trim() };
      console.log('🟢 [/api/courses] Added text search to query for:', searchQuery.trim());
    }
    if (categories.length > 0) {
      query.category = { $in: categories.map(cat => new RegExp(cat.split('-').join(' '), 'i')) };
      console.log('🟢 [/api/courses] Added category filter to query');
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
      console.log('🟢 [/api/courses] Added price filter to query');
    }
    if (ratings.length > 0) {
      query.rating = { $gte: Math.min(...ratings) };
      console.log('🟢 [/api/courses] Added rating filter to query');
    }
    if (levels.length > 0) {
      query.level = { $in: levels };
      console.log('🟢 [/api/courses] Added level filter to query');
    }
    if (instructorTypes.length > 0) {
      query['providerInfo.type'] = { $in: instructorTypes };
      console.log('🟢 [/api/courses] Added instructor type filter to query');
    }
    if (languages.length > 0) {
      query.language = { $in: languages.map(lang => new RegExp(lang, 'i')) };
      console.log('🟢 [/api/courses] Added language filter to query');
    }
    if (certification === 'true') {
      query.certificateAvailable = true;
      console.log('🟢 [/api/courses] Added certification filter to query');
    }

    console.log('🟢 [/api/courses] Final Query Object:', JSON.stringify(query));

    // Determine sort order
    if (sortOption === 'relevance' && searchQuery && searchQuery.trim() !== '') {
      // Only sort by textScore if a text search is active
      sort.score = { $meta: 'textScore' };
    } else if (sortOption === 'price_asc') {
      sort.price = 1;
    } else if (sortOption === 'price_desc') {
      sort.price = -1;
    } else if (sortOption === 'rating_desc') {
      sort.rating = -1;
    } else if (sortOption === 'popularity') {
      sort.studentsEnrolledCount = -1;
    } else { // Default to newest if relevance isn't applicable or another sort isn't chosen
      sort.lastUpdated = -1;
    }
    console.log('🟢 [/api/courses] Final Sort Object:', JSON.stringify(sort));

    console.log('🟢 [/api/courses] Attempting CourseModel.find()');
    const courses = await CourseModel.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('seller', 'name avatarUrl verificationStatus')
      .lean();
    console.log('🟢 [/api/courses] CourseModel.find() successful, courses found:', courses.length);

    console.log('🟢 [/api/courses] Attempting CourseModel.countDocuments()');
    const totalCourses = await CourseModel.countDocuments(query);
    console.log('🟢 [/api/courses] CourseModel.countDocuments() successful, totalCourses:', totalCourses);

    return NextResponse.json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      totalCourses,
    });

  } catch (error: any) {
    console.error('🔴 Failed to fetch courses (API Route /api/courses/route.ts):', error);
    // Log the state of query and sort at the time of error
    console.error('🔴 Query object at error:', JSON.stringify(query, null, 2));
    console.error('🔴 Sort object at error:', JSON.stringify(sort, null, 2));
    return NextResponse.json({
        message: 'Failed to fetch courses from API.',
        error: error.message,
        errorStack: error.stack, // Include stack trace for more detailed debugging
        queryState: query, // Include state of query object
        sortState: sort    // Include state of sort object
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    // TODO: Add authentication and authorization checks here
    // For example, ensure only verified sellers can create courses
    const body = await request.json();
    // TODO: Add robust validation for the body (e.g., using Zod)
    
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', // New courses should default to pending approval
      // seller: authenticatedUserId, // TODO: Link to the authenticated seller after implementing auth
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error('🔴 Failed to create course (API Route /api/courses/route.ts POST):', error);
    // Consider more specific error handling, e.g., for validation errors
    // if (error.name === 'ZodError') { // Example if using Zod for validation
    //   return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    // }
    return NextResponse.json({ message: 'Failed to create course', error: error.message, details: error.stack }, { status: 400 });
  }
}
