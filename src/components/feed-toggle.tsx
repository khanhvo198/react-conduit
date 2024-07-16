import { Tab } from "../pages/home"
import { YOUR_FEED, GLOBAL_FEED } from "../shared/constants"

interface FeedToggleProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void
}

export const FeedToggle = ({ tab, onTabChange }: FeedToggleProps) => {

  const handleOnTabChange = (tab: Tab) => {
    onTabChange(tab)
  }

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className={tab === YOUR_FEED ? "nav-link active" : "nav-link"} onClick={() => handleOnTabChange(YOUR_FEED as Tab)}>Your Feed</a>
        </li>
        <li className="nav-item">
          <a className={tab === GLOBAL_FEED ? "nav-link active" : "nav-link"} onClick={() => handleOnTabChange(GLOBAL_FEED as Tab)}>Global Feed</a>
        </li>
      </ul>
    </div>
  )
}
