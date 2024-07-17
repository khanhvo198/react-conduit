import { conduitApi } from "../shared/data-access/api";
import { Article, ArticlesDTO } from "../shared/data-access/api/models/article";

interface paramsArticle {
  offset?: number;
  limit?: number;
  author?: string;
  favorited?: string;
  tag?: string
}

interface paramsFeed {
  offset?: number;
  limit?: number;
}

export const getArticles = async ({ offset = 0, limit, author, favorited }: paramsArticle): Promise<ArticlesDTO> => {
  const response = await conduitApi.get("/articles", {
    params: {
      offset,
      limit,
      author,
      favorited
    }
  })
  return response.data
}

export const getFeeds = async ({ offset = 0, limit }: paramsFeed): Promise<ArticlesDTO> => {
  const response = await conduitApi.get("/articles/feed", {
    params: {
      offset,
      limit
    }
  })
  return response.data
}


export const favoriteArticle = async (slug: string): Promise<{ article: Article }> => {
  const response = await conduitApi.post(`articles/${slug}/favorite`)
  return response.data
}

export const unfavoriteArticle = async (slug: string): Promise<{ article: Article }> => {
  const response = await conduitApi.delete(`articles/${slug}/favorite`)
  return response.data
}

