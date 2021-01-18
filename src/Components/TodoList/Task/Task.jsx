import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';


class Task extends Component {
    render() {
        const { item, checkTask, removeTask, disabled} = this.props;
        return (
            <Card className="TodoList-card">
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
    }
}

export default Task;