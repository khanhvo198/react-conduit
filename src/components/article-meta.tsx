import { Link } from "react-router-dom"
import { Article } from "../shared/data-access/api/models/article"

interface ArticleMetaProps {
  article: Article
}

export const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const author = article.author

  return (
    <>
      <a href={`/profile/${author.username}`}><img src={author.image} /></a>
      <div className="info">
        <Link reloadDocument to={`/profile/${author.username}`} className="author">{author.username}</Link>
        <span className="date">{article.createdAt}</span>
      </div>
    </>
  )
}
