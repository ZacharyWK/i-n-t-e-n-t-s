import React from 'react';
import { useQuery } from '@apollo/client';

import ParkBlogList from '../components/ParkBlogList';
import ParkBlogForm from '../components/ParkBlogForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const ParkBlog = ({park,setShowBlog}) => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const code = park.id;
  localStorage.PARKCHOICE=code;
  localStorage.PARKCHOICENAME=park.name;


  return (
 
   <main>
    <div className="park-blog-card">

      <div className="park-blog-info">
        
        <div className="park-blog-Top">
        <h2 className="park-blog-header">{park.name}</h2>
        <h3>{park.designation}</h3>
        <ul>
        <li>Phone Number: {park.contacts.phoneNumbers[0].phoneNumber}</li>
        <li>NPS Web Page: <a href={park.Surl}>{park.name}</a></li>

        </ul>
        
        </div>
        
        {/* SLIDESHOW TO GO HERE */}
        <img class="park-blog-img" src={park.images[0].url} width="100%"/>

        <aside className="park-blog-location">
          {
          park.addresses
          ?
          park.addresses.map((addresses)=>(
          <p className="park-blog-addresses">
            <h4>{addresses.type} Address</h4>
            <ul>
              <li>{addresses.line1}</li> 
              <li>{addresses.city} {addresses.stateCode} {addresses.postalCode}</li>
            </ul>
          </p>
          ))
          :
          <p>
            Unfortunately, no addresses were provided.
            {/* {
              park.latitude && park.longitude
              ?
              <div className="park-blog-lat-lon">
                <p> Here is the Latitude & Longitude instead.</p>
                <ul>
                  <li>Latitude: {park.latitude}</li>
                  <li>Longitude: {park.longitude}</li>
                </ul>
              </div>
              :
              null
            } */}
          </p>
          }
           {          
          park.activities
          ?
          <details className="park-blog-activities">
            <summary>Activities</summary>
          {
          park.activities.map((activities)=>(
            <ul>
              <li>{activities.name}</li> 
            </ul>
          ))}
          </details>
          :
          null
        }
          {
          park.directionsInfo
            ?
              <details><summary>Directions</summary>{park.directionsInfo}</details>
            :
              null
          }
          {
          park.latitude && park.longitude
            ?
              <details className="park-blog-lat-lon">
                <summary>Lat & Lon</summary>
                  <ul>
                    <li>Latitude: {park.latitude}</li>
                    <li>Longitude: {park.longitude}</li>
                  </ul>
              </details>
            :
              null
          }
          {
        park.operatingHours && park.operatingHours[0].standardHours
        ?
        <details>
          <summary> Office Operating Hours </summary>
            <ul>
              <li>Monday: {park.operatingHours[0].standardHours.monday}</li> 
              <li>Tuesday: {park.operatingHours[0].standardHours.tuesday}</li> 
              <li>Wednesday: {park.operatingHours[0].standardHours.wednesday}</li> 
              <li>Thursday: {park.operatingHours[0].standardHours.thursday}</li> 
              <li>Friday: {park.operatingHours[0].standardHours.friday}</li> 
              <li>Saturday: {park.operatingHours[0].standardHours.saturday}</li> 
              <li>Sunday: {park.operatingHours[0].standardHours.sunday}</li>
              {/* <br/>
              <li>Exceptions</li>  */}
            </ul>
        </details>
        :
        null
        }
        </aside>

        <div className="park-blog-description">
          <br/>
          <h4>About {park.name}</h4>
          <p>{park.description}</p>
          <h4>Weather Information</h4>
          <p>{park.weatherInfo}</p>
        </div>


        <button className="park-blog-back" onClick={()=>setShowBlog(false)}>Back to Search</button>

      </div>

      <div className="park-blog-posts">        
        <ParkBlogForm park={park}/>

        {loading 
          ? 
            (<div className="park-blog-loading">Setting up Camp...</div>) 
          : 
            (
              <ParkBlogList
                park={park}
                thoughts={thoughts}
                title={park.name+" Posts!"}
              />
            )
        }
      </div>
    </div>
  </main>
  );
};

export default ParkBlog;