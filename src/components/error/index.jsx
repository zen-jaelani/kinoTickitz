import React from "react";

function Error(props) {
  const { status, statusText, msg } = props.data ? props.data : [];
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <h1 className="me-3 pe-3 align-top border-right inline-block align-content-center border-end">
          {status ? status : "400"}
        </h1>
        <div className="inline-block align-middle">
          <h2 className="font-weight-normal lead">
            {statusText || msg ? statusText || msg : "Bad Request"}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Error;
