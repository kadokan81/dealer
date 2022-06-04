import React, { useRef } from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import StateContext from '../StateContext';
import SumContext from '../SumContext';
import './LayoutComponent.css';

const LayoutComponent = ({ children }) => {
	const [totalSum, settotalSum] = useState(0);
	const { state } = useContext(StateContext);
	const { dispatch } = useContext(SumContext);

	const [chipvalue, serChipValue] = useState(2);
	useEffect(() => {
		console.log('state', state);
		setGessingNumber('');
		setByfiveResult('');
		setBytwentyfiveResult('');
		sumRef.current.style.border = '5px solid gray';
		byFiveRef.current.style.border = '5px solid gray';
		byTwentyFiveRef.current.style.border = '5px solid gray';
		// console.log('LayoutComponent', state);
		const sumOfAll = state.res.reduce((acc, ell) => {
			if (Number.isNaN(ell)) {
				return acc + 0;
			} else {
				return ell + acc;
			}
		}, 0);
		settotalSum(sumOfAll);
		console.log('totalSum', sumOfAll);
	}, [state, totalSum]);

	const [gessingNumber, setGessingNumber] = useState('');

	const [byfiveResult, setByfiveResult] = useState(0);
	const [bytventyfiveResult, setBytwentyfiveResult] = useState(false);

	function onBlureHAndler(e, placeholder, num = 1, res) {
		e.target.placeholder = placeholder;
		e.target.style.border =
			parseInt(res, 10) === totalSum * num
				? '5px solid green'
				: '5px solid red';
	}

	const sumRef = useRef();
	const byFiveRef = useRef();
	const byTwentyFiveRef = useRef();
	const checkIfAllCorrect = () => {
		return (
			parseInt(gessingNumber, 10) === totalSum &&
			parseInt(byfiveResult, 10) === totalSum * 5 &&
			parseInt(bytventyfiveResult, 10) === totalSum * chipvalue
		);
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<div className='main-layout'>{children}</div>
			<div
				style={{
					width: '100%',
					height: '45px',
					display: 'flex',
					alignContent: 'center',
					justifyContent: 'center',
					marginTop: '10px',
				}}>
				{checkIfAllCorrect() && (
					<button
						className='new_game'
						style={{
							padding: '3px 20px',
							border: '2px solid green',
							borderRadius: '20px',
							color: 'white',
							fontSize: '20px',
						}}
						onClick={() => dispatch({ type: 'reload' })}>
						All correct new game
					</button>
				)}
			</div>

			<div className='inputs-Line'>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<label>Result sum</label>

					<input
						ref={sumRef}
						value={gessingNumber}
						type='number'
						style={{
							outline: 'none',
							borderRadius: '500px',
							fontSize: '20px',
							border: '5px solid gray',
							padding: '3px 10px',
							width: '150px',
							marginLeft: '25px',
						}}
						placeholder='You result'
						onFocus={(e) => (e.target.placeholder = '')}
						onBlur={(e) => onBlureHAndler(e, 'You result', 1, gessingNumber)}
						onChange={(e) => setGessingNumber(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								onBlureHAndler(e, 'You result', 1, gessingNumber);
							}
						}}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<label>Result * 5</label>
					<input
						ref={byFiveRef}
						type='number'
						style={{
							outline: 'none',
							borderRadius: '500px',
							fontSize: '20px',
							border: '5px solid gray',
							padding: '3px 10px',
							width: '150px',
							marginLeft: '25px',
						}}
						value={byfiveResult}
						placeholder='by 5 $'
						onFocus={(e) => (e.target.placeholder = '')}
						onBlur={(e) => onBlureHAndler(e, 'by 5 $ ???', 5, byfiveResult)}
						onChange={(e) => setByfiveResult(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								onBlureHAndler(e, 'by 5 $ ???', 5, byfiveResult);
							}
						}}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<label>
						Result *
						<select
							onChange={(e) => {
								serChipValue(e.target.value);
							}}>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={25}>25</option>
						</select>
					</label>
					<input
						ref={byTwentyFiveRef}
						type='number'
						style={{
							outline: 'none',
							borderRadius: '500px',
							fontSize: '20px',
							border: '5px solid gray',
							padding: '3px 10px',
							width: '150px',
							marginLeft: '25px',
						}}
						placeholder={`by $ ${chipvalue}`}
						value={bytventyfiveResult}
						onFocus={(e) => (e.target.placeholder = '')}
						onBlur={(e) =>
							onBlureHAndler(
								e,
								`by $ ${chipvalue}`,
								chipvalue,
								bytventyfiveResult
							)
						}
						onChange={(e) => setBytwentyfiveResult(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								onBlureHAndler(e, 'by 5 $ ???', chipvalue, bytventyfiveResult);
								checkIfAllCorrect();
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default LayoutComponent;
