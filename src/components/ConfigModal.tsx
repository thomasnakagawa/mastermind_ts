import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { IGameConfig } from '../util/GameplayUtil';

interface IConfigModalProps {
  show : boolean
  initialGameConfig : IGameConfig,
  onSubmit : (newGameConfig : IGameConfig) => void,
  onCancel: () => void
}

export const ConfigModal : React.FC<IConfigModalProps> = (props) => {
  const [colors, setColors] = useState<number>(props.initialGameConfig.numberOfColors);
  const [slots, setSlots] = useState<number>(props.initialGameConfig.numberOfSlots);

  function HandleSubmit() {
    props.onSubmit({ numberOfColors: colors, numberOfSlots: slots });
  }

  return (
    <Modal
      show={ props.show }
      onHide={ props.onCancel }
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Game settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formslots">
            <Form.Label>Number of slots</Form.Label>
            <Form.Control
              type="number"
              value={ slots }
              onChange={ e => setSlots(parseInt(e.target.value)) }
            />
          </Form.Group>
          <Form.Group controlId="formcolors">
            <Form.Label>Number of colors</Form.Label>
            <Form.Control
              type="number"
              value={ colors }
              onChange={ e => setColors(parseInt(e.target.value)) }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ HandleSubmit } >Apply and restart</Button> 
      </Modal.Footer>
    </Modal>
  );
}