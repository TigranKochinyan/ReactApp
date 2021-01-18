import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';

const Task = (props) => {
    const { item, checkTask, removeTask, disabled, extraClass } = props;
    return (
        <Card className={`TodoList-card  ${extraClass}`}>
            <Card.Body>
                <Form.Check
                    type="checkbox"
                    id="autoSizingCheck"
                    className="TodoList-card-check"
                    onClick={(event) => { checkTask(item.id) }}
                />
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button
                    onClick={() => removeTask(item.id)}
                    variant="outline-danger"
                    disabled={disabled}
                >Delete
                </Button>
            </Card.Body>
        </Card>
    )
};


Task.propTypes = {
    item: PropTypes.object.isRequired,
    checkTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default Task;