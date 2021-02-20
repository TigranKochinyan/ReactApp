import request from '../helpers/request'

export const getTasks = () => {
    return (dispatch) => {
        request('http://localhost:3001/task')
        .then((tasks)=>{
            dispatch({type: 'GET_TASKS', tasks: tasks});
        });
    }
};

export const getTask = (id) => {// not used
    return (dispatch) => {
        request(`http://localhost:3001/task/${id}`)
        .then((task)=>{
            dispatch({type: 'GET_TASK', task: task});
        });
    }
};

export const saveTask = (task) => {
    return (dispatch) => {
        dispatch({type: 'ADDING_TASK'});

        request('http://localhost:3001/task', 'POST', task)
        .then((task)=>{
            dispatch({type: 'ADD_TASK', task: task});
        });
    }
};
export const updateTask = (updatedTask, index) => {
    return (dispatch) => {
        dispatch({type: 'ADDING_TASK'});

        request(`http://localhost:3001/task/${updatedTask._id}`, 'PUT', updatedTask)
        .then((task)=>{
            dispatch({type: 'UPDATE_TASK', updatedTask, index});
        });
    }
};
export const deleteTask = (id) => {
    return (dispatch) => {
        request(`http://localhost:3001/task/${id}`, 'DELETE')
        .then((res)=>{
            dispatch({type: 'DELETE_TASK', id});
        });
    }
};
export const deleteSelected = (requestBody, checkedTasks) => {
    return (dispatch) => {
        dispatch({type: 'DELETING_SELECTED'});

        request(`http://localhost:3001/task`, 'PATCH', requestBody)
        .then((res)=>{
            dispatch({type: 'DELETE_SELECTED', checkedTasks});
        })
    }
};
export const sortTasks = (taskList) => {
    return (dispatch) => {
        dispatch({type: 'SORT_LIST', taskList});
    }
};