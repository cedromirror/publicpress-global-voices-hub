
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { journalists } from '@/lib/data';

const Journalists = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Our Journalists</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals bringing you stories from around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalists.map((journalist) => (
            <Link 
              key={journalist.id}
              to={`/journalists/${journalist.id}`}
              className="block transition-transform duration-300 hover:-translate-y-1"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={journalist.coverImage} 
                    alt={journalist.name} 
                    className="w-full h-full object-cover"
                  />
                  {journalist.verified && (
                    <Badge className="absolute top-4 right-4 bg-pp-blue hover:bg-pp-blue/90">
                      Verified
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-pp-blue">
                      <AvatarImage src={journalist.avatar} alt={journalist.name} />
                      <AvatarFallback className="bg-pp-blue/20 text-pp-blue font-medium">
                        {journalist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{journalist.name}</h3>
                      <p className="text-sm text-muted-foreground">{journalist.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {journalist.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {journalist.expertise.map((area, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <span>{journalist.location} • {journalist.storiesCount} stories published</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Journalists;
