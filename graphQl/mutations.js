import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $username: String!, $post_id: ID!) {
    insertComments(text: $text, username: $username, post_id: $post_id) {
      post_id
      text
      username
      id
      created_at
    }
  }
`;

export const ADD_VOTE = gql`
  mutation addVote($post_id: ID!, $upvote: Boolean!, $username: String!) {
    insertVotes(post_id: $post_id, upvote: $upvote, username: $username) {
      post_id
      upvote
      username
      id
      created_at
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $body: String!
    $image: String!
    $username: String!
    $subreddit_id: ID!
  ) {
    insertPost(
      title: $title
      body: $body
      image: $image
      username: $username
      subreddit_id: $subreddit_id
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation addSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;
