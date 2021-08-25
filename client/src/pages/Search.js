import React, { useState } from "react";
import ParkBlog from "./ParkBlog";
import axios from "axios";
import "./css/search.css";
import styled, { css } from "styled-components";
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";


const Search = () => {
  const [selection, setSelection] = useState();
  console.log(selection);

  const [results, setResults] = useState();

  const [showBlog, setShowBlog] = useState(false);

  const [park, setPark] = useState();

  let pathName = async () => {
    park.name.replace(/\s+/g, '');
  }

  const findParks = async () => {
    const response = await axios.get(`/api/parks/${selection}`);
    console.log("<<<<LOG FOR REF>>>>> ", response.data.data);
    setResults(response.data.data);
  };

  const handleChange = (e) => setSelection(e.target.value);

  const openParkBlog = (parkId) => {
    setPark(results.find(({ id }) => id === parkId));
    setShowBlog(true);
  };

  if (showBlog) {
    return (

      <ParkBlog park={park} setShowBlog={setShowBlog}/>

    );
  }


// SEARCH BAR
  return (
    <main className="mainSearch">
      <div className="searchInput">
        <p className="question"></p>

        <select onChange={(e) => handleChange(e)}>
          <option>choose state</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <button id="stateSearch" onClick={findParks}>
          SEARCH
        </button>
      </div>



{/* PARK CARD PER RESULT */}
{
results 
? 
results.map((park) => (
<div className="parkCard">
  <a class="singleCard" onClick={() => openParkBlog(park.id)}>

    <div class="cardTitle" key={park.id}>{park.name}</div>

    <img class="parkImg" src={park.images[0].url} height="200" />

    <ul class="info">
      <li>Address: 
        {park.addresses[0].line1} 
        {park.addresses[0].city}{" "}
        {park.addresses[0].stateCode} 
        {park.addresses[0].postalCode}
        </li>
      <br />
      <li>Latitude: {park.latitude}</li>
      <li>Longitude: {park.longitude}</li>
      </ul>

    </a>
</div>
)) 
: 
null
}

</main>
);
};

export default Search;
