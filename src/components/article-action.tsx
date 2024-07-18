import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Article } from "../shared/data-access/api/models/article";
import { User } from "../shared/data-access/api/models/user";
import { useAuthStore } from "../shared/data-access/auth.store";
import { followProfile, unfollowProfile } from "../services/user.service";
import { favoriteArticle, unfavoriteArticle } from "../services/article.service";

interface ArticleActionProps {
  article: Article;
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

interface ArticleUserActionsProps {
  article: Article
}

const ArticleUserActions = ({ article }: ArticleUserActionsProps) => {
  const [currentAuthor, setCurrentAuthor] = useState<User>(article.author);
  const [currentArticle, setCurrentArticle] = useState<Article>(article);

  const handleOnSuccessFollow = (data: { profile: User }) => {
    console.log(data)
    setCurrentAuthor({
      ...currentAuthor,
      following: data.profile.following
    })
  }

  const handleOnSuccessFavorite = (data: { article: Article }) => {
    console.log(data)
    setCurrentArticle({
      ...currentArticle,
      favoritesCount: data.article.favoritesCount,
      favorited: data.article.favorited
    })
  }
  const { mutate: handleUnfollowAuthor } = useMutation({ mutationKey: ["unfollow_author", currentAuthor.username], mutationFn: () => unfollowProfile(currentAuthor.username), onSuccess: handleOnSuccessFollow })
  const { mutate: handleFollowAuthor } = useMutation({ mutationKey: ["follow_author", currentAuthor.username], mutationFn: () => followProfile(currentAuthor.username), onSuccess: handleOnSuccessFollow })
  const { mutate: handleFavoriteArticle } = useMutation({ mutationKey: ["favorite_article", currentArticle.slug], mutationFn: () => favoriteArticle(currentArticle.slug), onSuccess: handleOnSuccessFavorite })
  const { mutate: handleUnfavoriteArticle } = useMutation({ mutationKey: ["unfavorite_article", currentArticle.slug], mutationFn: () => unfavoriteArticle(currentArticle.slug), onSuccess: handleOnSuccessFavorite })



  return (
    <>
      {
        currentAuthor.following ?
          <button className="btn btn-sm btn-secondary" onClick={() => handleUnfollowAuthor()}>
            <i className="ion-minus-round"></i>
            &nbsp; Unfollow {currentAuthor.username}
          </button>
          :
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handleFollowAuthor()}>
            <i className="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
          </button>
      }
      &nbsp; &nbsp;
      {
        currentArticle.favorited ?
          <button className="btn btn-sm btn-primary" onClick={() => handleUnfavoriteArticle()}>
            <i className="ion-heart"></i>
            &nbsp; Unfavorite Post <span className="counter">({currentArticle.favoritesCount})</span>
          </button>
          :
          <button className="btn btn-sm btn-outline-primary" onClick={() => handleFavoriteArticle()}>
            <i className="ion-heart"></i>
            &nbsp; Favorite Post <span className="counter">({currentArticle.favoritesCount})</span>
          </button>
      }
    </>
  )
}


export const ArticleActions = ({ article }: ArticleActionProps) => {
  const { user } = useAuthStore()
  const isOwner = article.author.username === user?.username

  return isOwner ? <ArticleOwnerActions /> : <ArticleUserActions article={article} />
}
