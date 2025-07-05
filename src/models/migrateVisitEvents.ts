import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import ClickEventModel from '@/models/ClickEvent';

async function cleanupVisitorAliasFields() {
  await dbConnect();
  
  try {
    console.log('Starting cleanup of visitorAlias fields...');
    
    // Remove visitorAlias field from all VisitEvent documents
    const visitResult = await VisitEventModel.updateMany(
      { visitorAlias: { $exists: true } },
      { $unset: { visitorAlias: "" } }
    );
    
    console.log(`Removed visitorAlias from ${visitResult.modifiedCount} visit events`);
    
    // Remove visitorAlias field from all ClickEvent documents
    const clickResult = await ClickEventModel.updateMany(
      { visitorAlias: { $exists: true } },
      { $unset: { visitorAlias: "" } }
    );
    
    console.log(`Removed visitorAlias from ${clickResult.modifiedCount} click events`);
    
    // Verify cleanup
    const remainingVisits = await VisitEventModel.countDocuments({ visitorAlias: { $exists: true } });
    const remainingClicks = await ClickEventModel.countDocuments({ visitorAlias: { $exists: true } });
    
    if (remainingVisits === 0 && remainingClicks === 0) {
      console.log('✅ Cleanup completed successfully - all visitorAlias fields removed');
    } else {
      console.log(`⚠️  Cleanup incomplete: ${remainingVisits} visits and ${remainingClicks} clicks still have visitorAlias`);
    }
    
    // Show current collection stats
    const totalVisits = await VisitEventModel.countDocuments();
    const totalClicks = await ClickEventModel.countDocuments();
    const uniqueSessions = await VisitEventModel.distinct('sessionId');
    
    console.log('\n📊 Current Stats:');
    console.log(`- Total visit events: ${totalVisits}`);
    console.log(`- Total click events: ${totalClicks}`);
    console.log(`- Unique sessions: ${uniqueSessions.length}`);
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

// Run the cleanup
cleanupVisitorAliasFields();