import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { ArticlesList } from "../components/articles-list"
import { Pagination } from "../components/pagination"
import { getArticles, getFeeds } from "../services/article.service"
import { PopularTag } from "../components/popular-tags"
import { Banner } from "../components/banner"
import { YOUR_FEED, GLOBAL_FEED } from "../shared/constants"
import { FeedToggle } from "../components/feed-toggle"


export type Tab = "YOUR_FEED" | "GLOBAL_FEED"

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

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleOnTabChange = (tab: Tab) => {
    setTab(tab)
  }
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle tab={tab} onTabChange={handleOnTabChange} />
            {
              isPending && <div className="article-preview">Loading...</div>
            }
            {
              isSuccess && data.articles.length === 0 && <div className="article-preview"> No articles here... yet</div>
            }
            {
              isSuccess && <ArticlesList articles={data.articles} />
            }
            <Pagination totalPage={total} currentPage={currentPage} onPageChange={handleOnPageChange} />
          </div>
          <div className="col-md-3">
            <PopularTag />
          </div>
        </div>
      </div>
    </div>
  )
}
