import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const testGet = async () => {
      const response = (
        await axios.get(`${process.env.REACT_APP_API_ADDRESS}/test-get`)
      ).data;
      console.log(response);
    };
    testGet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
