import React, { useEffect, useState } from "react";
import '../styles/VenuesTable.css';
import { PARAMS, URL_VENUES_DETAILS } from "../consts";

const VenuesTable = (props) => {
  const [venuesDetails, setVenuesDetails] = useState([]);
  const [participantsAdded, setParticipants] = useState(1);
  const [columns, setColumns] = useState({});
  const [theWinner, setTheWinner] = useState([]);


  const venues = props.venues;

//   const getVenuesDetails = () => {
//     const params = {
//       client_id: PARAMS.client_id,
//       client_secret: PARAMS.client_secret,
//       v: PARAMS.v,
//     };


//       venues.map((item) => {
//         const url = new URL(`https://api.foursquare.com/v2/venues/${item.id}`);
//         url.search = new URLSearchParams(params).toString();

//         fetch(url)
//           .then((response) => response.json())
//           .then((data) => console.log(data));
//       });

//  }

  // useEffect(() => {
  //   venues && getVenuesDetails();
  // },[]);

  // let winnerColumn;


    useEffect(() => {
     const checkAmountInColumns = Object.values(columns).reduce((result, current) => {
       result[current] ? result[current]++ : result[current]=1;
       return result },{});
       

      const winnerColumn = Object.keys(checkAmountInColumns).reduce((result, current) => { return checkAmountInColumns[result] > checkAmountInColumns[current] ? result : current}, []);
       console.log("winner " + winnerColumn)
       console.log(columns)

       setTheWinner(prevState => ({ ...prevState, theWinner: winnerColumn }))


  },[columns]);

  const venueList = venues
    ? venues.map((item, i) => {

        return (
          <div>
            <span key={i}>{item.name}</span>
            <span key={i}>{item.id}</span>
          </div>
        );
      })
    : null;

  const addParticipant = () => {
    setParticipants((participantsAdded) => participantsAdded + 1);
  };


  const onRadioClick = (columnNr, rowNr) => {
    setColumns({...columns, [rowNr]: columnNr});
   }


  const renderVenuesTable = (venues) => {

    console.log(Object.values(theWinner));


    return (
      <div className='table-with-button'>
        <table>
          <thead>
            <tr>
              <th>Participans</th>
              {venues.map((venue) => (
                <th key={venue.id}>{venue.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(participantsAdded)].map((name, index) => (
              <tr>
                <td><input placeholder="Type your name..." /></td>
                {venues.map((venue) => (
                  <td className={venue.id === 'fake' ? 'winner-column' : 'oridinary-column'} key={venue.id}>
                    <input  type="radio" name={index} onClick={() => onRadioClick(venue.id, index)}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addParticipant}>Add participant</button>
      </div>
    );
  };



  return (
    venues && venues.length > 0 ? (
      renderVenuesTable(venues)
    ) : (
      <p className='no-venues-info'>There are no venues that match criteria.</p>
    )
  );
};

export default VenuesTable;
