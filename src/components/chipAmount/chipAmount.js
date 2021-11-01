import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import StateContext from '../../StateContext';
import SumContext from '../../SumContext';
import './chipAmount.css';

const ChipAmount = ({ coorditat, denomination, colorText }) => {
	const { dispatch } = useContext(SumContext);
	const { state } = useContext(StateContext);

	const [displayChips, setDisplayChips] = useState(false);
	const [displaySumResult, setDisplaySumResult] = useState(false);
	const [amountToDispaly, setAmountToDispaly] = useState(null);
	const [disableThis, setDisable] = useState(false);
	const [freqency, setFreqency] = useState(() => Math.floor(Math.random() * 6));

	const showSumHandler = () => {
		setDisplaySumResult(!displaySumResult);
		if (displayChips) {
			// !disableThis &&
			// 	dispatch({
			// 		type: 'increment',
			// 		payload: amountToDispaly * denomination,
			// 	});
		}
		setDisable(!disableThis);
	};

	useEffect(() => {
		setFreqency(Math.floor(Math.random() * 6));

		if (freqency >= state.complexity) {
			setDisplayChips(true);

			const number = Math.floor(Math.random() * state.maxAmount) + 1;

			setAmountToDispaly(number);

			// console.log('amountToDispaly 2', amountToDispaly * denomination);

			dispatch({
				type: 'increment',
				payload: number * denomination,
			});
			dispatch({
				type: 'save-results',
				payload: number * denomination,
			});
		} else {
			setDisplayChips(false);
		}
	}, [state.maxAmount, state.reload]);

	return (
		displayChips &&
		!!amountToDispaly && (
			<div
				onClick={() => showSumHandler()}
				// onMouseEnter={() => setDisplaySumResult(true)}
				// onMouseLeave={() => setDisplaySumResult(false)}
				className='chip-style'
				style={{
					top: coorditat.x,
					left: coorditat.y,
					backgroundColor: disableThis
						? 'rgb(119, 120, 112)'
						: 'rgb(253, 255, 240)',
					color: disableThis ? 'white' : colorText,
				}}>
				{!displaySumResult ? amountToDispaly : amountToDispaly * denomination}
			</div>
		)
	);
};

export default ChipAmount;
