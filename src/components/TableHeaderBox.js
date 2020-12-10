import React from "react";
import "../styles/VenuesTable.css";

const TableHeaderBox = (props) => { 

    console.log("props")
    console.log(props.details)
  return (
    <React.Fragment>
      <th>Participans</th>
      {props.venues.map((venue) => (
        <th
          className={
            props.theWinner.includes(venue.id)
              ? "winner-column"
              : "oridinary-column"
          }
          key={venue.id}
        >
          <p><a href={props.details[venue.id]}>{venue.name}</a></p>
        </th>
      ))}
    </React.Fragment>
  );
};

export default TableHeaderBox;
