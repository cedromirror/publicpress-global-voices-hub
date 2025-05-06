
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';

// This would normally come from an API
const storiesData = [
  {
    id: "1",
    title: "The Impact of Climate Change on Global Food Systems",
    excerpt: "Exploring how climate change is affecting agriculture and food security worldwide",
    imageUrl: "https://source.unsplash.com/random/800x600/?climate",
    author: "Maria Rodriguez",
    date: "May 5, 2023",
    category: "Environment"
  },
  {
    id: "2",
    title: "Tech Giants Face New Regulatory Challenges",
    excerpt: "Analysis of recent legislative efforts to regulate big tech companies",
    imageUrl: "https://source.unsplash.com/random/800x600/?technology",
    author: "David Chen",
    date: "May 3, 2023",
    category: "Technology"
  },
  {
    id: "3",
    title: "Healthcare Innovation in Rural Communities",
    excerpt: "How telehealth and mobile clinics are changing healthcare access",
    imageUrl: "https://source.unsplash.com/random/800x600/?healthcare",
    author: "Sarah Johnson",
    date: "April 28, 2023",
    category: "Health"
  },
  {
    id: "4",
    title: "The Renaissance of Local Journalism",
    excerpt: "Community-supported news models bringing back local reporting",
    imageUrl: "https://source.unsplash.com/random/800x600/?newspaper",
    author: "James Wilson",
    date: "April 25, 2023",
    category: "Media"
  },
  {
    id: "5",
    title: "Global Supply Chain Disruptions Continue",
    excerpt: "Analyzing ongoing challenges in international shipping and distribution",
    imageUrl: "https://source.unsplash.com/random/800x600/?shipping",
    author: "Priya Sharma",
    date: "April 22, 2023",
    category: "Business"
  },
  {
    id: "6",
    title: "Educational Inequality in the Digital Age",
    excerpt: "Examining the digital divide's impact on student outcomes",
    imageUrl: "https://source.unsplash.com/random/800x600/?education",
    author: "Michael Torres",
    date: "April 18, 2023",
    category: "Education"
  }
];

const Stories = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Stories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest stories from our global network of journalists
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storiesData.map((story) => (
            <Link 
              key={story.id}
              to={`/stories/${story.id}`}
              className="block transition-transform duration-300 hover:-translate-y-1"
            >
              <StoryCard
                title={story.title}
                excerpt={story.excerpt}
                imageUrl={story.imageUrl}
                author={story.author}
                date={story.date}
                category={story.category}
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stories;
