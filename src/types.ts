export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: Profile;
}

export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: User;
}

export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: User;
}
