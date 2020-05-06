import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Records from "./components/Records";


console.log(process.env.REACT_APP_RECORDS_API_URL);

ReactDOM.render(
  <React.StrictMode>
  <Records/>
  </React.StrictMode>,
  document.getElementById('root')
);
