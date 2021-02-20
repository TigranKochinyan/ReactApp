const defaultState = { 
    taskList: [],
    sucsessSaveOrUpdateTask: false,
    sucsessDeleteSelected: false
};


export default function reducer(state=defaultState, action){
    
    switch(action.type){
      case 'GET_TASKS':{
        return {
          ...state,
          taskList: action.tasks
        };
      }
      case 'GET_TASK':{
        return {
          ...state,
          task: action.task
        };
      }
      case 'ADDING_TASK':{
        return {
          ...state,
          sucsessSaveOrUpdateTask: false
        };
      }
      case 'DELETING_SELECTED':{
        return {
          ...state,
          sucsessDeleteSelected: false
        };
      }
      case 'ADD_TASK':{
        return {
          ...state,
          taskList: [...state.taskList, action.task],
          sucsessSaveOrUpdateTask: true
        };
      }
      case 'UPDATE_TASK':{
        const taskList = [...state.taskList];
        taskList[action.index] = action.updatedTask;
        return {
          ...state,
          taskList,
          sucsessSaveOrUpdateTask: true
        };
      }
      case 'DELETE_TASK':{
        let taskList = state.taskList.filter(task => { return task._id !== action.id });
        return {
          ...state,
          taskList
        };
      }
      case 'DELETE_SELECTED':{
        let taskList = state.taskList.filter(task => !action.checkedTasks.has(task._id));
        return {
          ...state,
          taskList,
          sucsessDeleteSelected: true
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