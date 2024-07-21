import { createArticle } from "../services/article.service"
import { ArticleForm } from "./article-form"


export const ArticleCreateForm = () => {

  return (
    <ArticleForm mutationFn={createArticle} />
  )
}
