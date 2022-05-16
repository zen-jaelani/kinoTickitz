import React from "react";
import styles from "./movie.module.css";

function movie(props) {
  const { id, name, category, image } = props.data;
  return (
    <>
      <div
        className={
          props.type == "showing"
            ? `card ${styles.cardShowing} h-100 ${styles.card}`
            : `card ${styles.cardUpcoming} h-100 pb-0 ${styles.card}`
        }
      >
        <img
          src={
            image
              ? `${process.env.REACT_APP_IMG_URL}${image}`
              : `${process.env.REACT_APP_IMG_URL}default-movie.png`
          }
          alt=""
          className=""
        />
        <div className={props.type == "showing" ? `${styles.cardPopup}` : "d-block"}>
          <div className="card-body text-center text-wrap p-0 py-3">
            <h5 className={`card-title ${styles.cardTitle}`}>{name}</h5>
            <p className="card-text text-secondary">{category} </p>
          </div>
          {props.type == "admin" ? (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => props.setUpdate(props.data)}
              >
                Update
              </button>
              <button
                className="btn btn-primary btn-sm border border-danger mt-2 text-danger"
                onClick={() => props.handleDelete(id)}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-sm mt-3 mb-4"
              onClick={() => props.handleDetail(id)}
            >
              Details
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default movie;
