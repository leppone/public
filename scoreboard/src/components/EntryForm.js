import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const EntryForm = ({
    // Params
    // {addScore} : event handler for adding score
    // {changeFormMode} : event handler for adding score
    addScore,
    changeFormMode
}) => {

    // --- States ---
    const [ newName, setNewName ] = useState('');
    const [ newScore, setNewScore ] = useState(0);


    // --- Event handlers ---
    const handleNameAdd = (event) => setNewName(event.target.value);
    const handleNumberAdd = (event) => setNewScore(event.target.value);

    const handleButtonClick = (event) => {
        addScore(event, newName, newScore);
        changeFormMode();
    };

    // --- Component content ---      
    return (
        <Form onSubmit={handleButtonClick}>
            <Form.Row>
                <Form.Group>
                    <Col>
                    <Button variant="primary" type="submit">Save</Button>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Col>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={handleNameAdd}
                    />
                    </Col>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Col>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Score"
                        value={newScore}
                        onChange={handleNumberAdd}
                    />
                    </Col>
                </Form.Group>
            </Form.Row>
        </Form>
    )
};

export default EntryForm;