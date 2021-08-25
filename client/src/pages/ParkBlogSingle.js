import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleParkBlogPost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>
        HEY{thought.thoughtAuthor} <br />
        <span>
          Welcome User{thought.createdAt}
        </span>
      </h3>
      <div>
        <blockquote>
          {thought.thoughtText}
        </blockquote>
      </div>

      <div>
        <CommentList comments={thought.comments} />
      </div>
      <div>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleParkBlogPost;
