import { User } from "./user";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: string;
  favoritesCount: number;
  author: User
}

export interface ArticlesDTO {
  articles: Article[];
  articlesCount: number;
}
