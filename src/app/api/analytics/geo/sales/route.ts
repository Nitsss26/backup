import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    await dbConnect();

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Get sales/purchase events by location (state and city)
    const geoData = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          eventType: 'purchase'
        }
      },
      {
        $addFields: {
          state: {
            $cond: {
              if: { $regexMatch: { input: "$userAgent", regex: /Mumbai|Maharashtra/i } },
              then: "Maharashtra",
              else: {
                $cond: {
                  if: { $regexMatch: { input: "$userAgent", regex: /Delhi|NCR/i } },
                  then: "Delhi",
                  else: {
                    $cond: {
                      if: { $regexMatch: { input: "$userAgent", regex: /Bangalore|Karnataka/i } },
                      then: "Karnataka",
                      else: {
                        $cond: {
                          if: { $regexMatch: { input: "$userAgent", regex: /Chennai|Tamil Nadu/i } },
                          then: "Tamil Nadu",
                          else: {
                            $cond: {
                              if: { $regexMatch: { input: "$userAgent", regex: /Hyderabad|Telangana/i } },
                              then: "Telangana",
                              else: {
                                $cond: {
                                  if: { $regexMatch: { input: "$userAgent", regex: /Pune/i } },
                                  then: "Maharashtra",
                                  else: {
                                    $cond: {
                                      if: { $regexMatch: { input: "$userAgent", regex: /Kolkata|West Bengal/i } },
                                      then: "West Bengal",
                                      else: "Punjab"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          city: {
            $cond: {
              if: { $regexMatch: { input: "$userAgent", regex: /Mumbai/i } },
              then: "Mumbai",
              else: {
                $cond: {
                  if: { $regexMatch: { input: "$userAgent", regex: /Delhi/i } },
                  then: "Delhi",
                  else: {
                    $cond: {
                      if: { $regexMatch: { input: "$userAgent", regex: /Bangalore/i } },
                      then: "Bangalore",
                      else: {
                        $cond: {
                          if: { $regexMatch: { input: "$userAgent", regex: /Chennai/i } },
                          then: "Chennai",
                          else: {
                            $cond: {
                              if: { $regexMatch: { input: "$userAgent", regex: /Hyderabad/i } },
                              then: "Hyderabad",
                              else: {
                                $cond: {
                                  if: { $regexMatch: { input: "$userAgent", regex: /Pune/i } },
                                  then: "Pune",
                                  else: {
                                    $cond: {
                                      if: { $regexMatch: { input: "$userAgent", regex: /Kolkata/i } },
                                      then: "Kolkata",
                                      else: "Amritsar"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            state: "$state",
            city: "$city"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          state: "$_id.state",
          city: "$_id.city",
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return NextResponse.json(geoData);
  } catch (error) {
    console.error('Error fetching sales geo data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}