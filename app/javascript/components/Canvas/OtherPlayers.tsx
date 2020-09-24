import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Players } from "~/utils/canvas/use-multiplayer";

export const OtherPlayer: React.FC<{ x: number; y: number; z: number }> = (
  pos
) => {
  const ref = useRef<any>();
  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    pos
  );

  useEffect(() => {
    setPosition(pos);
  }, [pos]);

  useFrame(() => {
    const c = ref.current!;

    c.position.x = position.x;
    c.position.y = position.y;
    c.position.z = position.z;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[0.75]} />
      <meshToonMaterial attach="material" color={"#000"} />
    </mesh>
  );
};

export const OtherPlayers: React.FC<{ players: Players }> = ({ players }) => {
  return (
    <group>
      {Object.entries(players).map(([id, otherPlayerPosition]) => (
        <OtherPlayer key={id} {...otherPlayerPosition} />
      ))}
    </group>
  );
};
