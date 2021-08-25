import React from 'react';
import { useQuery } from '@apollo/client';

import BaseCampList from '../components/BaseCampList';
import BaseCampForm from '../components/BaseCampForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const BaseCamp = ({park,setShowBlog}) => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          // style={{  }}
        >
        {/* <button onClick={()=>setShowBlog(false)}>back</button> */}

{/* router /id then pull param from url */}
          <BaseCampForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BaseCampList
              thoughts={thoughts}
              title="My Blog..."
            />
          )}

        </div>
      </div>
    </main>
  );
};

export default BaseCamp;