import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Counter from './demo/Counter';

function reducer(state= { count: 0 }, action) {

	switch (action.type) {
		case 'COUNT_PLUS':
			return {
				...state,
				count: state.count+1
			}
		case 'COUNT_MINUS':
			return {
				...state,
				count: state.count-1
			}
		default:
			return state;
	};

};

const store = createStore(reducer);

ReactDOM.render(
	<React.StrictMode>
		{/* <App />
     */}
		<Provider store={store}>
			<Counter />
		</Provider>

	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
