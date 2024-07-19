import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ArticleActions } from "../components/article-action"
import { ArticleMeta } from "../components/article-meta"
import { TagList } from "../components/tag-list"
import { getArticle } from "../services/article.service"
import { Article } from "../shared/data-access/api/models/article"
import { User } from "../shared/data-access/api/models/user"
import { CommentsList } from "../components/comments-list"
import { getComments } from "../services/comment.service"
import { Comment } from "../shared/data-access/api/models/comment"
import { CommentForm } from "../components/comment-form"


const initArticle = {
  slug: "",
  title: "",
  description: "",
  body: "",
  tagList: [],
  createdAt: "",
  updatedAt: "",
  favorited: false,
  favoritesCount: 0,
  author: {
    bio: "",
    image: "",
    username: "",
    following: false,
    token: "",
    email: ""
  },
  id: 0,
  authorId: 0,
  favoritedBy: []
}

export const ArticlePage = () => {
  const { slug } = useParams()
  const [currentArticle, setCurrentArticle] = useState<Article>(initArticle)
  const [currentComments, setCurrentComments] = useState<Comment[]>([])
  const { isPending: isPendingArticle, isSuccess: isSuccessArticle, data: dataArticle } = useQuery({
    queryKey: ["article"], queryFn: () => getArticle(slug!)
  })

  const { isPending: isPendingComments, isSuccess: isSuccessComments, data: dataComments } = useQuery({
    queryKey: ["comments"], queryFn: () => getComments(slug!)
  })

  useEffect(() => {
    if (isSuccessArticle) {
      setCurrentArticle({ ...dataArticle.article })
    }
  }, [isSuccessArticle])

  useEffect(() => {
    if (isSuccessComments) {
      setCurrentComments([...dataComments.comments])
    }
  }, [isSuccessComments])



  const handleToggleFollow = (profile: User) => {
    setCurrentArticle({
      ...currentArticle,
      author: {
        ...profile
      }
    })
  }

  const handleToggleFavorite = (article: Article) => {
    setCurrentArticle({
      ...article
    })
  }

  const handleCreateComment = (comment: Comment) => {
    currentComments.push(comment)
    setCurrentComments([...currentComments])
  }

  if (isPendingArticle) return <div>Loading...</div>


  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{currentArticle.title}</h1>
          <div className="article-meta">
            <ArticleMeta article={currentArticle} />
            <ArticleActions article={currentArticle} toggleFavorite={handleToggleFavorite} toggleFollow={handleToggleFollow} />
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>
              {currentArticle.body}
            </p>
            <TagList tagList={currentArticle.tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <ArticleMeta article={currentArticle} />
            <ArticleActions article={currentArticle} toggleFavorite={handleToggleFavorite} toggleFollow={handleToggleFollow} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm addComment={handleCreateComment} slug={currentArticle.slug} />
            <CommentsList comments={currentComments} />
          </div>
        </div>

      </div>
    </div>
  )
}
