import React from 'react';
import { Circles } from 'react-loader-spinner';

import "./spinner.scss";

function Spinner({ message }) {
  return (
    <div className="spinner">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>{message}</p>
    </div>
  );
}

export default Spinner;
