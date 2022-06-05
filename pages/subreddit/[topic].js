import { useRouter } from "next/router";
import React from "react";
import SearchBox from "../../components/search-box/SearchBox";
import Header from "../../components/sub-header/Header";
import Feed from "../../components/feed/Feed";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS_BY_TOPIC } from "../../graphQl/querys";

const Subreddit = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_ALL_POSTS_BY_TOPIC, {
    variables: {
      topic: router.query.topic,
    },
  });

  const posts = data?.getPostListByTopic;

  return (
    <div>
      <Header topic={router.query.topic} />

      <div className="app">
        <SearchBox subreddit={router.query.topic} />

        <div className="subreddit-feed">
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Subreddit;
