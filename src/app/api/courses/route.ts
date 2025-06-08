
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Changed to relative path
import CourseModel, { type ICourse } from '@/models/Course';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE), 10);
  const sortOption = searchParams.get('sort') || 'relevance';
  const searchQuery = searchParams.get('q');
  const categories = searchParams.getAll('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const ratings = searchParams.getAll('rating').map(Number).filter(r => r > 0);
  const levels = searchParams.getAll('level');
  const instructorTypes = searchParams.getAll('instructor');
  const languages = searchParams.getAll('language');
  const certification = searchParams.get('certification');

  try {
    const query: any = { approvalStatus: 'approved' };

    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }
    if (categories.length > 0) {
      query.category = { $in: categories.map(cat => new RegExp(cat.split('-').join(' '), 'i')) };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (ratings.length > 0) {
      query.rating = { $gte: Math.min(...ratings) };
    }
    if (levels.length > 0) {
      query.level = { $in: levels };
    }
    if (instructorTypes.length > 0) {
      query['providerInfo.type'] = { $in: instructorTypes };
    }
    if (languages.length > 0) {
      query.language = { $in: languages };
    }
    if (certification === 'true') {
      query.certificateAvailable = true;
    }

    let sort: any = {};
    switch (sortOption) {
      case 'price_asc': sort.price = 1; break;
      case 'price_desc': sort.price = -1; break;
      case 'rating_desc': sort.rating = -1; break;
      case 'newest': sort.lastUpdated = -1; break;
      case 'popularity': sort.studentsEnrolledCount = -1; break;
      default:
        if (searchQuery) {
          sort.score = { $meta: 'textScore' };
        } else {
          sort.lastUpdated = -1; // Default sort if no search query
        }
        break;
    }

    const courses = await CourseModel.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('seller', 'name avatarUrl verificationStatus')
      .lean();

    const totalCourses = await CourseModel.countDocuments(query);

    return NextResponse.json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      totalCourses,
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json({ message: 'Failed to fetch courses', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    // TODO: Add authentication and authorization checks here
    const body = await request.json();
    // TODO: Add robust validation for the body (e.g., using Zod)
    
    const newCourse = new CourseModel({
      ...body,
      approvalStatus: 'pending', // New courses should default to pending approval
      // seller: authenticatedUserId, // Link to the authenticated seller
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create course:', error);
    // if (error.name === 'ZodError') {
    //   return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    // }
    return NextResponse.json({ message: 'Failed to create course', error: error.message }, { status: 400 });
  }
}
