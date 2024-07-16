import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { getArticles, getFeeds } from "../services/article.service"
import { ArticlesList } from "../components/articles-list"
import { Pagination } from "../components/pagination"

const YOUR_FEED: string = "YOUR_FEED"
const GLOBAL_FEED: string = "GLOBAL_FEED"

type Tab = "YOUR_FEED" | "GLOBAL_FEED"

const getQueryOptions = (tab: Tab, currentPage: number) => {
  const offset = (currentPage - 1) * 10
  if (tab === YOUR_FEED) {
    return {
      queryKey: ["articles_feed", tab, currentPage],
      queryFn: () => getFeeds(offset)
    }
  } else {
    return {
      queryKey: ["articles_global", tab, currentPage],
      queryFn: () => getArticles(offset)
    }
  }
}


export const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [tab, setTab] = useState<Tab>("YOUR_FEED")

  const queryOptions = getQueryOptions(tab, currentPage)
  const { isPending, data, isSuccess } = useQuery(queryOptions)


  const totalResults = data?.articlesCount ? data.articlesCount : 0
  useMemo(() => {
    const totalPage = Math.ceil(totalResults / 10)
    setTotal(totalPage)
  }, [totalResults])

  console.log(totalResults)


  const handleOnPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleOnClickTab = (tab: Tab) => {
    setTab(tab)
  }
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className={tab === YOUR_FEED ? "nav-link active" : "nav-link"} onClick={() => handleOnClickTab(YOUR_FEED as Tab)}>Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className={tab === GLOBAL_FEED ? "nav-link active" : "nav-link"} onClick={() => handleOnClickTab(GLOBAL_FEED as Tab)}>Global Feed</a>
                </li>
              </ul>
            </div>
            {
              isPending && <div className="article-preview">Loading...</div>
            }
            {
              isSuccess && data.articles.length === 0 && <div className="article-preview"> No article heres</div>
            }
            {
              isSuccess && <ArticlesList articles={data.articles} />
            }

            <Pagination totalPage={total} currentPage={currentPage} onPageChange={handleOnPageChange} />

          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
