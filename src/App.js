import "./styles/GlobalStyles.css";
import VenuesTable from "./components/VenuesTable";
import Searching from "./components/Searching";

import { PARAMS, URL_ALL_VENUES, URL_VENUES_DETAILS } from "./consts";

import { useState } from "react";

function App() {
  const [venues, setVenues] = useState([]);
  const [venuesURLsfromDetails, setVenuesURLfromDetails] = useState({});

  const handleSubmit = (value) => {
    getVenues(value);
  };

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
        const detailsObject = {};

        response.response.venues &&
          response.response.venues.map((item) => {
            const urlDetail = new URL(URL_VENUES_DETAILS + item.id);
            urlDetail.search = new URLSearchParams(paramsDetail).toString();

            fetch(urlDetail)
              .then((response) => response.json())
              .then((response) => {
                detailsObject[item.id] = response.response.venue.shortUrl;
                setVenuesURLfromDetails({ ...detailsObject });
              });
          });
        setVenues(response.response.venues);
      });
  };

  async function getVenuesDetails(urlDetail) {
    let shortUrl = await fetch(urlDetail)
      .then((response) => response.json())
      .then((response) => {
        return response.response.venue.shortUrl;
      });
    return shortUrl;
  }

  return (
    <div className="venues-app-container">
      <Searching onSubmit={(value) => handleSubmit(value)} />
      <VenuesTable
        venues={venues}
        venuesURLsfromDetails={venuesURLsfromDetails}
      />
    </div>
  );
}

export default App;
