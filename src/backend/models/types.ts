
/**
 * Type definitions for the PublicPress Global Voices Hub
 */

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
  bio?: string;
  role?: string;
  location?: string;
  storiesCount?: number;
  followersCount?: number;
  joinedDate?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
    id?: string;
  };
  publishedAt: string;
  category: string;
  region: string;
  readTime: number;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  featured?: boolean;
}

export interface StoryFilters {
  searchTerm?: string;
  category?: string;
  region?: string;
  sortBy?: string;
  isAscending?: boolean;
}
