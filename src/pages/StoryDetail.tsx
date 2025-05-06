
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { featuredStories, journalists } from '@/lib/data';

const StoryDetail = () => {
  const { id } = useParams();
  const story = featuredStories.find(s => s.id === id);
  const journalist = journalists.find(j => j.name === story?.author.name);
  
  if (!story) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Story not found</h1>
          <Link to="/stories" className="text-pp-blue hover:underline mt-4 inline-block">
            Back to Stories
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/stories" className="inline-flex items-center text-pp-blue hover:text-pp-navy mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to stories
        </Link>

        <Card className="mb-8">
          <img 
            src={story.coverImage} 
            alt={story.title} 
            className="w-full h-64 md:h-96 object-cover rounded-t-lg" 
          />
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-pp-blue hover:bg-pp-blue/90">
                {story.category}
              </Badge>
              <Badge variant="outline" className="bg-gray-100">
                {story.region}
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-playfair">{story.title}</CardTitle>
            <CardDescription className="flex flex-wrap gap-4 items-center mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{story.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{story.readTime} min read</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              to={journalist ? `/journalists/${journalist.id}` : '#'} 
              className="flex items-center gap-3 p-4 border rounded-lg mb-6 hover:bg-gray-50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={story.author.avatar} alt={story.author.name} />
                <AvatarFallback className="bg-pp-blue/20 text-pp-blue">
                  {story.author.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium flex items-center gap-1">
                  {story.author.name}
                  {story.author.verified && (
                    <Badge variant="outline" className="ml-1 py-0 px-1 h-4 border-pp-blue">
                      <span className="sr-only">Verified</span>
                      ✓
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {journalist?.role || "Journalist"}
                </div>
              </div>
            </Link>
            
            <div className="prose prose-lg max-w-none">
              <p className="mb-4 text-gray-700">Climate change is rapidly transforming our global food systems in ways that many people don't yet fully understand. From shifting growing seasons to increased water scarcity, the challenges are mounting for farmers worldwide.</p>
              
              <p className="mb-4 text-gray-700">In coastal regions, rising sea levels are causing saltwater intrusion into farmland, rendering once-fertile soil unusable. Meanwhile, in traditionally temperate regions, unpredictable weather patterns are disrupting planting schedules and increasing crop failures.</p>
              
              <p className="mb-4 text-gray-700">This is not just an environmental crisis but a humanitarian one as well. Food security experts predict that without significant adaptation measures, crop yields could decrease by up to 30% by 2050 in some regions. The most vulnerable populations—often those who have contributed least to climate change—stand to suffer the most severe consequences.</p>
              
              <p className="mb-4 text-gray-700">However, innovative approaches to agriculture are emerging. Vertical farming, drought-resistant crop varieties, and improved water management techniques offer promising solutions. Additionally, indigenous knowledge systems, which have adapted to local conditions over generations, are gaining recognition for their sustainability.</p>
              
              <p className="mb-4 text-gray-700">The path forward will require unprecedented cooperation between governments, scientists, farmers, and consumers. Policy changes, technological innovation, and shifts in consumption patterns must all play a role in building resilient food systems for the future.</p>
            </div>
            
            <div className="flex items-center justify-between mt-8 py-4 border-t border-b">
              <div className="flex items-center gap-6">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{story.likesCount}</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{story.commentsCount}</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{story.viewsCount} views</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Share this story</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-13 15a.5.5 0 01-.5-.5v-5a.5.5 0 011 0v5a.5.5 0 01-.5.5zm-.5-8.5a1 1 0 112 0 1 1 0 01-2 0zm11 8.5a.5.5 0 01-.5-.5v-7a.5.5 0 01-.5-.5h-1a.5.5 0 110-1h1A1.5 1.5 0 0117 9.5v8a.5.5 0 01-.5.5z"></path>
                    <path d="M14 9.5a.5.5 0 110-1h.5a.5.5 0 01.5.5v8a.5.5 0 11-1 0v-7.5zm-5.5 0V15a.5.5 0 101 0v-5.5a.5.5 0 00-.5-.5h-1a.5.5 0 000 1h.5z"></path>
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default StoryDetail;
