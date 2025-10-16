import type { User } from "./User";

export interface Comment {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  authorId: number;
  blogId: number;
}
