import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './pages.scss';

const Contact = () => {
    const [ inputValues, setInputValues ] = useState({
        inputName: '',
        inputEmail: '',
        inputText: ''
    });

    const [ inputsIsValid, setInputsIsValid ] = useState({
        inputName: null,
        inputEmail: null,
        inputText: null
    });

    const handleChange = ({target: {name, value}}) => {
        setInputValues({
            ...inputValues,
            [name]: value
        });
        validator(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errorArr = Object.values(inputsIsValid);
        const errorExist = !errorArr.every(el => el === null);//true when errors null
        const inputValuesArr = Object.values(inputValues);
        const inputValuesEmpty = inputValuesArr.every(el => el === '');//true when every inputs is empty 

        if(!errorExist && inputValuesEmpty){//if submit without input changes
            setInputsIsValid({
                inputName: 'field is required',
                inputEmail: 'field is required',
                inputText: 'field is required'
            })
            return;
        }
        if(!errorExist && !inputValuesEmpty){
            fetch('http://localhost:3001/form', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: inputValues.inputName, 
                    email: inputValues.inputEmail,
                    message: inputValues.inputText
                })
            })
            .then(async (response) => {
                const data = await response.json();
                if(response.status >=400 && response.status < 600){
                    if(data.error){
                        throw data.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                console.log(response);//
                setInputValues({
                    inputName: '',
                    inputEmail: '',
                    inputText: ''
                })

            })
            .catch((error)=>{
                console.log('catch error', error);
            });
        };
    };

    const validator = (name, value) => {
        if(name === 'inputEmail' && !(new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)).test(value)){
            // console.log('invalid email');
            setInputsIsValid({
                ...inputsIsValid,
                [name]: 'Please entet valid email'
            })
            return;
        }
        if(value.trim() === '') {//should optimization
            // console.log('invalid text or name');

            setInputsIsValid({
                ...inputsIsValid,
                [name]: 'is required'
            })
            return;
        }
        setInputsIsValid({
            ...inputsIsValid,
            [name]: null
        })
        
    }

    return (
        <Container className="contact">
            <Row>
                <Col xs={12}>
                    <h1>ContactUs PAGE</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputName}
                                name="inputName"
                                type="text"
                                placeholder="Enter your name"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputName}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputEmail}
                                name="inputEmail" 
                                type="email" 
                                placeholder="email" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputEmail}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Your message</Form.Label>
                            <Form.Control
                                className="contact-input"
                                name="inputText"
                                as="textarea"
                                rows={3}
                                type="text"
                                placeholder="your message"
                                value={inputValues.inputText}
                                onChange={handleChange}
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputText}
                            </Form.Text>    
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact;