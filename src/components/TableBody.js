import React from "react";
import "../styles/VenuesTable.css";

const TableBody = (props) => {
  return (
    <React.Fragment>
      <tbody className="table-body">
        {[...Array(props.participantsAdded)].map((name, index) => (
          <tr key={index}>
            <td>
              <input type="text" placeholder="Type your name..." />
            </td>
            {props.venues.map((venue) => (
              <td
                className={
                  props.theWinner.includes(venue.id)
                    ? "winner-column"
                    : "oridinary-column"
                }
                key={venue.id}
              >
                <input
                  type="radio"
                  name={index}
                  onClick={() => props.onRadioClick(venue.id, index)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  );
};

export default TableBody;
