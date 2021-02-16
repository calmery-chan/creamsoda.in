import { object } from "./utils/object";

const illustrations = [
  object("areas/sea/aquarium", { position: { x: 1.5, y: 2, z: 4.35 } }),
  object("areas/sea/cirno", { position: { x: -0.8, y: 5.1, z: -7.5 } }),
  object("areas/sea/deep_sea"),
  object("areas/sea/flowers", { position: { x: 1.8, y: 2.1, z: -3.25 } }),
  object("areas/sea/gear", { position: { x: -0.85, y: 5.05, z: -7.5 } }),
  object("areas/sea/goldfish", { position: { x: -0.8, y: 5.05, z: -7.5 } }),
  object("areas/sea/hydrangea", { position: { x: 1.2, y: 2, z: -16.5 } }),
  object("areas/sea/melon_soda", { position: { x: 1.2, y: 1.75, z: -25 } }),
  object("areas/sea/submerged", { position: { x: 1, y: 1.95, z: -20.25 } }),
];

const objects = [
  object("areas/sea/beams"),
  object("areas/sea/bottles"),
  object("areas/sea/cages"),
  object("areas/sea/columns"),
  object("areas/sea/crystals"),
  object("areas/sea/cups"),
  object("areas/sea/grasses"),
  object("areas/sea/pillars"),
  object("areas/sea/ruins"),
  object("areas/sea/stones"),
  object("areas/sea/tables"),
  object("areas/sea/walls"),
];

console.log(
  JSON.stringify(
    {
      objects: [...illustrations, ...objects],
    },
    undefined,
    2
  )
);
