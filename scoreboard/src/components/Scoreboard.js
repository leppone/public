import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table';
import EntryRow from '../components/EntryRow';
import AddScoreButton from '../components/AddScoreButton';

import scoreboardService from '../services/scoreboardService';
import PagingBar from './PagingBar';


const Scoreboard = ({
    // Params
    // {handleInfoBox} : feedback for user
    handleInfoBox
}) => {

  // --- States ---
  const [ loading, setLoading ] = useState(true);
  const [ scores, setScores ] = useState([]);
  
  // Pagination related states
  const [ boardFirstIndex, setBoardFirstIndex] = useState(0);
  // const [ itemsPerBoard, setItemsPerBoard] = useState(5); // TODO: changeable?
  const itemsPerBoard = 5;

  
  // Get server data to scoreboard
  const updateScores = () => {
    // Update & show load spinner
    setLoading(true);
    scoreboardService.getAll()
      .then(res => {
        if( res.status === 200 ) {
          setScores(res.data);
        }
        setLoading(false);
      })
  }

  // --- Effect handler ---
  useEffect(() => {
    try {
      // Initiate scores on start
      if( scores.length === 0 ) {
        updateScores();
      }

      // Polling loop
      const interval = setInterval(() => {
        scoreboardService.getSize()
          .then(res => {

            // Update in background if server has updated 
            if( res.data > scores.length ) {
              updateScores();
              handleInfoBox("Scores updated from server!")
            }
            
          })
      }, 3000);
      return () => clearInterval(interval);
    }
    catch(error){
      handleInfoBox("Unable to receive data from server");
    }
  }, [scores, handleInfoBox]);

  console.log('render', scores.length, 'scores');
  

  // --- Component content ---  
  return (
    
    <header className="App-header">

      <div className={loading ? "show" : "hide"}>
        <Spinner animation="border" role="status" variant="light" >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>

      <Table striped bordered hover variant="dark">
          <thead>

            <EntryRow 
              columns={[
                "#", 
                "Name", 
                "Score"
              ]}/>

          </thead>
          <tbody>

            {scores
              .slice(boardFirstIndex, boardFirstIndex + itemsPerBoard)
              .map((entry, idx) => (
              <EntryRow 
                key={idx}
                columns={[
                  idx + boardFirstIndex + 1,
                  entry.name, 
                  entry.score
                ]}
              />
            ))}

            <AddScoreButton 
                scores={scores}
                setScores={setScores}
                handleInfoBox={handleInfoBox}
                setLoading={setLoading}
            />

          </tbody>
      </Table>

      <PagingBar 
        scores={scores}
        itemsPerPage={itemsPerBoard}
        setFirstIndex={setBoardFirstIndex} />

    </header>
  );
}

export default Scoreboard;