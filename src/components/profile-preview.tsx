import { User } from "../shared/data-access/api/models/user"

interface ProfilePreviewProps {
  profile: User;
  isOwner: boolean
}

export const ProfilePreview = ({ profile, isOwner }: ProfilePreviewProps) => {

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" />
            <h4>{profile.username}</h4>
            <p>
              {profile.username}
            </p>
            {
              isOwner ?
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
                :
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {profile.username}
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
