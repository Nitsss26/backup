
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MousePointerClick, User, Clock, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ClickEvent {
    _id: string;
    timestamp: string;
    sessionId: string;
    userName: string;
    userEmail: string;
    details: {
        path: string;
        elementType?: string;
        elementText?: string;
        section?: string;
        href?: string;
    };
}

interface ClicksTableProps {
    startDate?: Date;
    endDate?: Date;
}

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b border-slate-700">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
            </div>
        ))}
    </div>
);

export default function ClicksTable({ startDate, endDate }: ClicksTableProps) {
    const [data, setData] = useState<ClickEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `/api/analytics/clicks?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${currentPage}`
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.error) {
                    throw new Error(result.message || result.error);
                }
                
                setData(result.data || []);
                setPagination(result.pagination);
            } catch (error) {
                console.error("Error fetching click events:", error);
                setError(error instanceof Error ? error.message : 'Failed to load click events');
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [startDate, endDate, currentPage]);

    const enhanceElementInfo = (event: ClickEvent) => {
        const { elementType, elementText, section, href } = event.details;
        
        // PROFESSIONAL ENHANCED LOGIC for element detection
        
        // Priority 1: Meaningful text content
        if (elementText && elementText.trim() !== '' && elementText.trim() !== 'undefined' && elementText.trim() !== 'null') {
            const text = elementText.trim();
            // Clean up common meaningless texts
            if (!['div', 'span', 'click', 'button', '...', 'undefined', 'null'].includes(text.toLowerCase())) {
                return text.length > 50 ? `${text.substring(0, 50)}...` : text;
            }
        }
        
        // Priority 2: Meaningful href links
        if (href && href !== '#' && href !== 'javascript:void(0)' && href !== 'undefined') {
            const cleanHref = href.replace(window.location.origin, '');
            if (cleanHref.startsWith('/')) {
                const pathParts = cleanHref.split('/').filter(Boolean);
                if (pathParts.length > 0) {
                    return `Navigate to: /${pathParts.join('/')}`;
                }
            }
            return `External Link: ${href}`;
        }
        
        // Priority 3: Enhanced element type mapping with context
        if (elementType) {
            const type = elementType.toLowerCase();
            const contextualTypeMap: { [key: string]: string } = {
                'button': 'Action Button',
                'a': 'Navigation Link',
                'input': 'Form Input',
                'textarea': 'Text Area',
                'select': 'Dropdown Menu',
                'img': 'Image Element',
                'video': 'Video Player',
                'canvas': 'Interactive Canvas',
                'svg': 'Icon/Graphic',
                'nav': 'Navigation Menu',
                'header': 'Page Header',
                'footer': 'Page Footer',
                'aside': 'Sidebar Content',
                'main': 'Main Content',
                'article': 'Article Content',
                'section': 'Content Section',
                'div': 'Content Container',
                'span': 'Text Element',
                'p': 'Paragraph Text',
                'h1': 'Main Heading',
                'h2': 'Section Heading',
                'h3': 'Subsection Heading',
                'h4': 'Minor Heading',
                'h5': 'Small Heading',
                'h6': 'Tiny Heading',
                'ul': 'List Container',
                'ol': 'Numbered List',
                'li': 'List Item',
                'table': 'Data Table',
                'tr': 'Table Row',
                'td': 'Table Cell',
                'th': 'Table Header',
                'form': 'Form Container',
                'label': 'Form Label'
            };
            return contextualTypeMap[type] || `${type.charAt(0).toUpperCase()}${type.slice(1)} Element`;
        }
        
        // Priority 4: Fallback with path context
        const pathContext = event.details.path;
        if (pathContext.includes('admin')) return 'Admin Interface Element';
        if (pathContext.includes('course')) return 'Course Content Element';
        if (pathContext.includes('book')) return 'Book Content Element';
        if (pathContext.includes('cart')) return 'Shopping Cart Element';
        if (pathContext.includes('checkout')) return 'Checkout Process Element';
        
        return 'Interactive Element';
    };

    const enhanceSectionInfo = (event: ClickEvent) => {
        const { section, path } = event.details;
        
        // PROFESSIONAL ENHANCED LOGIC for section detection
        
        // Priority 1: Explicit section if meaningful
        if (section && section.trim() !== '' && section.trim() !== 'undefined' && section.trim() !== 'null' && section.trim() !== 'unknown') {
            const cleanSection = section.trim();
            // Map common section IDs to meaningful names
            const sectionIdMap: { [key: string]: string } = {
                'header': 'Page Header',
                'nav': 'Navigation Bar',
                'navbar': 'Navigation Bar',
                'sidebar': 'Side Panel',
                'main': 'Main Content',
                'content': 'Content Area',
                'footer': 'Page Footer',
                'hero': 'Hero Section',
                'banner': 'Banner Area',
                'carousel': 'Image Carousel',
                'gallery': 'Image Gallery',
                'testimonials': 'Testimonials',
                'features': 'Features Section',
                'pricing': 'Pricing Section',
                'contact': 'Contact Section',
                'about': 'About Section',
                'services': 'Services Section',
                'portfolio': 'Portfolio Section',
                'blog': 'Blog Section',
                'news': 'News Section',
                'faq': 'FAQ Section',
                'search': 'Search Area',
                'filters': 'Filter Controls',
                'pagination': 'Page Navigation',
                'breadcrumb': 'Breadcrumb Navigation',
                'tabs': 'Tab Navigation',
                'accordion': 'Accordion Panel',
                'modal': 'Modal Dialog',
                'dropdown': 'Dropdown Menu',
                'tooltip': 'Tooltip',
                'alert': 'Alert Message',
                'notification': 'Notification',
                'form': 'Form Section',
                'login': 'Login Area',
                'signup': 'Registration Area',
                'profile': 'Profile Section',
                'dashboard': 'Dashboard Panel',
                'analytics': 'Analytics Panel',
                'settings': 'Settings Panel',
                'admin': 'Admin Panel'
            };
            
            const lowerSection = cleanSection.toLowerCase();
            if (sectionIdMap[lowerSection]) {
                return sectionIdMap[lowerSection];
            }
            
            // Return cleaned section name if not in map but meaningful
            return cleanSection.charAt(0).toUpperCase() + cleanSection.slice(1).replace(/[-_]/g, ' ');
        }
        
        // Priority 2: Intelligent path-based section detection
        const pathSegments = path.split('/').filter(Boolean);
        
        if (pathSegments.length === 0) {
            return 'Homepage';
        }
        
        const mainSection = pathSegments[0].toLowerCase();
        const subSection = pathSegments[1]?.toLowerCase();
        
        // Comprehensive section mapping based on URL structure
        const pathSectionMap: { [key: string]: string } = {
            'admin': 'Admin Dashboard',
            'dashboard': 'User Dashboard',
            'profile': 'User Profile',
            'settings': 'Account Settings',
            'courses': 'Courses Catalog',
            'course': 'Course Details',
            'books': 'Books Library',
            'book': 'Book Details',
            'ebooks': 'E-Books Section',
            'cart': 'Shopping Cart',
            'checkout': 'Checkout Process',
            'payment': 'Payment Gateway',
            'orders': 'Order Management',
            'wishlist': 'Wishlist',
            'favorites': 'Favorites',
            'auth': 'Authentication',
            'login': 'Login Page',
            'signup': 'Registration Page',
            'register': 'Registration Page',
            'forgot-password': 'Password Recovery',
            'reset-password': 'Password Reset',
            'about': 'About Us',
            'contact': 'Contact Us',
            'help': 'Help Center',
            'support': 'Customer Support',
            'faq': 'FAQ Section',
            'terms': 'Terms of Service',
            'privacy': 'Privacy Policy',
            'blog': 'Blog Section',
            'news': 'News Section',
            'events': 'Events Section',
            'careers': 'Careers Page',
            'press': 'Press Releases',
            'api': 'API Documentation',
            'docs': 'Documentation',
            'search': 'Search Results',
            'categories': 'Category Browser',
            'tags': 'Tag Browser',
            'analytics': 'Analytics Dashboard',
            'reports': 'Reports Section',
            'subscriptions': 'Subscriptions',
            'billing': 'Billing Information',
            'notifications': 'Notifications',
            'messages': 'Messages',
            'inbox': 'Inbox',
            'forums': 'Community Forums',
            'discussions': 'Discussions',
            'reviews': 'Reviews Section',
            'ratings': 'Ratings Section'
        };
        
        // Check for specific subsection patterns
        if (mainSection === 'admin' && subSection) {
            const adminSubSections: { [key: string]: string } = {
                'users': 'User Management',
                'courses': 'Course Management',
                'books': 'Book Management',
                'orders': 'Order Management',
                'analytics': 'Analytics Dashboard',
                'settings': 'System Settings',
                'reports': 'Reports Panel',
                'content': 'Content Management'
            };
            if (adminSubSections[subSection]) {
                return `Admin: ${adminSubSections[subSection]}`;
            }
        }
        
        if (pathSectionMap[mainSection]) {
            return pathSectionMap[mainSection];
        }
        
        // Priority 3: Generate meaningful section name from path
        const formattedSection = mainSection
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
        return `${formattedSection} Section`;
    };

    if (isLoading) {
        return (
            <Card className="bg-[#1E293B] border-slate-700">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5 text-orange-400" />
                        Recent Click Events
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoadingSkeleton />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-[#1E293B] border-slate-700">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5 text-orange-400" />
                        Recent Click Events
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="text-red-400 mb-2">Error loading click events</div>
                        <div className="text-gray-400 text-sm">{error}</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-[#1E293B] border-slate-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-white flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5 text-orange-400" />
                        Recent Click Events
                        <span className="text-sm text-gray-400 font-normal">
                            ({pagination?.totalItems || data.length} total clicks)
                        </span>
                    </CardTitle>
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <Info className="h-4 w-4" />
                    </button>
                </div>
                {showInfo && (
                    <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400">
                        <strong>How it's calculated:</strong> Shows ALL click events from UserActionEvent model where actionType='click'. 
                        Enhanced professional logic identifies elements and sections accurately. Pagination shows 20 entries per page with access to ALL data from day 1.
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-[#1E293B]">
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Time
                                    </div>
                                </th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        User
                                    </div>
                                </th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Page</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Section</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Element</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event, index) => (
                                <tr key={`${event._id}-${index}`} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="text-white text-sm">
                                            {new Date(event.timestamp).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-400 font-mono">
                                            {event.sessionId.substring(0, 8)}...
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-white">{event.userName}</div>
                                        <div className="text-xs text-gray-400">{event.userEmail}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-blue-400 font-mono text-sm">
                                            {event.details.path}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-purple-400 text-sm">
                                            {enhanceSectionInfo(event)}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-green-400 text-sm">
                                            {enhanceElementInfo(event)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No click events found for the selected period
                        </div>
                    )}
                </div>

                {/* Pagination Controls for ALL entries */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <div className="text-sm text-gray-400">
                            Page {pagination.currentPage} of {pagination.totalPages} 
                            ({pagination.totalItems.toLocaleString()} total clicks from day 1)
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={!pagination.hasPrevPage}
                                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={!pagination.hasNextPage}
                                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

