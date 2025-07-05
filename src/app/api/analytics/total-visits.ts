import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';
import UserActionEvent from '@/models/UserActionEvent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    console.log('MongoDB connected for total visits');

    // Aggregate visit data with associated click events
    const visits = await VisitEvent.aggregate([
      {
        $lookup: {
          from: 'useractionevents',
          localField: 'sessionId',
          foreignField: 'sessionId',
          as: 'clickEvents',
        },
      },
      {
        $project: {
          _id: 1,
          sessionId: 1,
          visitorAlias: 1,
          path: 1,
          timestamp: 1,
          clickEvents: {
            $map: {
              input: '$clickEvents',
              as: 'click',
              in: {
                _id: '$$click._id',
                elementText: '$$click.action',
                href: '$$click.href',
                timestamp: '$$click.timestamp',
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(visits);
  } catch (error) {
    console.error('Total Visits API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}