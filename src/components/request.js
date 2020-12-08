import React from 'react';

const getVenues = (address)  => {

    const url =  new URL(`https://api.foursquare.com/v2/venues/search`);
    const params = {
      client_id: '0PRP0H0FLFBQTQXZRFMYEIPEQK1FRD42ZI0AGW2N3F23B3KQ',
      client_secret: 'RZ5OIGFQ3TI4DOCORFD4S4UORXSXXIIS2KPRLDCIWUWP2DPW',
      limit: 3,
      query: 'lunch',
      near: address,
      v: '20190724',
    };

    url.search = new URLSearchParams(params).toString();

    fetch(url).then(response => response.json())
    .then(data => data.response);
  };

  export default getVenues;