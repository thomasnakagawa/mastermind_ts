import React from 'react';
import { useSpring, animated } from 'react-spring';
import { HintSet, GuessSet } from '../util/GameplayUtil';
import { HistoryRow } from './Gameplay';

interface IGameHistoryProps {
  gameHistory : Array<HistoryRow>
}

export const GameHistory : React.FC<IGameHistoryProps> = (props) => {
  return (
    <div className="past-guesses">
      { props.gameHistory.map((historyRow, historyIndex) => (
        <HistoryEntry key={ historyIndex } hints={ historyRow.hint } pegs={ historyRow.userGuess }/>
      )) }
    </div>
  );
};

interface IHistoryEntryProps {
  hints: HintSet,
  pegs: GuessSet
}

const HistoryEntry : React.FC<IHistoryEntryProps> = (guess) => {
  const spring = useSpring({opacity: 1, from: { opacity: 0 }});
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
          <div key={ hintIndex } className="history-icon hint">
            { hint }
          </div>
        )) }
      </div>
    </animated.div>
  );
}