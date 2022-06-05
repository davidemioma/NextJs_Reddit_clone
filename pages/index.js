import React from "react";
import Head from "next/head";
import SearchBox from "../components/search-box/SearchBox";
import Feed from "../components/feed/Feed";
import Community from "../components/community/Community";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphQl/querys";

const Home = () => {
  const { data } = useQuery(GET_ALL_POSTS);

  const posts = data?.getPostList;

  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
      </Head>

      <div className="app">
        <SearchBox />

        <div className="flex">
          <div className="feed">
            <Feed posts={posts} />
          </div>

          <Community />
        </div>
      </div>
    </div>
  );
};

export default Home;
