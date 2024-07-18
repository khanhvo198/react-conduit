import { Article } from "../shared/data-access/api/models/article"
import { ArticleActions } from "./article-action"

interface ArticleMetaProps {
  article: Article
}

export const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const author = article.author

  return (
    <div className="article-meta">
      <a href={`/profile/${author.username}`}><img src={author.image} /></a>
      <div className="info">
        <a href={`/profile/${author.username}`} className="author">{author.username}</a>
        <span className="date">{article.createdAt}</span>
      </div>
      <ArticleActions article={article} />
    </div >
  )
}
