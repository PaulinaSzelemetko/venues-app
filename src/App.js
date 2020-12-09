import "./styles/App.css";
import Searching from "./components/Searching";
import VenuesTable from "./components/VenuesTable";
import { PARAMS, URL_ALL_VENUES } from "./consts";

import { useEffect, useState } from "react";

function App() {
  const [venues, setVenues] = useState([]);

  const handleSubmit = (value) => {
    getVenues(value);
  };

  useEffect(() => {
    console.log(venues);
  });

  const getVenues = (address) => {
    const url = new URL(URL_ALL_VENUES);
    const params = {
      client_id: PARAMS.client_id,
      client_secret: PARAMS.client_secret,
      limit: PARAMS.limit,
      query: PARAMS.query,
      near: address,
      v: PARAMS.v,
    };

    const paramsDetail = {
      client_id: PARAMS.client_id,
      client_secret: PARAMS.client_secret,
      v: PARAMS.v,
    };

    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setVenues(response.response.venues);
      })
      .then(
        venues.map((item) => {
          const urlDetail = new URL(`https://api.foursquare.com/v2/venues/${item.id}`);
          urlDetail.search = new URLSearchParams(paramsDetail).toString();
  
          fetch(urlDetail)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
        })
      )
  };


  // const getVenuesDetails = () => {
  //   const params = {
  //     client_id: PARAMS.client_id,
  //     client_secret: PARAMS.client_secret,
  //     v: PARAMS.v,
  //   };


  //     venues.map((item) => {
  //       const url = new URL(`https://api.foursquare.com/v2/venues/${item.id}`);
  //       url.search = new URLSearchParams(params).toString();

  //       fetch(url)
  //         .then((response) => response.json())
  //         .then((data) => console.log(data));
  //     });

 





  return (
    <div className='venues-app-container'>
      <Searching onSubmit={(value) => handleSubmit(value)} />
      <VenuesTable venues={venues} />
    </div>
  );
}

export default App;
