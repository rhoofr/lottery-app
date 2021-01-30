import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import { formatDate } from '../shared/utils/date';
import { formatCurrency } from '../shared/utils/formatting';

import './DrawingResult.css';

const ballMatchedBodyTemplate = drawResult => {
  const matchedClassName = classNames({
    highlightBallMatched: drawResult.ballMatched
  });
  return <td className={matchedClassName}>{drawResult.ball}</td>;
};

const highlightWinner = drawResult => {
  const matchedClassName = classNames({
    highlightWinner: drawResult.currentWinnings > 0
  });
  return (
    <td className={matchedClassName}>
      {formatCurrency(drawResult.currentWinnings)}
    </td>
  );
};

const highlightNumberMatched = (drawResult, nbr) => {
  const matchedClassName = classNames({
    highlightNumbersMatched: drawResult.matchedNums.includes(nbr)
  });
  return <td className={matchedClassName}>{nbr}</td>;
};

function DrawingResult({ drawResult }) {
  // console.log(props);
  return (
    <React.Fragment>
      <tr key={uuidv4()}>
        <td>{drawResult.game === 'P' ? 'Powerball' : 'Mega Millions'}</td>
        {highlightNumberMatched(drawResult, drawResult.winningNums[0])}
        {highlightNumberMatched(drawResult, drawResult.winningNums[1])}
        {highlightNumberMatched(drawResult, drawResult.winningNums[2])}
        {highlightNumberMatched(drawResult, drawResult.winningNums[3])}
        {highlightNumberMatched(drawResult, drawResult.winningNums[4])}
        {ballMatchedBodyTemplate(drawResult)}
        <td>{formatDate(drawResult.drawDate)}</td>
        {highlightWinner(drawResult)}
      </tr>
    </React.Fragment>
  );
}

export default DrawingResult;
