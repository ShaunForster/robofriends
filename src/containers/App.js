import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {
	const [robots, setRobots] = useState([]);
	const [searchField, setSearchField] = useState('');

	// This fetches users every time the app renders, that is
	// when the searchField changes.
	useEffect(() => {
		fetch('https://jsonplaceholder.cypress.io/users')
		.then(response => response.json())
		.then(users => {setRobots(users)});
	}, []);

	const onSearchChange = (event) => {
		setSearchField(event.target.value)
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	});
	return !robots.length ?
		<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
}

export default App;