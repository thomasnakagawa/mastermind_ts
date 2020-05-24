import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import '../style/mastermind.css';
import { IGameConfig } from '../util/GameplayUtil';
import { Gameplay } from './Gameplay';
import { ConfigModal } from './ConfigModal';

const DefaultGameConfig : IGameConfig = { numberOfColors: 6, numberOfSlots: 4 };

export const Mastermind : React.FC = () => {
  const [gameConfig, setGameConfig] = useState<IGameConfig>(DefaultGameConfig);
  const [displayConfig, setDisplayConfig] = useState<boolean>(false);
  
  function handleConfigSubmit(newConfig : IGameConfig) : void {
    setGameConfig(newConfig);
    setDisplayConfig(false);
  }

  return (
    <div>
      <h1>Mastermind</h1>
      <Gameplay
        gameConfig={ gameConfig }
      />
      <ConfigModal
        show={ displayConfig }
        initialGameConfig={ gameConfig }
        onSubmit={ handleConfigSubmit }
        onCancel={ () => setDisplayConfig(false) }
      />
      <Button onClick={ () => setDisplayConfig(true) }>Settings</Button>
    </div>
  );
}
