import { gql } from "@apollo/client";

export const GET_SUBREDDIT_List = gql`
  query myQuery {
    getSubredditList {
      created_at
      id
      topic
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      created_at
      id
      topic
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query myQuery($id: ID!) {
    getVotesUsingPost_id(id: $id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query myQuery($id: ID!) {
    getPost(id: $id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      commentsList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      commentsList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      commentsList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;
