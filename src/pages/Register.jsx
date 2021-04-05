import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './pages.scss';
import { connect }  from 'react-redux';
import { 
    register
} from './../store/actions';

const Register = (props) => {
    const [ inputValues, setInputValues ] = useState({
        inputName: '',
        inputSurname: '',
        inputPassword: '',
        inputConfirmPassword: '',
        inputEmail: '',
    });

    const [ inputsIsValid, setInputsIsValid ] = useState({
        inputPassword: null,
        inputEmail: null,
        inputName: null,
        inputSurname: null,
        inputConfirmPassword: null,
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
                inputName: (inputValues.inputName === '' ? 'field is required' : null),
                inputSurname: (inputValues.inputSurname === '' ? 'field is required' : null),
                inputConfirmPassword: (inputValues.inputConfirmPassword === '' ? 'field is required' : null),
            })
            return;
        }
        if(!errorExist && !inputValuesEmpty){
            let sendData = {
                email: inputValues.inputEmail,
                password: inputValues.inputPassword,
                confirmPassword: inputValues.inputConfirmPassword,
                name: inputValues.inputName,
                surname: inputValues.inputSurname, 
            }
            props.register(sendData);
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
        if((name === 'inputPassword' || name === 'inputConfirmPassword') && value.trim() !== '') {
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
        if(name === 'inputConfirmPassword' && value !== inputValues.inputPassword) {
            notiication = 'Password dosent match';
        }
        setInputsIsValid({
            ...inputsIsValid,
            [name]: notiication
        });
    }

    return (
        <Container className="signin">
            <Row className="signin-row mt-3">
                <Col lg={6} md={8} xs={12}>
                    <h1>Log in</h1>
                    <Form className="mt-3">
                        <Form.Group controlId="formBasicName">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputName}
                                name="inputName" 
                                type="text" 
                                placeholder="Your name" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputSurname}
                                name="inputSurname" 
                                type="text" 
                                placeholder="Your surname" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputSurname}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
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
                        <Form.Group controlId="formBasicPassword">
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
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputConfirmPassword}
                                name="inputConfirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputConfirmPassword}
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
    register
};


export default connect(null, mapDispatchToProps)(Register);