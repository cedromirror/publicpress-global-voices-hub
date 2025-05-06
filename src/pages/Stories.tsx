
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/stories/StoryCard';
import { featuredStories } from '@/lib/data';

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
          {featuredStories.map((story) => (
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Stories;
