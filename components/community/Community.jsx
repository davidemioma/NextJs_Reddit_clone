import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SUBREDDIT_List } from "../../graphQl/querys";
import Avatar from "../avatar/Avatar";
import { ChevronUpIcon } from "@heroicons/react/outline";
import classes from "./Community.module.css";
import Link from "next/link";

const Community = () => {
  const { data } = useQuery(GET_SUBREDDIT_List);

  const subreddits = data?.getSubredditList;

  return (
    <div className={classes.container}>
      <p className={classes.title}>Top Communities</p>

      {subreddits?.map((subreddit, i) => (
        <div key={subreddit.id} className={classes.subreddit}>
          <div className={classes.left}>
            <p>{i + 1}</p>

            <ChevronUpIcon
              width="15px"
              height="15px"
              color=" rgb(74 222 128)"
            />

            <Avatar seed={subreddit.topic} />

            <p>r/{subreddit.topic}</p>
          </div>

          <Link href={`/subreddit/${subreddit.topic}`}>
            <div className={classes.view}>View</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Community;
