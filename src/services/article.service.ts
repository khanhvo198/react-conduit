import { conduitApi } from "../shared/data-access/api";
import { Article, ArticlesDTO } from "../shared/data-access/api/models/article";

export const getArticles = async (offset = 0): Promise<ArticlesDTO> => {
  const response = await conduitApi.get("/articles", {
    params: {
      offset
    }
  })
  return response.data
}

export const getFeeds = async (offset = 0): Promise<ArticlesDTO> => {
  const response = await conduitApi.get("/articles/feed", {
    params: {
      offset
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

