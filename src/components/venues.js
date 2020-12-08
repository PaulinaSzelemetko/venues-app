import React from 'react';

const VenueList = (props)  => {

    const venueList = props.venues.map((item, i) =>
    <li key={i}>{item.name}</li>
    );

   return (
     <ul>{venueList}</ul>

     
   );
}

  export default VenueList;
