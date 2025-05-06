
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Award, Users, BookOpen, Share2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-pp-gray/30 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
              About PublicPress
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering journalists and readers with a platform for insightful, 
              transparent, and impactful journalism.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild>
                <Link to="/stories">
                  Browse Stories
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/journalists">
                  Meet Our Journalists
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At PublicPress, we believe in the power of journalism to inform, inspire, and transform. 
                Our platform connects talented journalists with engaged readers who are looking for 
                in-depth stories that matter.
              </p>
              <p className="text-muted-foreground mb-4">
                We're dedicated to preserving the integrity of journalism in the digital age while 
                providing innovative tools that help stories reach the audiences who need them most.
              </p>
              <p className="text-muted-foreground">
                Our platform supports journalists with fair compensation, powerful storytelling tools, 
                and a community that values their expertise and dedication.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504711331083-9c895941bf81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Journalism in action" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold font-playfair mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="bg-pp-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-pp-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Perspective</h3>
                  <p className="text-muted-foreground">
                    We bring together journalists from around the world to provide diverse perspectives on global issues.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="bg-pp-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-pp-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We uphold the highest standards of journalistic integrity, accuracy, and quality in everything we publish.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="bg-pp-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-pp-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Independence</h3>
                  <p className="text-muted-foreground">
                    We fiercely protect our journalists' independence and ensure transparent relationships with all partners.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="bg-white rounded-xl shadow-sm p-10 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-pp-blue mb-2">500+</div>
                <div className="text-muted-foreground flex items-center justify-center">
                  <Users className="h-4 w-4 mr-2" /> Active Journalists
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pp-blue mb-2">10K+</div>
                <div className="text-muted-foreground flex items-center justify-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Published Stories
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pp-blue mb-2">150+</div>
                <div className="text-muted-foreground flex items-center justify-center">
                  <Globe className="h-4 w-4 mr-2" /> Countries Covered
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pp-blue mb-2">5M+</div>
                <div className="text-muted-foreground flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" /> Monthly Readers
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold font-playfair mb-4 text-center">Our Team</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Behind PublicPress is a dedicated team of journalists, technologists, and media experts 
              committed to creating a better future for journalism.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Elena Martinez",
                  role: "Founder & Editor-in-Chief",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Sarah Johnson",
                  role: "Head of Content Strategy",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "James Wilson",
                  role: "Head of Partnerships",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  <CardContent className="text-center p-4">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-pp-navy to-pp-blue text-white rounded-xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Join PublicPress Today</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Whether you're a journalist looking to share your stories or a reader seeking quality journalism, 
              PublicPress is the platform for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/20" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
