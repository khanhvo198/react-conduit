import { useMutation } from "@tanstack/react-query";
import { favoriteArticle, unfavoriteArticle } from "../services/article.service";
import { followProfile, unfollowProfile } from "../services/user.service";
import { Article } from "../shared/data-access/api/models/article";
import { User } from "../shared/data-access/api/models/user";
import { useAuthStore } from "../shared/data-access/auth.store";

interface ArticleActionProps {
  article: Article;
  toggleFavorite: (article: Article) => void;
  toggleFollow: (profile: User) => void;
}

interface ArticleUserActionsProps {
  article: Article;
  toggleFavorite: (article: Article) => void;
  toggleFollow: (profile: User) => void;
}


const ArticleOwnerActions = () => {
  return (
    <>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-edit"></i> Edit Article
      </button>
      <button className="btn btn-sm btn-outline-danger">
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </>
  )
}


const ArticleUserActions = ({ article, toggleFollow, toggleFavorite }: ArticleUserActionsProps) => {
  const author = article.author

  const handleOnSuccessFollow = (data: { profile: User }) => {
    toggleFollow(data.profile)
  }

  const handleOnSuccessFavorite = (data: { article: Article }) => {
    toggleFavorite(data.article)
  }

  const { mutate: handleUnfollowAuthor } = useMutation({
    mutationKey: ["unfollow_author", author.username],
    mutationFn: () => unfollowProfile(author.username),
    onSuccess: handleOnSuccessFollow
  })

  const { mutate: handleFollowAuthor } = useMutation({
    mutationKey: ["follow_author", author.username],
    mutationFn: () => followProfile(author.username),
    onSuccess: handleOnSuccessFollow
  })
  const { mutate: handleFavoriteArticle } = useMutation({
    mutationKey: ["favorite_article", article.slug],
    mutationFn: () => favoriteArticle(article.slug),
    onSuccess: handleOnSuccessFavorite
  })
  const { mutate: handleUnfavoriteArticle } = useMutation({
    mutationKey: ["unfavorite_article", article.slug],
    mutationFn: () => unfavoriteArticle(article.slug),
    onSuccess: handleOnSuccessFavorite
  })

  return (
    <>
      {
        author.following ?
          <button className="btn btn-sm btn-secondary" onClick={() => handleUnfollowAuthor()}>
            <i className="ion-minus-round"></i>
            &nbsp; Unfollow {author.username}
          </button>
          :
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleFollowAuthor()}>
            <i className="ion-plus-round"></i>
            &nbsp; Follow {author.username}
          </button>
      }
      &nbsp; &nbsp;
      {
        article.favorited ?
          <button className="btn btn-sm btn-primary" onClick={() => handleUnfavoriteArticle()}>
            <i className="ion-heart"></i>
            &nbsp; Unfavorite Post <span className="counter">({article.favoritesCount})</span>
          </button>
          :
          <button className="btn btn-sm btn-outline-primary" onClick={() => handleFavoriteArticle()}>
            <i className="ion-heart"></i>
            &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
          </button>
      }
    </>
  )
}


export const ArticleActions = ({ article, toggleFollow, toggleFavorite }: ArticleActionProps) => {
  const { user } = useAuthStore()
  const isOwner = article.author.username === user?.username

  return isOwner ? <ArticleOwnerActions /> : <ArticleUserActions article={article} toggleFollow={toggleFollow} toggleFavorite={toggleFavorite} />
}
