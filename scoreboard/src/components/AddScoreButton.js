import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import EntryForm from './EntryForm';

import scoreboardService from '../services/scoreboardService';


const AddScoreButton = ({
  // Params
  // {scores} : state for score container
  // {setScores} : setter for state
  // {handleInfoBox} : feedback for user
  scores, 
  setScores,
  handleInfoBox
}) => {

  // --- States ---
  const [ formMode, setFormMode ] = useState(false);


  // --- Event handlers ---
  const addScore = (event, newName, newScore) => {
    // Prevent default behavior of submit (page reload)
    event.preventDefault();

    scoreboardService
      .create({ name: newName, score: newScore })
      .then(response => {
        handleInfoBox(`Added ${newName}`);
        
        // Add new item to sorted scoreboard to correct place 
        let scoresClone = [...scores];
        let idxForSplice = scores.findIndex(
          (item) => Number(item.score) < Number(response.data.score));
        scoresClone.splice(
          idxForSplice < 0 ? scores.length : idxForSplice,
          0,
          response.data
        );
        setScores(scoresClone);
      });
  }


  // --- Component helper functions ---
  // Revert formMode boolean
  const changeFormMode = () => {
    setFormMode(!formMode);
  }


  // --- Component content ---  
  return (
    <>
        {!formMode ? 
            // If formMode not on, show add button
            <tr>
                <td colSpan="3">
                    <Button onClick={changeFormMode} variant="primary" size="lg" block>
                        Add new entry
                    </Button>
                </td>
            </tr>
            :
            // If formMode not on, show button
            <tr>
                <td colSpan="3">
                    <EntryForm 
                      addScore={addScore} 
                      changeFormMode={changeFormMode} />
                </td>
            </tr>
        }
    </>
  )
}

export default AddScoreButton;