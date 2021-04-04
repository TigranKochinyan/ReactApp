import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { send_from } from './../store/actions'; 

import './pages.scss';

const Contact = (props) => {
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
            props.send_from({
                name: inputValues.inputName, 
                email: inputValues.inputEmail,
                message: inputValues.inputText
            })
            .then(() => {
                setInputValues({
                    inputName: '',
                    inputEmail: '',
                    inputText: ''
                })
            });
        };
    };

    const validator = (name, value) => {
        if(name === 'inputEmail' && !(new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)).test(value)){
            setInputsIsValid({
                ...inputsIsValid,
                [name]: 'Please entet valid email'
            })
            return;
        }
        if(value.trim() === '') {//should optimization
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
    const { theme } = props;
    return (
        <Container className={`contact contact-${theme} mt-3`}>
            <Row>
                <Col xs={12} sm={{ span: 6, offset: 3 }}>
                    <h1>Contact Us</h1>
                    <Form className="mt-4">
                        <Form.Group controlId="formBasicEmail">
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

const mapStateToProps = (store) => {
    return {
        successMessage: store.successMessage, 
        errorMessage: store.errorMessage,
        theme: store.theme
    }
}

const mapDispatchToProps = {
    send_from
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);