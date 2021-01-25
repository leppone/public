import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import EntryRow from '../components/EntryRow'
import AddScoreButton from '../components/AddScoreButton'

import scoreboardService from '../services/scoreboardService'


const Scoreboard = () => {

  // --- States ---
  const [ scores, setScores] = useState([])


  // --- Effect handlers ---
  useEffect(() => {
    // Refresh boardEntries-list through API on render
    scoreboardService
      .getAll()
      .then(response => {
        setScores(response.data)
      })
  }, [])
  console.log('render', scores.length, 'scores')


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

            {scores.map((entry, idx) => (
              <EntryRow 
                key={idx}
                columns={[
                  idx+1, 
                  entry.name, 
                  entry.score
                ]}
              />
            ))}

            <AddScoreButton 
                scores={scores} 
                setScores={setScores}
            />

          </tbody>
      </Table>
    </header>
  );
}

export default Scoreboard;