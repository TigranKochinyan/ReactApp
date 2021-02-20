import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import './task.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteTask } from './../../../store/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { fromatingDate, cutText } from './../../../helpers/utils';

const Task = (props) => {
    const { task, checkTask, editTask, deleteTask, disabled, checked } = props;
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
                <Card.Title>
                    <Link to={`/task/${task._id}`}> {cutText(task.title, 20)} </Link>
                </Card.Title>
                {/* <span className={`TodoList-card-priority ${task.priority}` }>
                    {task.priority !== 'none' && task.priority  }
                </span> */}
                <Card.Text>
                    Description: {cutText(task.description)}
                </Card.Text>
                <Card.Text>
                    date: {fromatingDate(task.date)}
                </Card.Text>
                <Button
                    className="icon-in-button"
                    onClick={() => deleteTask(task._id)}
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
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    editTask: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteTask,
};

export default connect(null, mapDispatchToProps)(Task);