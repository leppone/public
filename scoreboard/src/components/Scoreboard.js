import React, { useState, useEffect } from 'react';
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
  const [ scores, setScores] = useState([]);
  
  // Pagination related states
  const [ boardFirstIndex, setBoardFirstIndex] = useState(0);
  const [ itemsPerBoard, setItemsPerBoard] = useState(5); // TODO: changeable?

  // --- Effect handlers ---
  useEffect(() => {
    // Refresh boardEntries-list through API on render
    scoreboardService
      .getAll()
      .then(response => {
        setScores(response.data);
      })
  }, []);
  console.log('render', scores.length, 'scores');
  

  // --- Component content ---  
  return (

    <header className="App-header">
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