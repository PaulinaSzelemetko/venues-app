import React, { useEffect, useState } from 'react';
import { PARAMS, URL_VENUES_DETAILS }  from '../consts';

const VenueList = (props)  => {



  const [venuesDetails, setVenuesDetails] = useState([]);
  const [participantsAdded, setParticipants] = useState(1);


  const venuesMock = [
    {
    "id": "5642aef9498e51025cf4a7a5",
    'name':'fake1',
    },
    {
      "id": "4bf58dd8d48988d1d5941735",
      'name':'fake2',
      },
      {
        "id": "4bf58dd8d48741735",
        'name':'fake3',
        }
  ]
    


  const getVenuesDetails = ()  => {

    const params = {
      client_id: PARAMS.client_id,
      client_secret: PARAMS.client_secret,
      v: PARAMS.v,
    };


    Promise.all(props.venues.map((item) => {
      const url =  new URL(URL_VENUES_DETAILS + item.id);
      url.search = new URLSearchParams(params).toString();

      fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
    }))


  };


  useEffect(() => {
    console.log(props);
    props.venues && getVenuesDetails();
  });


    const venueList = props.venues ? props.venues.map((item, i) => {
      
     console.log(venuesDetails);
      
      return (
        <div>
        <span key={i}>{item.name}</span>
        <span key={i}>{item.id}</span>
    
        </div>
      )
    }

    ) : null;

    const addParticipant = () => {
      setParticipants(participantsAdded => participantsAdded + 1)
      console.log(participantsAdded);
    }


    const renderVenuesTable = (venuesMock) => {
      return (
        <div>
        <table>
          <thead>
            <tr>Participans{venuesMock.map(venue => <th key={venue.id}>{venue.name}</th>)}</tr>
          </thead>
          <tbody>
            {[...Array(participantsAdded)].map(() => 
            <tr><input placeholder='Type your name...'/>{venuesMock.map(venue => <td key={venue.id}><input type='radio'/></td>)}</tr>
)}
            
    
    
          </tbody>
        </table>
        <button onClick={addParticipant}>Add participant</button>
    
      </div>
      )
    }

   return (
     // venueList ?
    venuesMock ? renderVenuesTable(venuesMock)
    : <span>There is no venue matches criteria</span>
   );
}

  export default VenueList;
