
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { journalists } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import {
  Search,
  MapPin,
  Award,
  ChevronRight,
  Star,
  BookOpen,
  Users,
  Filter
} from 'lucide-react';

const Journalists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  // Get unique expertise areas and regions for filters
  const expertiseAreas = [...new Set(journalists.flatMap(j => j.expertise))].sort();
  const regions = [...new Set(journalists.flatMap(j => j.regionsOfFocus))].sort();
  
  // Get verified journalists for featured section
  const verifiedJournalists = journalists.filter(j => j.verified);
  
  // Filter journalists based on search term, expertise and region
  const filteredJournalists = journalists.filter(journalist => {
    const matchesSearch = journalist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journalist.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = selectedExpertise === '' || journalist.expertise.includes(selectedExpertise);
    const matchesRegion = selectedRegion === '' || journalist.regionsOfFocus.includes(selectedRegion);
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'verified' && journalist.verified) || 
                      (activeTab === 'popular' && journalist.storiesCount > 15);
    
    return matchesSearch && matchesExpertise && matchesRegion && matchesTab;
  });

  const handleFollow = (journalistName) => {
    toast({
      title: "Following journalist",
      description: `You are now following ${journalistName}`,
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray/30 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Our Journalists</h1>
            <p className="text-xl text-muted-foreground">
              Meet the dedicated professionals bringing you stories from around the world
            </p>
          </div>
          
          {/* Featured Journalists */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-playfair font-bold flex items-center">
                <Award className="mr-2 text-pp-blue h-5 w-5" />
                Featured Journalists
              </h2>
              <Link to="/journalists" className="text-pp-blue hover:text-pp-navy flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {verifiedJournalists.slice(0, 3).map(journalist => (
                <Link
                  key={journalist.id}
                  to={`/journalists/${journalist.id}`}
                  className="group block"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-none shadow-md">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={journalist.coverImage}
                        alt={journalist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4">
                          <Badge className="bg-pp-blue hover:bg-pp-blue/90 mb-2">Verified</Badge>
                          <h3 className="text-white text-xl font-bold">{journalist.name}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{journalist.location}</span>
                        <span className="text-muted-foreground/50">•</span>
                        <BookOpen className="h-4 w-4" />
                        <span>{journalist.storiesCount} stories</span>
                      </div>
                      <p className="line-clamp-2 text-muted-foreground mb-4">{journalist.bio}</p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFollow(journalist.name);
                        }}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Follow
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search journalists..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All expertise areas</SelectItem>
                  {expertiseAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-2">
                <TabsList>
                  <TabsTrigger value="all">All Journalists</TabsTrigger>
                  <TabsTrigger value="verified">Verified</TabsTrigger>
                  <TabsTrigger value="popular">Most Popular</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Showing {filteredJournalists.length} journalists
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {/* Content will be rendered below */}
              </TabsContent>
              <TabsContent value="verified" className="mt-0">
                {/* Content will be rendered below */}
              </TabsContent>
              <TabsContent value="popular" className="mt-0">
                {/* Content will be rendered below */}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* All Journalists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJournalists.length > 0 ? (
              filteredJournalists.map((journalist) => (
                <Link 
                  key={journalist.id}
                  to={`/journalists/${journalist.id}`}
                  className="block transition-transform duration-300 hover:-translate-y-1"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={journalist.coverImage} 
                        alt={journalist.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                        {journalist.storiesCount > 20 && (
                          <Star className="h-4 w-4 text-amber-400 ml-auto" />
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {journalist.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {journalist.expertise.slice(0, 3).map((area, i) => (
                          <Badge key={i} variant="outline" className="bg-gray-100">
                            {area}
                          </Badge>
                        ))}
                        {journalist.expertise.length > 3 && (
                          <Badge variant="outline" className="bg-gray-100">
                            +{journalist.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {journalist.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {journalist.storiesCount} stories
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 py-10 text-center">
                <h3 className="text-xl font-medium mb-2">No journalists found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedExpertise('');
                    setSelectedRegion('');
                    setActiveTab('all');
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
          
          {filteredJournalists.length > 9 && (
            <div className="mt-10 text-center">
              <Button className="px-8">Load More Journalists</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Journalists;
