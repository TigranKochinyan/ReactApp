import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import './task.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Task = (props) => {
    const { item, checkTask, removeTask, disabled, checked } = props;
    return (
        <Card className={`TodoList-card  ${checked ? 'checked' : ''}`}>
            <Card.Body>
                <Form.Check
                    type="checkbox"
                    id="autoSizingCheck"
                    className="TodoList-card-check"
                    checked={ checked }
                    onChange={() => { checkTask(item.id) }}
                />
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button
                    className="icon-in-button"
                    onClick={() => removeTask(item.id)}
                    variant="outline-danger"
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={ faTrashAlt } />
                </Button>
                <Button
                    className="icon-in-button ml-1"
                    onClick={() => removeTask(item.id)}
                    variant="outline-warning"
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={ faEdit } />
                </Button>
            </Card.Body>
        </Card>
    )
};

Task.propTypes = {
    item: PropTypes.object.isRequired,
    checkTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired
}

export default Task;