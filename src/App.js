import './App.css';
import  Searching  from './components/searching';
import  VenueList  from './components/venues';
import { PARAMS, URL_ADDRESS }  from './consts';


import { useEffect, useState } from 'react';

function App() {
  const [venues, setVenues] = useState([]);

  const handleSubmit = (value)=> {
    getVenues(value);
  }
 
  useEffect(() => {
    // console.log(venues);
  });

  const getVenues = (address)  => {

    const url =  new URL(URL_ADDRESS);
    const params = {
      client_id: PARAMS.client_id,
      client_secret: PARAMS.client_secret,
      limit: PARAMS.limit,
      query: PARAMS.query,
      near: address,
      v: PARAMS.v,
    };

    url.search = new URLSearchParams(params).toString();

    fetch(url).then(response => response.json())
    .then(response => {
      setVenues(response.response.venues);
    });
  };

    return (
      <div>
        <Searching onSubmit={(value)=>handleSubmit(value)}/>
        <VenueList venues={venues}/>
      </div>
    );
  
};


export default App;
