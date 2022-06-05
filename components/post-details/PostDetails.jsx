import React from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphQl/mutations";
import { GET_POST_BY_ID } from "../../graphQl/querys";
import { useMutation } from "@apollo/client";
import Post from "../post/Post";
import toast from "react-hot-toast";
import Avatar from "../avatar/Avatar";
import Moment from "react-moment";
import classes from "./PostDetails.module.css";

const PostDetails = ({ post }) => {
  const { data: session } = useSession();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, "getPost"],
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (formData) => {
    const notification = toast.loading("Posting your comment...");

    await addComment({
      variables: {
        username: session?.user?.name,
        post_id: post.id,
        text: formData.comment,
      },
    });

    setValue("comment", "");

    toast.success("Comment successfully posted..", {
      id: notification,
    });
  };

  return (
    <div className={classes.container}>
      <Post post={post} />

      <div className={classes.contents}>
        <p className={classes.text}>
          Comment as <span>{session?.user.name}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
          <textarea
            {...register("comment", { required: true })}
            disabled={!session}
            type="text"
            placeholder={
              session ? "Post a comment" : "Please sign in to post a comment"
            }
          />

          {Object.keys(errors).length > 0 && (
            <div className={classes.errors}>
              {errors.comment?.type === "required" && (
                <p>A comment is required</p>
              )}
            </div>
          )}

          <button
            className={!session ? classes.disabled : ""}
            disabled={!session}
            type="submit"
          >
            Comment
          </button>
        </form>

        <div className={classes.comments}>
          {post?.commentsList?.map((comment) => (
            <div key={comment.id} className={classes.comment}>
              <hr />

              <div className={classes.comment_contents}>
                <Avatar seed={comment.username} />

                <div>
                  <p className={classes.info}>
                    {comment.username} .{" "}
                    <Moment
                      className={classes.time}
                      fromNow
                      date={comment.created_at}
                    />
                  </p>

                  <p className={classes.comment_text}>{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
