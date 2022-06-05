import React, { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import Avatar from "../avatar/Avatar";
import { useSession } from "next-auth/react";
import { ADD_VOTE } from "../../graphQl/mutations";
import { GET_VOTES_BY_POST_ID } from "../../graphQl/querys";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import toast from "react-hot-toast";
import classes from "./Post.module.css";

const Post = ({ post }) => {
  const { data: session } = useSession();

  const [hasVote, setHasVote] = useState();

  const { data } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      id: post?.id,
    },
  });

  const votes = data?.getVotesUsingPost_id;

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesUsingPost_id"],
  });

  useEffect(() => {
    const vote = votes?.find((vote) => vote.username === session?.user?.name);

    setHasVote(vote?.upvote);
  }, [data]);

  const upvote = async (isUpvote) => {
    if (!session) {
      toast.error("You'll need to sign in to vote!");

      return;
    }

    if (hasVote && isUpvote) return;

    if (hasVote === false && !isUpvote) return;

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  const dispalayVotes = (data) => {
    const votes = data?.getVotesUsingPost_id;

    const dispalyNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (dispalyNumber === 0) return votes[0]?.upvote ? 1 : -1;

    return dispalyNumber;
  };

  return (
    <Link href={`/post/${post?.id}`}>
      <div className={classes.container}>
        <div className={classes.votes}>
          <ArrowUpIcon
            className={classes.vote_btn_blue}
            onClick={() => upvote(true)}
          />

          <p>{dispalayVotes(data)}</p>

          <ArrowDownIcon
            className={classes.vote_btn_red}
            onClick={() => upvote(false)}
          />
        </div>

        <div className={classes.contents}>
          <div className={classes.header}>
            <Avatar seed={post?.subreddit?.topic} />

            <Link href={`/subreddit/${post?.subreddit?.topic}`}>
              <p className={classes.hover_text}>r/{post?.subreddit?.topic}</p>
            </Link>

            <p className={classes.header_text}>
              . Posted by {post?.username}{" "}
              <Moment fromNow date={post?.created_at} />
            </p>
          </div>

          <div className={classes.info}>
            <h2>{post?.title}</h2>

            <p>{post?.body}</p>
          </div>

          {post?.image && (
            <img className={classes.image} src={post?.image} alt="" />
          )}

          <div className={classes.footer}>
            <div>
              <ChatAltIcon className={classes.icon} />

              <p>{post?.commentsList.length} Comments</p>
            </div>

            <div className={classes.hidden}>
              <GiftIcon className={classes.icon} />

              <p>Awards</p>
            </div>

            <div className={classes.hidden}>
              <ShareIcon className={classes.icon} />

              <p>Share</p>
            </div>

            <div className={classes.hidden}>
              <BookmarkIcon className={classes.icon} />

              <p>Save</p>
            </div>

            <DotsHorizontalIcon className={classes.icon} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
