import dbConnect from '../src/lib/dbConnect';
import VisitEventModel from '../src/models/VisitEvent';
import UserModel from '../src/models/User';

async function testAnalyticsData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB successfully!');

    // Test VisitEvents collection
    console.log('\n📊 Testing VisitEvents collection...');
    const visitEventCount = await VisitEventModel.countDocuments();
    console.log(`📈 Total VisitEvents: ${visitEventCount.toLocaleString()}`);

    if (visitEventCount > 0) {
      // Get sample data
      const sampleVisitEvent = await VisitEventModel.findOne().lean();
      console.log('📋 Sample VisitEvent structure:');
      console.log(JSON.stringify(sampleVisitEvent, null, 2));

      // Get unique users count
      const uniqueUsers = await VisitEventModel.distinct('uniqueUserId');
      console.log(`👥 Unique Users: ${uniqueUsers.length.toLocaleString()}`);

      // Get unique sessions count
      const uniqueSessions = await VisitEventModel.distinct('sessionId');
      console.log(`🔗 Unique Sessions: ${uniqueSessions.length.toLocaleString()}`);

      // Get device breakdown
      const deviceBreakdown = await VisitEventModel.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      console.log('📱 Device Breakdown:');
      deviceBreakdown.forEach(device => {
        console.log(`  ${device._id || 'Unknown'}: ${device.count.toLocaleString()}`);
      });

      // Get date range of data
      const dateRange = await VisitEventModel.aggregate([
        {
          $group: {
            _id: null,
            minDate: { $min: '$timestamp' },
            maxDate: { $max: '$timestamp' }
          }
        }
      ]);
      if (dateRange[0]) {
        console.log(`📅 Data Range: ${dateRange[0].minDate} to ${dateRange[0].maxDate}`);
      }
    }

    // Test Users collection
    console.log('\n👤 Testing Users collection...');
    const userCount = await UserModel.countDocuments();
    console.log(`👥 Total Users: ${userCount.toLocaleString()}`);

    if (userCount > 0) {
      const sampleUser = await UserModel.findOne().select('name email role createdAt').lean();
      console.log('📋 Sample User structure:');
      console.log(JSON.stringify(sampleUser, null, 2));
    }

    console.log('\n✅ Analytics data test completed successfully!');
    console.log('\n🚀 Your analytics dashboard should now work with this data.');
    
  } catch (error) {
    console.error('❌ Error testing analytics data:', error);
  } finally {
    process.exit(0);
  }
}

testAnalyticsData();