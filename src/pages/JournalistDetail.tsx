
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mail, MapPin, Calendar, Globe, Bookmark, FileText } from 'lucide-react';
import { journalists, featuredStories } from '@/lib/data';
import StoryCard from '@/components/stories/StoryCard';

const JournalistDetail = () => {
  const { id } = useParams();
  const journalist = journalists.find(j => j.id === id);
  
  // Find stories by this journalist
  const journalistStories = featuredStories.filter(
    story => story.author.name === journalist?.name
  );

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
      <div className="container mx-auto px-4 py-8">
        <Link to="/journalists" className="inline-flex items-center text-pp-blue hover:text-pp-navy mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to journalists
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Journalist info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <div className="aspect-[1/1] relative">
                <img 
                  src={journalist.coverImage} 
                  alt={journalist.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 border-4 border-white -mt-16 shadow-lg bg-white">
                    <AvatarImage src={journalist.avatar} alt={journalist.name} />
                    <AvatarFallback className="bg-pp-blue/20 text-pp-blue text-xl font-medium">
                      {journalist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold mt-4">
                    {journalist.name}
                    {journalist.verified && (
                      <Badge className="ml-2 bg-pp-blue hover:bg-pp-blue/90">
                        Verified
                      </Badge>
                    )}
                  </h1>
                  <p className="text-muted-foreground">{journalist.role}</p>
                </div>
                
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
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {journalist.expertise.map((area, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-100">
                      {area}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Bio and stories */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-playfair font-bold mb-4">Biography</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground">{journalist.bio}</p>
                  {journalist.longBio && (
                    <p className="text-muted-foreground mt-4">{journalist.longBio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <h2 className="text-2xl font-playfair font-bold mb-6">Recent Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journalistStories.length > 0 ? (
                  journalistStories.map((story) => (
                    <Link 
                      key={story.id}
                      to={`/stories/${story.id}`}
                      className="block transition-transform duration-300 hover:-translate-y-1"
                    >
                      <StoryCard
                        id={story.id}
                        title={story.title}
                        excerpt={story.excerpt}
                        coverImage={story.coverImage}
                        author={story.author}
                        publishedAt={story.publishedAt}
                        category={story.category}
                        region={story.region}
                        readTime={story.readTime}
                        commentsCount={story.commentsCount}
                        likesCount={story.likesCount}
                        viewsCount={story.viewsCount}
                      />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No stories published yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JournalistDetail;
