import React from "react";
import Post from "../post/Post";
import classes from "./Feed.module.css";

const Feed = ({ posts }) => {
  return (
    <div className={classes.feed}>
      {posts?.map((post) => (
        <Post key={post?.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
