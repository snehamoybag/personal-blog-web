import type { User } from "./User";

export interface Blog {
  id: number;
  title: string;
  coverImgUrl: string;
  content: string;
  status: "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: User;
  tags: string[];
}
