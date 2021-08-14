import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const { searchField } = useSelector(
		(state) => state.searchRobots
	)

	const { robots, isPending, error } = useSelector(
		(state) => state.requestRobots
	)

	const onRequestRobots = () => {
		dispatch(requestRobots())
	}

	// This fetches users every time the app renders, that is; when the searchField changes.
	useEffect(() => {
		onRequestRobots()
	}, [])

	const onSearchChange = (event) => {
		dispatch(setSearchField(event.target.value))
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	});

	if (isPending) return (
			<h1>Loading...</h1>
		)
 	
  	if (!error) {
		return (
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
}

export default App;