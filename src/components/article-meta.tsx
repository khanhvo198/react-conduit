import { Article } from "../shared/data-access/api/models/article"
import { useAuthStore } from "../shared/data-access/auth.store"

interface ArticleMetaProps {
  article: Article
}

export const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const { user } = useAuthStore()
  const author = article.author
  const isOwner = author.username === user?.username

  return (
    <div className="article-meta">
      <a href={`/profile/${author.username}`}><img src={author.image} /></a>
      <div className="info">
        <a href={`/profile/${author.username}`} className="author">{author.username}</a>
        <span className="date"></span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span className="counter">(10)</span>
      </button>
      &nbsp; &nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post <span className="counter">(29)</span>
      </button>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-edit"></i> Edit Article
      </button>
      <button className="btn btn-sm btn-outline-danger">
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </div >
  )
}
