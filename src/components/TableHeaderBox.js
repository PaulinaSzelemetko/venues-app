import React from "react";
import "../styles/VenuesTable.css";

const TableHeaderBox = (props) => {
  const getCategory = (id) =>
    props.venues
      .find((item) => item.id === id)
      .categories.map((item) => item.name);

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
          <p>
            <a href={props.details[venue.id]}>{venue.name}</a>
          </p>
          {getCategory(venue.id).length > 0 ? (
            <p className="categories">
              Categories: <br />
              {getCategory(venue.id)}
            </p>
          ) : (
            <p className="categories">
              Categories: <br />
              no categories added
            </p>
          )}
        </th>
      ))}
    </React.Fragment>
  );
};

export default TableHeaderBox;
