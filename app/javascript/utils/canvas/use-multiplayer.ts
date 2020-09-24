import { useState, useEffect, useCallback } from "react";
// import * as uuid from "uuid";

// Types

export type Players = {
  [id: string]: PlayerPosition;
};

type PlayerPosition = {
  x: number;
  y: number;
  z: number;
};

type PlayerPositionActions =
  | {
      type: "subscribed" | "unsubscribed";
      payload: { id: string };
    }
  | {
      type: "update";
      payload: {
        id: string;
      } & PlayerPosition;
    };

// Hooks

export const useMultiplayer = () => {
  // const [id] = useState(uuid.v4());
  // const [channel, setChannel] = useState<ActionCable.Channel>();
  const [players, setPlayers] = useState<Players>({});
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, z: 0 });

  // Events

  const subscribed = useCallback(
    (id: string) => {
      setPlayers({
        ...players,
        [id]: { x: 0, y: 0, z: 0 },
      });

      setPlayerPosition({ ...playerPosition });
    },
    [/* channel, */ players]
  );

  const update = useCallback(
    ({ id, x, y, z }: { id: string } & PlayerPosition) => {
      setPlayers({
        ...players,
        [id]: { x, y, z },
      });
    },
    [players]
  );

  const unsubscribed = useCallback(
    (id: string) => {
      delete players[id];

      setPlayers({ ...players });
    },
    [players]
  );

  const move = useCallback((x: number, y: number, z: number) => {
    // setPlayerPosition({ x, y, z });
  }, []);

  // Hooks

  // useEffect(() => {
  //   channel?.send({ id, ...playerPosition });
  // }, [playerPosition]);

  // useEffect(() => {
  //   (async () => {
  //     const actioncable = await import("actioncable");
  //     const consumer = actioncable.createConsumer(
  //       process.env.NODE_ENV === "production"
  //         ? "https://creamsoda.in/cable"
  //         : "http://localhost:5000/cable"
  //     );

  //     setChannel(
  //       consumer.subscriptions.create(
  //         {
  //           channel: "PlayerPositionChannel",
  //           id,
  //         },
  //         {
  //           received(data: PlayerPositionActions) {
  //             if (data.payload.id === id) {
  //               return;
  //             }

  //             switch (data.type) {
  //               case "subscribed":
  //                 subscribed(data.payload.id);
  //                 break;

  //               case "update":
  //                 update(data.payload);
  //                 break;

  //               case "unsubscribed":
  //                 unsubscribed(data.payload.id);
  //                 break;
  //             }
  //           },
  //         }
  //       )
  //     );
  //   })();
  // }, []);

  // Return

  return { move, players };
};
