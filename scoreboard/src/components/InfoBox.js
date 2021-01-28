import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const InfoBox = ({
    // Params
    // {infoMessage} : Msg for feedback
    infoMessage
}) => {
    // --- States ---
    const [ show, setShow] = useState(false)
    
    // --- Effect handler ---
    useEffect(() => {
        // Show message (if exists) after render
        if(infoMessage !== null) {
            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }, [infoMessage]);


    // --- Component content ---
    return (
        <Alert show={show} variant="info" size="sm" 
            style={{position: 'absolute', top: 0}}>
            {infoMessage}
        </Alert>
    );
}

export default InfoBox;