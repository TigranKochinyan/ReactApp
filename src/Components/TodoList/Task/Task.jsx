import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import './task.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { fromatingDate } from './../../../helpers/utils';

const Task = (props) => {
    const { task, checkTask, editTask, removeTask, disabled, checked } = props;
    return (
        <Card className={`TodoList-card  ${checked ? 'checked' : ''}`}>
            <Card.Body>
                <Form.Check
                    type="checkbox"
                    id="autoSizingCheck"
                    className="TodoList-card-check"
                    checked={ checked }
                    onChange={() => { checkTask(task._id) }}
                />
                <Card.Title>{task.title}</Card.Title>
                {/* <span className={`TodoList-card-priority ${task.priority}` }>
                    {task.priority !== 'none' && task.priority  }
                </span> */}
                <Card.Text>
                    Description: {task.description}
                </Card.Text>
                <Card.Text>
                    date: {fromatingDate(task.date)}
                </Card.Text>
                <Button
                    className="icon-in-button"
                    onClick={() => removeTask(task._id)}
                    variant="outline-danger"
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={ faTrashAlt } />
                </Button>
                <Button
                    className="icon-in-button ml-1"
                    onClick={() => editTask(task._id)}
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
    task: PropTypes.object.isRequired,
    checkTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    editTask: PropTypes.func.isRequired
}

export default memo(Task);