import { Article } from "../shared/data-access/api/models/article"
import { TagList } from "./tag-list"

interface ArticleProps {
  article: Article
}

export const ArticlePreview = ({ article }: ArticleProps) => {

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={article.author.username}><img src={article.author.image} /></a>
        <div className="info">
          <a href={article.author.username} className="author">{article.author.username}</a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tagList={article.tagList} />
      </a>
    </div>
  )
}
