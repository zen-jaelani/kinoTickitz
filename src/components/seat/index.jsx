import React, { useState, useEffect } from "react";
import styles from "./seat.module.css";

function Seat(props) {
  const { rowSeat, selected, reserved, selectedSeat } = props;
  const [leftSide, setLeftSide] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [rightSide, setRightSide] = useState([8, 9, 10, 11, 12, 13, 14]);

  useEffect(() => {
    setupSeat();
  }, []);

  const setupSeat = () => {
    const leftSideRow = leftSide.map((item) => `${rowSeat}${item}`);
    const rightSideRow = rightSide.map((item) => `${rowSeat}${item}`);
    setLeftSide(leftSideRow);
    setRightSide(rightSideRow);
  };
  return (
    <>
      <div className="seat">
        <div className="row ">
          <div className="col p-0 text-center pt-2 d-none d-md-block">{rowSeat}</div>
          <div className="col-6 d-flex p-0">
            {leftSide.map((i) => (
              <div
                className={`${styles.seatList} btn m-1 p-0 
              ${
                reserved.includes(i)
                  ? "bg-black disabled"
                  : selected.includes(i)
                  ? `${styles.selected}`
                  : styles.available
              }`}
                onClick={() => (reserved.includes(i) ? null : selectedSeat(i))}
                key={i}
              ></div>
            ))}
          </div>
          <div className="col-6 d-flex col-md-5 p-0">
            {rightSide.map((i) => (
              <div
                className={`${styles.seatList} btn m-1 p-0 
            ${
              reserved.includes(i)
                ? "bg-black disabled"
                : selected.includes(i)
                ? `${styles.selected}`
                : styles.available
            }`}
                onClick={() => (reserved.includes(i) ? null : selectedSeat(i))}
                key={i}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Seat;
