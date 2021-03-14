const defaultState = { 
    taskList: [],
    task: null,
    sucsessSaveOrUpdateTask: false,
    sucsessDeleteSelected: false,
    loading: false,
    successMessage: null, 
    errorMessage: null
};


export default function reducer(state=defaultState, action){
    
    switch(action.type){
      case 'ERROR':{
        return {
          ...state,
          loading: false,
          errorMessage: action.message
        }
      }
      case 'PENDING':{
        return {
          ...state,
          loading: true,
          sucsessSaveOrUpdateTask: false,
          sucsessDeleteSelected: false,
          successMessage: null, 
          errorMessage: null
        };
      }
      case 'GET_TASKS':{
        return {
          ...state,
          loading: false,
          taskList: action.tasks
        };
      }
      case 'GET_TASK':{
        return {
          ...state,
          loading: false,
          task: action.task
        };
      }
      case 'ADD_TASK':{
        return {
          ...state,
          loading: false,
          taskList: [...state.taskList, action.task],
          sucsessSaveOrUpdateTask: true,
          successMessage: 'Task created succsessfully'
        };
      }
      case 'UPDATE_TASK':{
        let successMessage = 'Task edited succsessfully';
        successMessage = action.updatedTask.status === 'done' ?  'Task is done' : 'Task is active';
        const taskList = [...state.taskList];
        const updetedTaskIndex = taskList.findIndex((task) => action.updatedTask._id === task._id);
        taskList[updetedTaskIndex] =  {
          ...taskList[updetedTaskIndex],
          ...action.updatedTask
        };
        return {
          ...state,
          loading: false,
          task: action.updatedTask,
          taskList,
          sucsessSaveOrUpdateTask: true,
          successMessage

        };
      }
      case 'DELETE_TASK':{
        let taskList = state.taskList.filter(task => { return task._id !== action.id });
        return {
          ...state,
          loading: false,
          taskList,
          successMessage: 'Task deleted succsessfully'
        };
      }
      case 'DELETE_SELECTED':{
        let taskList = state.taskList.filter(task => !action.checkedTasks.has(task._id));
        return {
          ...state,
          loading: false,
          taskList,
          sucsessDeleteSelected: true,
          successMessage: 'Tasks deleted succsessfully'

        };
      }
      case 'SORT_LIST':{
        return {
          ...state,
          taskList: action.taskList
        };
      }
      default: return state;
    }
}