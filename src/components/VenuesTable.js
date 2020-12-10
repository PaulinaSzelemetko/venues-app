import React, { useEffect, useState } from "react";
import "../styles/VenuesTable.css";
import "../styles/GlobalStyles.css";
import TableHeaderBox from "./TableHeaderBox";
import TableBody from "./TableBody";

const VenuesTable = (props) => {
  const [participantsAdded, setParticipants] = useState(1);
  const [columns, setColumns] = useState({});
  const [theWinner, setTheWinner] = useState([]);

  const venues = props.venues;
  const venuesURLsfromDetails = props.venuesURLsfromDetails;

  useEffect(() => {
    const votesAmountInColumns = Object.values(columns).reduce(
      (result, current) => {
        result[current] ? result[current]++ : (result[current] = 1);
        return result;
      },
      {}
    );

    const columnsWithTheHighestScore = Object.keys(votesAmountInColumns).filter(
      (number) => {
        return (
          votesAmountInColumns[number] ===
          Math.max.apply(null, Object.values(votesAmountInColumns))
        );
      }
    );

    setTheWinner(columnsWithTheHighestScore);
  }, [columns]);

  const addParticipant = () => {
    setParticipants((participantsAdded) => participantsAdded + 1);
  };

  const onRadioClick = (columnNr, rowNr) => {
    setColumns({ ...columns, [rowNr]: columnNr });
  };

  const renderVenuesTable = (venues) => {
    return (
      <div className="table-with-button">
        <table>
          <TableHeaderBox
            venues={venues}
            details={venuesURLsfromDetails}
            theWinner={theWinner}
          />
          <TableBody
            venues={venues}
            onRadioClick={onRadioClick}
            participantsAdded={participantsAdded}
            theWinner={theWinner}
          />
        </table>
        <button onClick={addParticipant}>Add participant</button>
      </div>
    );
  };

  return venues && venues.length ? (
    renderVenuesTable(venues)
  ) : (
    <p className="no-venues-info">There are no venues to show.</p>
  );
};

export default VenuesTable;
