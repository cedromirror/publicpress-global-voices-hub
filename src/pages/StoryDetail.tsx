
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const StoryDetail = () => {
  const { id } = useParams();
  
  // This would normally fetch the story from an API
  const story = {
    title: "The Impact of Climate Change on Global Food Systems",
    author: "Maria Rodriguez",
    date: "May 5, 2023",
    content: `
      Climate change is rapidly transforming our global food systems in ways that many people don't yet fully understand. From shifting growing seasons to increased water scarcity, the challenges are mounting for farmers worldwide.
      
      In coastal regions, rising sea levels are causing saltwater intrusion into farmland, rendering once-fertile soil unusable. Meanwhile, in traditionally temperate regions, unpredictable weather patterns are disrupting planting schedules and increasing crop failures.
      
      This is not just an environmental crisis but a humanitarian one as well. Food security experts predict that without significant adaptation measures, crop yields could decrease by up to 30% by 2050 in some regions. The most vulnerable populations—often those who have contributed least to climate change—stand to suffer the most severe consequences.
      
      However, innovative approaches to agriculture are emerging. Vertical farming, drought-resistant crop varieties, and improved water management techniques offer promising solutions. Additionally, indigenous knowledge systems, which have adapted to local conditions over generations, are gaining recognition for their sustainability.
      
      The path forward will require unprecedented cooperation between governments, scientists, farmers, and consumers. Policy changes, technological innovation, and shifts in consumption patterns must all play a role in building resilient food systems for the future.
    `,
    imageUrl: "https://source.unsplash.com/random/800x400/?farming",
    tags: ["Climate", "Agriculture", "Food Security"]
  };

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
            src={story.imageUrl} 
            alt={story.title} 
            className="w-full h-64 md:h-96 object-cover rounded-t-lg" 
          />
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              {story.tags.map((tag, index) => (
                <span key={index} className="bg-pp-blue/10 text-pp-blue text-xs font-medium px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-playfair">{story.title}</CardTitle>
            <CardDescription>
              By {story.author} • Published on {story.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-8 border-t pt-6">
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
    </>
  );
};

export default StoryDetail;
