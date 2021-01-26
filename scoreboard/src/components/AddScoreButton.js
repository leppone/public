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

    const nameObject = { name: newName, score: newScore };
    scoreboardService
      .create(nameObject)
      .then(response => {
        handleInfoBox(`Added ${newName}`);
        setScores(scores.concat(response.data));
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