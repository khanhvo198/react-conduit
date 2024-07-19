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
        <a href={`/profile/${author.username}`} className="author">{author.username}</a>
        <span className="date">{article.createdAt}</span>
      </div>
    </>
  )
}
