import React from 'react';

import { useEffect, useReducer, useState } from 'react';

import './App.css';
import ChipAmount from './components/chipAmount/chipAmount';
import LayoutComponent from './layout/LayoutComponent';
import StateContext from './StateContext';
import SumContext from './SumContext';
const allbets = [
	{ denomination: 35, coorditat: { x: 248, y: 128 } },
	{ denomination: 17, coorditat: { x: 170, y: 128 } },
	{ denomination: 17, coorditat: { x: 248, y: 68 } },
	{ denomination: 17, coorditat: { x: 248, y: 186 } },
	{ denomination: 17, coorditat: { x: 318, y: 128 } },
	{ denomination: 8, coorditat: { x: 318, y: 68 } },
	{ denomination: 8, coorditat: { x: 318, y: 186 } },
	{ denomination: 8, coorditat: { x: 170, y: 68 } },
	{ denomination: 8, coorditat: { x: 170, y: 186 } },
	{ denomination: 11, coorditat: { x: 30, y: 128 } },
	{ denomination: 5, coorditat: { x: 30, y: 68 } },
	{ denomination: 5, coorditat: { x: 30, y: 186 } },
];

const initialState = {
	count: 0,
	maxAmount: 3,
	set: 0,
	res: [],
	reload: false,
	complexity: 3,
	allbets: allbets,
};
function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return {
				...state,
				count: (state.count += action.payload),
				set: state.set + 1,
			};
		case 'reload':
			return {
				...state,
				count: 0,
				res: [],
				reload: !state.reload,
				set: 0,
				allbets: allbets,
			};
		case 'set-max-amount':
			return {
				...state,
				maxAmount: action.payload ? action.payload : initialState.maxAmount,
				count: 0,
				res: [],
				reload: !state.reload,
			};
		case 'save-results':
			return { ...state, res: [...state.res, action.payload] };
		case 'setComplexity':
			return { ...state, complexity: action.payload };
		case 'setFilter':
			console.log('action.payload', action.payload);
			return {
				...state,
				allbets: state.allbets.filter(
					(ell) => ell.denomination !== action.payload
				),
			};

		default:
			throw new Error();
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [maxAmount, setMAxAmount] = useState(3);

	const runOnBlur = (e) => {
		setMAxAmount(parseInt(e.target.value));
		e.target.placeholder = state.maxAmount;
		if (maxAmount !== state.maxAmount) {
			dispatch({ type: 'set-max-amount', payload: maxAmount });
		}
	};
	const [arrData, setArrData] = useState(state.allbets);

	useEffect(() => {
		setArrData(state.allbets);
	}, [state]);

	return (
		<SumContext.Provider value={{ dispatch }}>
			<StateContext.Provider value={{ state }}>
				<div className='App'>
					<div style={{}}>
						<label>
							Limit Chips:
							<input
								style={{
									maxWidth: '40px',
									textAlign: 'center',
									marginLeft: '10px',
									borderRadius: '15px',
									marginBottom: '10px',
								}}
								type='number'
								placeholder={state.maxAmount}
								onFocus={(e) => (e.target.placeholder = '')}
								onBlur={(e) => runOnBlur(e)}
								onChange={(e) => {
									runOnBlur(e);
								}}
							/>
						</label>
						<select
							style={{
								height: '25px',
								borderRadius: '10px 10px 0px 0px',
								color: 'blue',
								fontWeight: 800,
								outline: 'unset',
								backgroundColor: ' rgb(210, 219, 212)',
							}}
							onChange={(e) => {
								dispatch({
									type: 'setComplexity',
									payload: parseInt(e.target.value, 10),
								});
								dispatch({ type: 'reload' });
							}}>
							<option value='3'>normal</option>
							<option value='5'>easy</option>
							<option value='4'>medium</option>
							<option value='3'>normal</option>
							<option value='2'>hard</option>
							<option value='0'>all</option>
						</select>

						{/* 
						<label>
							split
							<input type='checkbox' onChange={(e) => handleChange(e, 17)} />
						</label>
						<label>
							care
							<input type='checkbox' onChange={(e) => handleChange(e, 8)} />
						</label>
						<input type='checkbox' onChange={() => filterBets(5)} />
						<input type='checkbox' onChange={() => filterBets(11)} /> */}
					</div>

					{/* <button
						style={{
							margin: '20px',
							padding: '5px 30px',
							border: '2px solid green',
							borderRadius: '20px',
							color: 'white',
							fontSize: '25px',
							backgroundColor: 'green',
						}}
						onClick={() =>
							dispatch({ type: 'set-max-amount', payload: maxAmount })
						}>
						set-max-amount
					</button> */}

					<LayoutComponent>
						{arrData.map((bet, ind) => {
							return (
								<ChipAmount
									key={ind}
									maxAmount={state.maxAmount}
									coorditat={bet.coorditat}
									denomination={bet.denomination}
									colorText='blue'
								/>
							);
						})}
					</LayoutComponent>
				</div>
			</StateContext.Provider>
		</SumContext.Provider>
	);
};

export default App;
