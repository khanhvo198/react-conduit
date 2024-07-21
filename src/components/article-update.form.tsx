import { useParams } from "react-router-dom"
import { ArticleForm } from "./article-form"
import { useQuery } from "@tanstack/react-query"
import { getArticle, updateArticle } from "../services/article.service"

export const ArticleUpdateForm = () => {
  const { slug } = useParams()
  const { isPending, data } = useQuery({ queryKey: ["get_single_article", slug], queryFn: () => getArticle(slug!), gcTime: 0 })

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <ArticleForm
      article={data?.article}
      mutationFn={updateArticle} />
  )
}
