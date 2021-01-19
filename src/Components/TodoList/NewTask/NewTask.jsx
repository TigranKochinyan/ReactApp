import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Button, InputGroup, Form } from 'react-bootstrap';

const NewTask = (props) => {
    const { validated, handleSubmit, inputTitle, handleInputChange, inputDesc, disabled } = props;
    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12" >
                            <Form.Label>Task title</Form.Label>
                            <Form.Control
                                id='inputTitle'
                                required
                                type="text"
                                placeholder="Title"
                                value={inputTitle}
                                onChange={handleInputChange}
                                disabled={disabled}
                            />
                            <Form.Control.Feedback type="invalid">
                                Task title should not be empty
                                    </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Description</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    id='inputDesc'
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Description"
                                    required
                                    value={inputDesc}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Description should not be empty
                                            </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Button disabled={disabled} type="submit">Save Task</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

NewTask.propTypes = {
    inputTitle: PropTypes.string.isRequired,
    inputDesc: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default NewTask;