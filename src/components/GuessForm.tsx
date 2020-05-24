import React, { useState, useEffect } from 'react';
import { Button, FormControl } from 'react-bootstrap';

import { IGameConfig, GuessSet } from '../util/GameplayUtil';

interface IGuessFormProps {
  gameConfig : IGameConfig,
  defaultValue : number,
  onSubmit : (guess: GuessSet) => void
}

export const GuessForm : React.FC<IGuessFormProps> = (props) => {
  const [currentGuess, setCurrentGuess] = useState<GuessSet>([]);

  // set default current guess based on number of slots needed to guess
  useEffect(() => {
    const initialGuess : Array<number> = [];
    for (let slotIndex = 0; slotIndex < props.gameConfig.numberOfSlots; slotIndex++) {
      initialGuess.push(props.defaultValue);
    }
    setCurrentGuess(initialGuess);
  }, [props.gameConfig.numberOfSlots, props.defaultValue]);

  return (
    <div className="guess-form">
      <div className="guess-form-left">
        { currentGuess.map((peg, pegIndex) => (
          <FormControl
            as="select"
            key={ pegIndex }
            value={ peg }
            onChange={ e => {
              const intVal = parseInt(e.target.value);
              if (intVal >= 0 && intVal < props.gameConfig.numberOfColors) {
                const newCurrentGuess = JSON.parse(JSON.stringify(currentGuess));
                newCurrentGuess[pegIndex] = intVal;
                setCurrentGuess(newCurrentGuess);
              }
            }}
          >
            { (() => {
                const result : Array<JSX.Element> = [];
                for (let i = 0; i < props.gameConfig.numberOfColors; i++) {
                  result.push(<option key={ i } value={ i }>{ i }</option>);
                }
                return result;
            })() }
          </FormControl>
        )) }
      </div>
      <div className="guess-form-right">
        <Button onClick={ () => props.onSubmit(currentGuess) }>Submit</Button>
      </div>
    </div>
  );
};
