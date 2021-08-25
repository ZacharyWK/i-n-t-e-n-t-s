import React from 'react';
import { Link } from 'react-router-dom';

const ParkBlogList = ({ thoughts, title, key, park }) => {
  if (!thoughts.length) {
    return <h3 className="parkBlogHeader">Be the first to make a post for {park.name}!</h3>;
  }

  return (
    <div>
      <h3 className="parkBlogHeader">{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {thought.thoughtAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                {thought.createdAt}
              </span>
            </h4>
            <div  className="card-body bg-light p-2">
              <p style={{ flexShrink: 1, flexWrap: 'wrap'}}>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Please Login.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ParkBlogList;


