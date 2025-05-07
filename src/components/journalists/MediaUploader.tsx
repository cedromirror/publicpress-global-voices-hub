
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileImage, FileVideo, AudioLines, UploadCloud, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type MediaType = 'image' | 'video' | 'audio';

interface MediaFile {
  id: string;
  file: File;
  type: MediaType;
  preview: string;
}

interface MediaUploaderProps {
  onMediaChange: (media: MediaFile[]) => void;
  allowedTypes?: MediaType[];
  maxFiles?: number;
  initialMedia?: MediaFile[];
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaChange,
  allowedTypes = ['image', 'video', 'audio'],
  maxFiles = 5,
  initialMedia = [],
}) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMedia);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    // Check if adding these files would exceed the limit
    if (mediaFiles.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: "destructive",
      });
      return;
    }
    
    const newMediaFiles: MediaFile[] = [];
    
    Array.from(files).forEach(file => {
      // Determine file type
      let type: MediaType = 'image';
      if (file.type.startsWith('video/')) {
        type = 'video';
      } else if (file.type.startsWith('audio/')) {
        type = 'audio';
      }
      
      // Check if the file type is allowed
      if (!allowedTypes.includes(type)) {
        toast({
          title: "Unsupported file type",
          description: `${file.type} is not supported.`,
        });
        return;
      }
      
      const preview = URL.createObjectURL(file);
      newMediaFiles.push({
        id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        type,
        preview,
      });
    });
    
    const updatedMedia = [...mediaFiles, ...newMediaFiles];
    setMediaFiles(updatedMedia);
    onMediaChange(updatedMedia);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeMedia = (id: string) => {
    const updatedMedia = mediaFiles.filter(media => media.id !== id);
    setMediaFiles(updatedMedia);
    onMediaChange(updatedMedia);
  };
  
  const getMediaIcon = (type: MediaType) => {
    switch (type) {
      case 'image':
        return <FileImage className="h-5 w-5" />;
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'audio':
        return <AudioLines className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Media Files</h3>
          <p className="text-sm text-muted-foreground">
            Upload images, videos, or audio files for your story
          </p>
        </div>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          disabled={mediaFiles.length >= maxFiles}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept={allowedTypes.map(type => 
            type === 'image' ? 'image/*' : 
            type === 'video' ? 'video/*' : 
            'audio/*'
          ).join(',')}
          className="hidden"
        />
      </div>
      
      {mediaFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map(media => (
            <Card key={media.id} className="relative overflow-hidden group">
              {media.type === 'image' && (
                <img src={media.preview} alt="Preview" className="w-full h-40 object-cover" />
              )}
              {media.type === 'video' && (
                <video src={media.preview} className="w-full h-40 object-cover" controls />
              )}
              {media.type === 'audio' && (
                <div className="w-full h-40 bg-gray-100 flex flex-col items-center justify-center p-4">
                  <AudioLines className="h-12 w-12 text-gray-400 mb-2" />
                  <audio src={media.preview} controls className="w-full" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-start justify-end">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="m-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeMedia(media.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex items-center text-sm">
                {getMediaIcon(media.type)}
                <span className="ml-2 truncate">{media.file.name}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <div className="mx-auto flex flex-col items-center justify-center">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-1">
              Drag and drop files or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, videos, and audio files
            </p>
          </div>
        </div>
      )}
      
      {mediaFiles.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {mediaFiles.length} of {maxFiles} files added
        </p>
      )}
    </div>
  );
};

export default MediaUploader;
