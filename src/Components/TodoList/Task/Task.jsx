import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import './task.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteTask, updateTask } from './../../../store/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';

import { formatingDate, cutText } from './../../../helpers/utils';

const Task = (props) => {
    const { task, checkTask, editTask, deleteTask, disabled, checked, theme } = props;
    return (
        <Card className={`TodoList-card  ${checked ? 'checked' : ''} TodoList-card-${theme}`}>
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
                <Card.Text>
                    Description: {cutText(task.description)}
                </Card.Text>
                <Card.Text>
                    Status: {task.status}
                </Card.Text>
                <Card.Text>
                    Created at: {formatingDate(task.created_at)}
                </Card.Text>
                <Card.Text>
                    Date: {formatingDate(task.date)}
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
                {
                    task.status === 'active' ?
                        <Button
                            className="icon-in-button ml-1"
                            onClick={() => props.updateTask({
                                _id: task._id,
                                status: 'done'
                            })}
                            variant="outline-success"
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={ faCheck } />
                        </Button> :
                        <Button
                            className="icon-in-button ml-1"
                            onClick={() => props.updateTask({
                                _id: task._id,
                                status: 'active'
                            })}
                            variant="outline-secondary"
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={ faRedo } />
                        </Button>
                }
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

const mapStateToProps = (store) => {
    return {
        theme: store.theme
    }
}
const mapDispatchToProps = {
    deleteTask,
    updateTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);