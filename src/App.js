import './App.css';
import Product from './Components/Product'

function App() {
  	return (
		<div className="App">
			<Product 
				name={'Orange'} 
				price={5}
				currency={'$'} 
				description={'Golden oranges from kuala lumpur'} 
			/>
		</div>
  	);
}

export default App;
