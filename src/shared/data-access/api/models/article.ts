import { z } from "zod";
import { User } from "./user";
import { ArticleCreateForm } from "../../../../components/article-create-form";
import { ArticleValidationSchema } from "../../zod-schema";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: User;
  id: number;
  authorId: number;
  favoritedBy: User[]
}

export interface ArticlesDTO {
  articles: Article[];
  articlesCount: number;
}


export type ArticleDTO = z.infer<typeof ArticleValidationSchema>
