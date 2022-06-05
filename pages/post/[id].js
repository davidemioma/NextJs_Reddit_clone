import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "../../graphQl/querys";
import React from "react";
import PostDetails from "../../components/post-details/PostDetails";

const Post = () => {
  const router = useRouter();

  const { data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: router.query.id,
    },
  });

  const post = data?.getPost;

  return (
    <div className="app">
      <PostDetails post={post} />
    </div>
  );
};

export default Post;
