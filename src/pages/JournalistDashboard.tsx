
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  AreaChart, 
  LineChart, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  ThumbsUp, 
  Eye, 
  MessageCircle, 
  FileText,
  Settings,
  PlusCircle,
  Filter,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JournalistSidebar from '@/components/journalists/JournalistSidebar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockData = {
  viewsPerDay: [1200, 1350, 890, 1500, 1800, 2200, 1900],
  likesPerDay: [45, 30, 55, 80, 65, 90, 70],
  commentsByStory: [
    { story: "Climate Change Impact", value: 24 },
    { story: "Tech Revolution", value: 18 },
    { story: "Political Analysis", value: 32 },
    { story: "Educational Reforms", value: 12 }
  ],
  viewsByStory: [
    { story: "Climate Change Impact", value: 4500 },
    { story: "Tech Revolution", value: 3800 },
    { story: "Political Analysis", value: 5200 },
    { story: "Educational Reforms", value: 2900 }
  ],
  recentStories: [
    {
      id: "s1",
      title: "Climate Change Impact on Global Agriculture",
      publishedAt: "2024-05-01",
      readTime: 8,
      category: "Environment",
      viewsCount: 4500,
      commentsCount: 24,
      likesCount: 180,
      status: "published"
    },
    {
      id: "s2",
      title: "Tech Revolution in Rural Communities",
      publishedAt: "2024-04-25",
      readTime: 5,
      category: "Technology",
      viewsCount: 3800,
      commentsCount: 18,
      likesCount: 92,
      status: "published"
    },
    {
      id: "s3",
      title: "Political Analysis: Election Year Insights",
      publishedAt: "2024-04-18",
      readTime: 12,
      category: "Politics",
      viewsCount: 5200,
      commentsCount: 32,
      likesCount: 215,
      status: "published"
    },
    {
      id: "s4",
      title: "Next Generation Education - Draft",
      publishedAt: "2024-05-05",
      readTime: 7,
      category: "Education",
      viewsCount: 0,
      commentsCount: 0,
      likesCount: 0,
      status: "draft"
    }
  ],
  verificationProgress: 75,
  followerCount: 3240,
  totalStories: 28,
  totalViews: 98500,
  avgStoryLength: 1800,
  authorRank: 24,
  recentComments: [
    {
      username: "ReaderOne",
      text: "Excellent analysis on the climate impact. Very well researched!",
      date: "2024-05-05",
      story: "Climate Change Impact"
    },
    {
      username: "JournalismFan",
      text: "I disagree with your take on the political implications. Here's why...",
      date: "2024-05-04",
      story: "Political Analysis"
    },
    {
      username: "TechGuru",
      text: "This tech approach could revolutionize how rural communities access services.",
      date: "2024-05-03",
      story: "Tech Revolution"
    }
  ]
};

const JournalistDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleNewStory = () => {
    toast({
      title: "Feature coming soon",
      description: "The story editor will be available in the next update",
    });
  };

  const handleApplyVerification = () => {
    toast({
      title: "Verification requested",
      description: "Your verification request has been submitted. We'll review your profile soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <JournalistSidebar />
        
        <div className="flex-1 bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Journalist Dashboard</h1>
                <p className="text-muted-foreground">Manage your stories and track performance</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleNewStory}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Story
                </Button>
                {mockData.verificationProgress < 100 && (
                  <Button variant="outline" onClick={handleApplyVerification}>
                    <Award className="mr-2 h-4 w-4" />
                    Get Verified
                  </Button>
                )}
              </div>
            </div>
            
            {mockData.verificationProgress < 100 && (
              <Card className="mb-6 border-amber-200 bg-amber-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-800 text-lg flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-amber-800">Complete your profile to get verified</span>
                      <span className="text-sm font-medium text-amber-800">{mockData.verificationProgress}%</span>
                    </div>
                    <Progress value={mockData.verificationProgress} className="h-2 bg-amber-200" indicatorClassName="bg-amber-500" />
                    <p className="text-xs text-amber-700 mt-2">
                      Verified journalists get more visibility and credibility on the platform.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{mockData.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <ChevronUp className="h-4 w-4 mr-1" />
                      12%
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Followers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{mockData.followerCount.toLocaleString()}</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <ChevronUp className="h-4 w-4 mr-1" />
                      5%
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Published Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{mockData.totalStories}</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <ChevronUp className="h-4 w-4 mr-1" />
                      3%
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Author Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">#{mockData.authorRank}</div>
                    <div className="text-sm text-red-600 flex items-center">
                      <ChevronDown className="h-4 w-4 mr-1" />
                      2
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Views & Engagement</CardTitle>
                      <CardDescription>Weekly performance</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                      <div className="text-center text-muted-foreground">
                        <AreaChart className="h-12 w-12 mx-auto mb-2 opacity-75" />
                        <p>Analytics chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Comments</CardTitle>
                      <CardDescription>What readers are saying</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.recentComments.map((comment, i) => (
                          <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-gray-100">
                                  {comment.username.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-1">
                                  <p className="text-sm font-medium">{comment.username}</p>
                                  <span className="text-xs text-muted-foreground">• {comment.date}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  on <span className="font-medium">{comment.story}</span>
                                </p>
                                <p className="text-sm mt-1 line-clamp-1">{comment.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm">View All Comments</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Stories</CardTitle>
                    <CardDescription>Your latest published and draft stories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockData.recentStories.map((story) => (
                        <div 
                          key={story.id} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-2 flex-1">
                            <FileText className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium">{story.title}</h3>
                                <Badge variant={story.status === "published" ? "default" : "outline"} className="uppercase text-[10px]">
                                  {story.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {story.publishedAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {story.readTime} min read
                                </span>
                                <Badge variant="secondary" className="text-xs">{story.category}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          {story.status === "published" && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2 sm:mt-0">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{story.viewsCount.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{story.commentsCount}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{story.likesCount}</span>
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Story</DropdownMenuItem>
                                <DropdownMenuItem>Edit Story</DropdownMenuItem>
                                {story.status === "published" ? (
                                  <DropdownMenuItem>Unpublish</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>Publish</DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Stories</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="stories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Your Stories</CardTitle>
                        <CardDescription>Manage all your published and draft stories</CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Filter className="h-3 w-3 mr-1" />
                          Filter
                        </Button>
                        <Button size="sm" className="h-8">
                          <PlusCircle className="h-3 w-3 mr-1" />
                          New Story
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Story management coming soon</h3>
                      <p className="text-muted-foreground">
                        This feature is still in development.
                      </p>
                      <Button className="mt-4">Create your first story</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>Detailed insights about your stories and audience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <BarChart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Advanced analytics coming soon</h3>
                      <p className="text-muted-foreground">
                        Detailed analytics features are being developed.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JournalistDashboard;
