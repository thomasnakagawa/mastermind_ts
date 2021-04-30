import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { HintSet, GuessSet } from '../util/GameplayUtil';
import { HistoryRow } from './Gameplay';

interface IGameHistoryProps {
  gameHistory : Array<HistoryRow>,
  rows : number
}

export const GameHistory : React.FC<IGameHistoryProps> = (props) => {
  const rows : Array<HistoryRow> = [];
  props.gameHistory.forEach(entry => rows.push(entry));

  const emptyRowsToAdd = props.rows - rows.length;
  for (let emptyIndex = 0; emptyIndex < emptyRowsToAdd; emptyIndex++) {
    rows.push({ userGuess: [], hint: [] });
  }

  return (
    <div className="past-guesses">
      { rows.map((historyRow, historyIndex) => (
        <HistoryEntry
          key={ historyIndex }
          entryNumber={ historyIndex }
          hints={ historyRow.hint }
          pegs={ historyRow.userGuess }
        />
      )) }
    </div>
  );
};

interface IHistoryEntryProps {
  entryNumber: number,
  hints: HintSet,
  pegs: GuessSet
}

const HistoryEntry : React.FC<IHistoryEntryProps> = (guess) => {
  const spring = useSpring({opacity: 1, from: { opacity: 0 }});

  if (guess.pegs.length < 1 && guess.hints.length < 1) {
    return <div className="guess-empty"/>;
  }

  return (
    <animated.div style={spring} className="guess">
      <div className="pegs">
        { guess.pegs.map((peg, pegIndex) => (
          <div key={ pegIndex} className="history-icon peg">
            { peg }
          </div>
        ))}
      </div>
      <div className="hints">
        { guess.hints.map((hint, hintIndex) => (
          <OverlayTrigger
            key={hintIndex + '-' + guess.entryNumber}
            transition={false}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${hintIndex + '-' + guess.entryNumber}`}>
                { hint.description }
              </Tooltip>
            }
          >
            <div key={ hintIndex } className="history-icon hint">
              { hint.icon }
            </div>
          </OverlayTrigger>
        )) }
      </div>
    </animated.div>
  );
}