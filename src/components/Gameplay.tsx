import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { IGameConfig, GenerateRandomSolution, CalculateHintsForGuess, HintSet, GuessSet } from '../util/GameplayUtil';
import { GuessForm } from './GuessForm';
import { GameHistory } from './GameHistory';

interface IGameplayProps {
  gameConfig: IGameConfig
}

export type HistoryRow = { userGuess: GuessSet, hint: HintSet };

export const Gameplay : React.FC<IGameplayProps> = (props) => {
  const [gameHistory, setGameHistory] = useState<Array<HistoryRow>>([]);
  const [solution, setSolution] = useState<GuessSet>([]);

  // restart game when game config changes
  useEffect(() => {
    setGameHistory([]);
    setSolution(GenerateRandomSolution(props.gameConfig.numberOfSlots, props.gameConfig.numberOfColors));
  }, [props.gameConfig]);

  return (
    <div className="gameplay" style={{ width: props.gameConfig.numberOfSlots * 100 + "px"}}>
      <GameHistory
        gameHistory={ gameHistory }
        rows={ 12 }
      />
      <GuessForm
        gameConfig={ props.gameConfig }
        defaultValue={ 0 }
        onSubmit={ newGuess => {
          const newHistoryEntry : HistoryRow = {
            userGuess: newGuess,
            hint: CalculateHintsForGuess(solution, newGuess)
          };
          setGameHistory([...gameHistory, newHistoryEntry]);
        } }
      />
      <Button variant="secondary" onClick={ () => {
        alert(JSON.stringify(solution));
      }}>Show solution</Button>
    </div>
  );
}

