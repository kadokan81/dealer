import React, { useContext, useEffect, useRef, useState } from 'react';
import StateContext from '../../../StateContext';
import SumContext from '../../../SumContext';

const InputComponent = ({ toMultipValue = 1 }) => {
	const [gessingNumber, setGessingNumber] = useState('');
	const [totalSum, settotalSum] = useState(0);
	const { state } = useContext(StateContext);
	const { dispatch } = useContext(SumContext);
	const localRefProps = useRef();
	useEffect(() => {
		// setGessingNumber('');
		// setByfiveResult('');
		// setBytwentyfiveResult('');
		localRefProps.current.style.border = '5px solid gray';
		// byFiveRef.current.style.border = '5px solid gray';
		// byTwentyFiveRef.current.style.border = '5px solid gray';
		// console.log('LayoutComponent', state);
		const sumOfAll = state.res.reduce((acc, ell) => {
			if (Number.isNaN(ell)) {
				return acc + 0;
			} else {
				return ell + acc;
			}
		}, 0);
		console.log(sumOfAll);
		settotalSum(sumOfAll);
	}, [state]);

	// const [byfiveResult, setByfiveResult] = useState(0);
	// const [bytventyfiveResult, setBytwentyfiveResult] = useState(false);

	function onBlureHAndler(e, placeholder, num = 1, res) {
		console.log(res);
		e.target.placeholder = placeholder;
		e.target.style.border =
			parseInt(res, 10) === totalSum * num
				? '5px solid green'
				: '5px solid red';
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				maxWidth: '33%',
			}}>
			<label>Result sum</label>

			<input
				ref={localRefProps}
				value={gessingNumber}
				type='number'
				style={{
					outline: 'none',
					borderRadius: '500px',
					fontSize: '25px',
					border: '15px solid gray',

					padding: '10px 30px',
					height: '40px',
					width: '150px',
					marginLeft: '25px',
				}}
				placeholder='You result'
				onFocus={(e) => (e.target.placeholder = '')}
				onBlur={(e) =>
					onBlureHAndler(e, 'You result ???', toMultipValue, gessingNumber)
				}
				onChange={(e) => setGessingNumber(e.target.value)}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						onBlureHAndler(e, 'You result ???', 1, gessingNumber);
					}
				}}
			/>
		</div>
	);
};

export default InputComponent;
