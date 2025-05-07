
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryEditor from '@/components/journalists/StoryEditor';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateStory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSaveDraft = (storyData: any) => {
    console.log('Saving draft:', storyData);
    // In a real application, you would save to a backend here
    toast({
      title: "Draft saved",
      description: "Your story draft has been saved.",
    });
    navigate('/journalist-dashboard');
  };
  
  const handlePublish = (storyData: any) => {
    console.log('Publishing story:', storyData);
    // In a real application, you would publish to a backend here
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Story published!",
        description: "Your story has been published successfully.",
      });
      navigate('/journalist-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <StoryEditor 
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            onClose={() => navigate('/journalist-dashboard')}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateStory;
