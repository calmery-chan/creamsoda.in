import React, { useCallback, useState, useRef } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import styled from "styled-components";
import { Floor } from "../../../components/Canvas/Floor";
import { Helpers } from "../../../components/Canvas/Helpers";
import { Lights } from "../../../components/Canvas/Lights";
import { OtherPlayers } from "../../../components/Canvas/OtherPlayers";
import { Player } from "../../../components/Canvas/Player";
import { Works } from "../../../components/Canvas/Works";
import { useMultiplayer } from "../../../utils/canvas/use-multiplayer";
import { useWorks } from "../../../utils/use-works";
import { Vector2, Vector3 } from "three";
import { render } from "../../../utils/render";

const Plane = () => (
  <mesh>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshStandardMaterial attach="material" color="orange" />
  </mesh>
);

// Styles

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ControllerContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
`;

const ControllerDebug = styled.div`
  padding: 24px;
  background: rgba(0, 0, 0, 0.48);
  color: #fff;
  top: 0;
  right: 0;
  position: fixed;
`;

// Components

const Controller: React.FC<{
  startPosition: { x: number; y: number };
  position: { x: number; y: number };
  vecPosition: Vector3;
  isMove: boolean;
}> = ({ isMove, startPosition, position, vecPosition }) => {
  return (
    <ControllerContainer>
      <svg
        width={innerWidth}
        height={innerHeight}
        viewBox={`0 0 ${innerWidth} ${innerHeight}`}
      >
        {isMove && (
          <line
            x1={startPosition.x}
            y1={startPosition.y}
            x2={position.x}
            y2={position.y}
            stroke="#000"
            strokeWidth="8"
            strokeLinecap="round"
          />
        )}
      </svg>
      <ControllerDebug>
        <div>
          Start Position: X={startPosition.x} Y={startPosition.y}
        </div>
        <div>
          Position: X={position.x} Y={position.y}
        </div>
        <div>
          Destination: X={vecPosition.x.toFixed(2)} Y={vecPosition.y.toFixed(2)}{" "}
          Z={vecPosition.z.toFixed(2)}
        </div>
        <div>{isMove ? "Move" : "Stop"}</div>
      </ControllerDebug>
    </ControllerContainer>
  );
};

const Canvas: React.FC = () => {
  const { players, move } = useMultiplayer();
  const { works } = useWorks();
  const [isMove, setMove] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [vecPosition, setVecPosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [mouseVector2, setMouseVector2] = useState<Vector2>(new Vector2(0, 0));
  const [vector3, setVector3] = useState<Vector3>(new Vector3(0, 0, 0));

  // Events

  const handleOnMouseDown = useCallback((event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    setStartPosition({ x, y });
    setPosition({ x, y });
    setMove(true);
  }, []);

  const handleOnMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isMove) {
        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      const vector3 = new Vector3(startPosition.x - x, 0, startPosition.y - y);

      vector3.normalize();
      vector3.applyAxisAngle(new Vector3(0, 1, 0), 45 * (Math.PI / 180));

      setPosition({ x, y });
      setVecPosition(vector3);
    },
    [startPosition, isMove]
  );

  const handleOnMouseUp = useCallback(() => {
    setMove(false);
  }, []);

  // Render

  if (!works) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      // onMouseDown={handleOnMouseDown}
      // onMouseMove={handleOnMouseMove}
      // onMouseUp={handleOnMouseUp}
      onClick={(event) => {
        const x = event.clientX;
        const y = event.clientY;

        const vector2 = new Vector2(
          (x / innerWidth) * 2 - 1,
          -(y / innerHeight) * 2 + 1
        );
        setMouseVector2(vector2);
      }}
    >
      <ReactThreeFiber.Canvas>
        <Floor mouse={mouseVector2} onIntersect={setVector3} />
        <Helpers />
        <Lights />
        <OtherPlayers players={players} />
        <Player destination={vecPosition} position={vector3} onMove={move} />
        <Works works={works} />
      </ReactThreeFiber.Canvas>
      <Controller
        startPosition={startPosition}
        position={position}
        vecPosition={vecPosition}
        isMove={isMove}
      />
    </Container>
  );
};

render(Canvas);
