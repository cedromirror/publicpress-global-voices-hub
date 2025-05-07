
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Calendar, 
  Globe, 
  Bookmark, 
  FileText, 
  Share2, 
  Users, 
  BookOpen,
  Star,
  Award,
  Twitter,
  Linkedin,
  ChevronRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Clock,
  MessageCircle,
  ThumbsUp,
  LayoutDashboard
} from 'lucide-react';
import { journalists, featuredStories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Define extended journalist type to include the properties used in this component
type ExtendedJournalist = {
  id: string;
  name: string;
  role: string; 
  avatar: string;
  coverImage: string;
  bio: string;
  longBio: string;
  expertise: string[];
  verified: boolean;
  location: string;
  joinedDate: string;
  storiesCount: number;
  regionsOfFocus: string[];
  awards: string[];
  verificationLevel?: "standard" | "gold" | "platinum";
  trending?: boolean;
  lastActive?: string;
};

const JournalistDetail = () => {
  const { id } = useParams();
  const rawJournalist = journalists.find(j => j.id === id);
  // Add default values for missing properties
  const journalist: ExtendedJournalist | undefined = rawJournalist ? {
    ...rawJournalist,
    verificationLevel: rawJournalist.verified ? "standard" : undefined,
    trending: false,
    lastActive: "1 day ago"
  } : undefined;
  
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('stories');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Find stories by this journalist
  const journalistStories = featuredStories.filter(
    story => story.author.name === journalist?.name
  );

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You no longer follow ${journalist?.name}` 
        : `You are now following ${journalist?.name}`,
    });
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Shared",
      description: `${journalist?.name}'s profile link has been copied to clipboard`,
    });
  };
  
  const getVerificationBadgeColor = () => {
    if (!journalist?.verified) return "bg-gray-100 text-gray-600";
    if (journalist?.verificationLevel === "platinum") return "bg-gradient-to-r from-purple-500 to-indigo-500 text-white";
    if (journalist?.verificationLevel === "gold") return "bg-amber-500 text-white";
    return "bg-pp-blue text-white";
  };
  
  const getVerificationTooltip = () => {
    if (!journalist?.verified) return "Not verified";
    if (journalist?.verificationLevel === "platinum") return "Platinum Verified - Top 1% journalist";
    if (journalist?.verificationLevel === "gold") return "Gold Verified - Established journalist";
    return "Verified Journalist";
  };

  if (!journalist) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Journalist not found</h1>
          <Link to="/journalists" className="text-pp-blue hover:underline mt-4 inline-block">
            Back to Journalists
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray/30 to-white">
        <div className="container mx-auto px-4 pt-8 pb-16">
          <Link to="/journalists" className="inline-flex items-center text-pp-blue hover:text-pp-navy mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to journalists
          </Link>
          
          {/* Journalist header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="h-64 sm:h-80 relative">
              <img 
                src={journalist.coverImage} 
                alt={journalist.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-white">
                    <AvatarImage src={journalist.avatar} alt={journalist.name} />
                    <AvatarFallback className="bg-pp-blue/20 text-pp-blue text-xl font-medium">
                      {journalist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {journalist.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircle className="h-7 w-7 text-pp-blue" fill="white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={`flex items-center gap-1 ${getVerificationBadgeColor()}`}>
                            {journalist.verified ? (
                              <>
                                <Award className="h-3 w-3 mr-1" /> 
                                Verified {journalist.verificationLevel && journalist.verificationLevel.charAt(0).toUpperCase() + journalist.verificationLevel.slice(1)}
                              </>
                            ) : (
                              "Not Verified"
                            )}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getVerificationTooltip()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {journalist.role}
                    </Badge>
                    
                    {journalist.trending && (
                      <Badge className="bg-red-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {journalist.name}
                  </h1>
                  <p className="text-white/80 mt-1 line-clamp-1 sm:line-clamp-2">{journalist.bio}</p>
                </div>
                <div className="sm:ml-auto flex gap-2 mt-2 sm:mt-0 flex-wrap sm:flex-nowrap">
                  <Button 
                    variant={isFollowing ? "secondary" : "default"} 
                    onClick={handleFollow}
                  >
                    {isFollowing ? (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:text-white hover:bg-white/20">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:text-white hover:bg-white/20" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Journalist info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">About {journalist.name}</CardTitle>
                    {journalist.verified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center text-green-600">
                              <Shield className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Identity verified by Press Pilot</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <CardDescription>Journalist information and statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{journalist.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {journalist.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{journalist.storiesCount} stories published</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{journalist.regionsOfFocus.join(', ')}</span>
                    </div>
                    
                    {journalist.lastActive && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last active {journalist.lastActive}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {journalist.expertise.map((area, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Connect</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Globe className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Stats</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{journalist.storiesCount}</div>
                        <div className="text-xs text-muted-foreground">Stories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">3.2K</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-xs text-muted-foreground">Years</div>
                      </div>
                    </div>
                  </div>
                  
                  {journalist.verified && (
                    <div className="pt-4 border-t">
                      <Link to="/journalist-dashboard" className="w-full">
                        <Button className="w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          View Dashboard
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Bio and stories */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stories">
                    <FileText className="h-4 w-4 mr-2" />
                    Stories
                  </TabsTrigger>
                  <TabsTrigger value="about">
                    <BookOpen className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="achievements">
                    <Star className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                </TabsList>
                
                {/* Stories Tab */}
                <TabsContent value="stories" className="p-0 mt-6">
                  {journalistStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {journalistStories.map((story) => (
                        <div 
                          key={story.id}
                          className="block transition-transform duration-300 hover:-translate-y-1"
                        >
                          <Link to={`/stories/${story.id}`} className="block">
                            <Card className="overflow-hidden h-full">
                              <div className="aspect-[16/9] overflow-hidden">
                                <img
                                  src={story.coverImage}
                                  alt={story.title}
                                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                  <Badge className="mb-2">{story.category}</Badge>
                                  <div className="flex items-center text-muted-foreground text-sm">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {story.publishedAt}
                                  </div>
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">{story.title}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{story.excerpt}</p>
                                
                                <div className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {story.readTime} min read
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="flex items-center">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      {story.likesCount}
                                    </span>
                                    <span className="flex items-center">
                                      <MessageCircle className="h-3 w-3 mr-1" />
                                      {story.commentsCount}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">No stories published yet</h3>
                      <p className="text-muted-foreground">Check back soon for updates from this journalist</p>
                    </div>
                  )}
                </TabsContent>
                
                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Biography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <Collapsible
                          open={isExpanded}
                          onOpenChange={setIsExpanded}
                          className="space-y-4"
                        >
                          <div>
                            <p className="text-muted-foreground">{journalist.bio}</p>
                            {journalist.longBio && !isExpanded && (
                              <CollapsibleContent>
                                <p className="text-muted-foreground mt-4">{journalist.longBio}</p>
                              </CollapsibleContent>
                            )}
                          </div>
                          {journalist.longBio && (
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" className="p-0 h-auto text-pp-blue">
                                {isExpanded ? "Show less" : "Read more"}
                                <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                              </Button>
                            </CollapsibleTrigger>
                          )}
                        </Collapsible>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Achievements Tab */}
                <TabsContent value="achievements" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Career Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <Award className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Excellence in Journalism</h4>
                            <p className="text-muted-foreground text-sm">Recognized for outstanding coverage of international conflicts</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Published Author</h4>
                            <p className="text-muted-foreground text-sm">Released "The Invisible Frontlines" - a documentary book</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Globe className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Global Impact</h4>
                            <p className="text-muted-foreground text-sm">Stories have influenced policy changes in 3 countries</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {activeTab === "stories" && journalistStories.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More Stories</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JournalistDetail;
