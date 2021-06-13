import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './header.png';
import { Skeleton } from '@material-ui/lab';
import Scrabble from "./components/scrabble"

function App() {
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        async function checkAPIRoute() {
            try {
                const host = process.env.REACT_APP_HOST || "http://localhost:5000"
                const response = await fetch(
                    `${host}/api`
                )
                if (response.status === 200) {
                    setLoading(false)
                }
            } catch (err) {
                setLoading(true)
            }
        }
        checkAPIRoute()
    }, [loading])

  return (
    <div className="App">
      {loading && <Skeleton />}
      <img src={logo} className="App-logo" alt="logo" />
      <Scrabble/>
    </div>
  );
}

export default App;
