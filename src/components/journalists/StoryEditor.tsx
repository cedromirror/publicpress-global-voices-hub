
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import MediaUploader from './MediaUploader';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, SendHorizontal, X } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'audio';
  preview: string;
}

interface StoryEditorProps {
  onClose?: () => void;
  onSaveDraft?: (storyData: any) => void;
  onPublish?: (storyData: any) => void;
}

const categories = [
  "Politics",
  "Technology",
  "Environment",
  "Business",
  "Health",
  "Education",
  "Arts",
  "Sports",
  "Science",
  "Opinion"
];

const regions = [
  "Global",
  "North America",
  "Europe",
  "Asia",
  "Africa",
  "South America",
  "Australia",
  "Middle East"
];

const StoryEditor: React.FC<StoryEditorProps> = ({
  onClose,
  onSaveDraft,
  onPublish
}) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) {
      toast({
        title: "Duplicate tag",
        description: "This tag has already been added.",
      });
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleSaveDraft = () => {
    if (!validateForm(false)) return;
    
    setIsSubmitting(true);
    
    const storyData = {
      title,
      excerpt,
      content,
      category,
      region,
      tags,
      mediaFiles,
      status: 'draft',
      timestamp: new Date().toISOString(),
    };
    
    // Simulating API call delay
    setTimeout(() => {
      if (onSaveDraft) onSaveDraft(storyData);
      
      toast({
        title: "Draft saved",
        description: "Your story has been saved as a draft.",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handlePublish = () => {
    if (!validateForm(true)) return;
    
    setIsSubmitting(true);
    
    const storyData = {
      title,
      excerpt,
      content,
      category,
      region,
      tags,
      mediaFiles,
      status: 'published',
      timestamp: new Date().toISOString(),
    };
    
    // Simulating API call delay
    setTimeout(() => {
      if (onPublish) onPublish(storyData);
      
      toast({
        title: "Story published",
        description: "Your story has been published successfully.",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const validateForm = (isPublishing: boolean) => {
    if (!title) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your story.",
        variant: "destructive",
      });
      return false;
    }
    
    if (isPublishing) {
      if (!excerpt) {
        toast({
          title: "Missing excerpt",
          description: "Please provide a brief excerpt for your story.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!content) {
        toast({
          title: "Missing content",
          description: "Please write some content for your story.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!category) {
        toast({
          title: "Missing category",
          description: "Please select a category for your story.",
          variant: "destructive",
        });
        return false;
      }
      
      if (!region) {
        toast({
          title: "Missing region",
          description: "Please select a region for your story.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create New Story</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter story title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="Write a brief summary of your story"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="resize-none h-24"
          />
          <p className="text-xs text-muted-foreground">
            This will appear in story previews and social shares
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your full story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none min-h-[300px]"
          />
        </div>
        
        <MediaUploader 
          onMediaChange={setMediaFiles}
          allowedTypes={['image', 'video', 'audio']}
          maxFiles={5}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((reg) => (
                  <SelectItem key={reg} value={reg}>{reg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex">
            <Input
              id="tags"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="secondary" 
              className="ml-2" 
              onClick={addTag}
              disabled={!tagInput.trim()}
            >
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleSaveDraft}
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button 
          onClick={handlePublish}
          disabled={isSubmitting}
        >
          <SendHorizontal className="mr-2 h-4 w-4" />
          Publish Story
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryEditor;
