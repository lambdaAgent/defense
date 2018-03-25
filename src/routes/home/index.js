import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import { Provider } from 'preact-redux';
import { createStore } from 'redux';

// component
import HomeContent from './HomeContent';

// reducers
import reducers from '../../reducers/worldReducer';

const store = createStore(reducers);

const Home = props => {
	const { } = props; 
	return (
		<div>
			hello
			<Provider store={store}>
				<HomeContent />
			</Provider>
		</div>
	);
}


export default Home;