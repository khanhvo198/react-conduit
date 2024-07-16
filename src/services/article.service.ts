import { conduitApi } from "../shared/data-access/api";
import { ArticlesDTO } from "../shared/data-access/api/models/article";

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
