import { Comment } from "../shared/data-access/api/models/comment"
import { useAuthStore } from "../shared/data-access/auth.store"

interface CommentListProps {
  comments: Comment[]
}


export const CommentsList = ({ comments }: CommentListProps) => {
  return (
    comments.map((comment) => (
      <div className="card" key={comment.id}>
        <div className="card-block">
          <p className="card-text">
            {comment.body}
          </p>
        </div>
        <div className="card-footer">
          <a href={`/profile/${comment.author.username}`} className="comment-author">
            <img src={comment.author.image} className="comment-author-img" />
          </a>
          &nbsp;
          <a href={`/profile/${comment.author.username}`} className="comment-author">{comment.author.username}</a>
          <span className="date-posted">{comment.createdAt}</span>
        </div>
      </div>
    ))
  )
}
