import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './pages.scss';
import { connect } from 'react-redux';
import { login } from './../store/actions'

const Login = (props) => {
    const [ inputValues, setInputValues ] = useState({
        inputPassword: '',
        inputEmail: ''
    });

    const [ inputsIsValid, setInputsIsValid ] = useState({
        inputPassword: null,
        inputEmail: null
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
        const inputValuesEmpty = inputValuesArr.some(el => el === '');//true when some inputs is empty 

        if(!errorExist && inputValuesEmpty){//if submit without input changes
            setInputsIsValid({
                inputPassword: (inputValues.inputPassword === '' ? 'field is required' : null),
                inputEmail: (inputValues.inputEmail === '' ? 'field is required' : null),
            })
            return;
        }
        if(!errorExist && !inputValuesEmpty){
            console.log(inputValues);//fetch data to server
            props.login({
                email: inputValues.inputEmail,
                password: inputValues.inputPassword
            })
        };
    };

    const validator = (name, value) => {
        let notiication = null;
        if(value.trim() === '') {
            notiication = 'field is required';
        }
        if(name === 'inputEmail' && !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)){
            notiication = 'Please entet valid email';
        }
        if(name === 'inputPassword' && value.trim() !== '') {
            if(!(/(?=.*[a-z])/).test(value)){
                notiication = 'password should contain at least one lowercase letter';
            };
            if(!(/(?=.*[A-Z])/).test(value)){
                notiication = 'password should contain at least one uppercase letter';
            };
            if(value.length < 8){
                notiication = 'password should more then 8 charackters';
            };
        }
        setInputsIsValid({
            ...inputsIsValid,
            [name]: notiication
        });
    }

    return (
        <Container className="signin">
            <Row className="signin-row">
                <Col lg={6} md={8} xs={12}>
                    <h1>Log in</h1>
                    <Form>
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputPassword}
                                name="inputPassword"
                                type="password"
                                placeholder="Enter your password"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputPassword}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Sign in
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};



const mapDispatchToProps = {
    login
};


export default connect(null, mapDispatchToProps)(Login);