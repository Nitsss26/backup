import mongoose from 'mongoose';
import VisitEvent from '../src/models/VisitEvent';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Sample UTM sources and their weights
const UTM_SOURCES = [
  { source: 'google', weight: 40 },
  { source: 'whatsapp', weight: 20 },
  { source: 'instagram', weight: 15 },
  { source: 'linkedin', weight: 10 },
  { source: 'youtube', weight: 8 },
  { source: 'googleform', weight: 4 },
  { source: 'facebook', weight: 2 },
  { source: 'twitter', weight: 1 }
];

// Indian states and cities
const INDIAN_LOCATIONS = [
  { state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
  { state: 'Delhi', cities: ['New Delhi', 'Delhi'] },
  { state: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli'] },
  { state: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai'] },
  { state: 'Telangana', cities: ['Hyderabad', 'Warangal'] },
  { state: 'West Bengal', cities: ['Kolkata', 'Howrah'] },
  { state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara'] },
  { state: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur'] },
  { state: 'Punjab', cities: ['Amritsar', 'Ludhiana', 'Jalandhar'] },
  { state: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Agra'] }
];

const SAMPLE_PATHS = [
  '/',
  '/courses',
  '/courses/pw/iit-jee',
  '/courses/pw/neet',
  '/courses/pw/computer-science',
  '/subscriptions',
  '/about',
  '/contact',
  '/books',
  '/physics-wallah'
];

function getRandomUtmSource(): string {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const { source, weight } of UTM_SOURCES) {
    cumulative += weight;
    if (random <= cumulative) {
      return source;
    }
  }
  
  return 'google'; // fallback
}

function getRandomLocation() {
  const location = INDIAN_LOCATIONS[Math.floor(Math.random() * INDIAN_LOCATIONS.length)];
  const city = location.cities[Math.floor(Math.random() * location.cities.length)];
  return { state: location.state, city };
}

function getRandomPath(): string {
  return SAMPLE_PATHS[Math.floor(Math.random() * SAMPLE_PATHS.length)];
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateUniqueUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function seedAnalyticsData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing analytics data...');
    await VisitEvent.deleteMany({});

    const events = [];
    const now = new Date();
    
    // Generate data for the last 30 days
    for (let day = 0; day < 30; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() - day);
      
      // Generate 50-200 events per day
      const eventsPerDay = Math.floor(Math.random() * 150) + 50;
      
      for (let i = 0; i < eventsPerDay; i++) {
        const utmSource = getRandomUtmSource();
        const location = getRandomLocation();
        const path = getRandomPath();
        const sessionId = generateSessionId();
        const uniqueUserId = generateUniqueUserId();
        
        // Random time within the day
        const eventTime = new Date(date);
        eventTime.setHours(Math.floor(Math.random() * 24));
        eventTime.setMinutes(Math.floor(Math.random() * 60));
        
        const event = {
          sessionId,
          uniqueUserId,
          path,
          url: `https://example.com${path}?utm_source=${utmSource}`,
          timestamp: eventTime,
          duration: Math.floor(Math.random() * 300000) + 10000, // 10s to 5min
          geoData: {
            country: 'India',
            state: location.state,
            city: location.city,
            lat: 20 + Math.random() * 15, // Rough India latitude range
            lng: 68 + Math.random() * 30  // Rough India longitude range
          },
          device: Math.random() > 0.6 ? 'mobile' : 'desktop',
          browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
          userAgent: 'Mozilla/5.0 (compatible; Analytics Seeder)',
          trafficSource: utmSource,
          utmSource: utmSource,
          utmMedium: ['social', 'email', 'cpc', 'organic'][Math.floor(Math.random() * 4)],
          utmCampaign: `campaign_${utmSource}_${Math.floor(Math.random() * 10)}`
        };
        
        events.push(event);
      }
    }

    console.log(`Inserting ${events.length} analytics events...`);
    await VisitEvent.insertMany(events);
    
    console.log('✅ Analytics data seeded successfully!');
    console.log(`📊 Generated ${events.length} events across 30 days`);
    
    // Show some stats
    const stats = await VisitEvent.aggregate([
      {
        $group: {
          _id: '$utmSource',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📈 UTM Source Distribution:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} events`);
    });

  } catch (error) {
    console.error('Error seeding analytics data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedAnalyticsData();