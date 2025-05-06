
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ThumbsUp, Flag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
  highlighted: boolean;
}

interface Reply {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentSectionProps {
  storyId: string;
  commentsCount: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ storyId, commentsCount }) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=23' },
      content: 'This article provides such a comprehensive overview of the climate crisis. I appreciate how it balances the dire situation with potential solutions.',
      timestamp: '2 hours ago',
      likes: 14,
      replies: [
        {
          id: '1-1',
          user: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=53' },
          content: "I agree! I especially liked the section about indigenous knowledge systems - such an important perspective that's often overlooked.",
          timestamp: '45 minutes ago',
          likes: 5,
        }
      ],
      highlighted: true
    },
    {
      id: '2',
      user: { name: 'Daniel Smith', avatar: 'https://i.pravatar.cc/150?img=30' },
      content: "While I appreciate the reporting, I wonder if there are more concrete policy recommendations that could be explored in a follow-up piece?",
      timestamp: '5 hours ago',
      likes: 8,
      replies: [],
      highlighted: false
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `${comments.length + 1}`,
      user: { name: 'Guest User', avatar: undefined },
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
      highlighted: false
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion.",
    });
  };
  
  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            {
              id: `${commentId}-${comment.replies.length + 1}`,
              user: { name: 'Guest User', avatar: undefined },
              content: replyContent,
              timestamp: 'Just now',
              likes: 0
            },
            ...comment.replies
          ]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the comment.",
    });
  };
  
  const toggleHighlight = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          highlighted: !comment.highlighted
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    toast({
      title: "Comment updated", 
      description: "The comment highlight has been toggled.",
    });
  };
  
  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  const handleLikeReply = (commentId: string, replyId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold flex items-center gap-2">
        <span>Comments</span>
        <Badge className="bg-gray-200 text-gray-700">{commentsCount}</Badge>
      </h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Textarea
          placeholder="Share your thoughts on this story..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4 min-h-20"
        />
        <div className="flex justify-end">
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className={`bg-white rounded-lg shadow p-6 ${comment.highlighted ? 'border-l-4 border-pp-blue' : ''}`}
          >
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback className="bg-pp-blue/20 text-pp-blue">
                  {comment.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{comment.user.name}</h4>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <Button
                    variant={comment.highlighted ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => toggleHighlight(comment.id)}
                    className="h-8"
                  >
                    Highlight
                  </Button>
                </div>
                
                <p className="text-gray-700 mb-4">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
                
                {replyingTo === comment.id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <Textarea
                      placeholder={`Reply to ${comment.user.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="mb-2 min-h-16"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
                
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pt-4">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                              {reply.user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm">{reply.user.name}</h5>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => handleLikeReply(comment.id, reply.id)}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Import a Badge component
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default CommentSection;
