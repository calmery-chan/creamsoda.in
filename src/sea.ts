import { object } from "./utils/object";

const characters = [
  object("characters/hitugi", {
    position: { x: 2.485, y: 1.585, z: -19.2 },
    rotation: { y: -117 },
    scale: 0.5,
  }),
];

const illustrations = [
  object("areas/sea/aquarium", {
    position: { x: 3.5, y: 2.15, z: -5.95 },
    rotation: { x: 11 },
  }),
  object("areas/sea/cirno", {
    position: { x: -6.85, y: 2.1, z: -6.15 },
    rotation: { x: 11 },
  }),
  object("areas/sea/deep_sea", {
    position: { x: -3.525, y: 2.45, z: 2.37 },
    rotation: { x: 11, y: 2 },
  }),
  object("areas/sea/flowers", {
    position: { x: -3.5, y: 2.1, z: -6.3 },
    rotation: { x: 11 },
  }),
  object("areas/sea/gear", {
    position: { x: -8.175, y: 1.96, z: 1.55 },
    rotation: { x: 11 },
  }),
  object("areas/sea/goldfish", {
    position: { x: 1.9, y: 2.25, z: 0.9 },
    rotation: { x: 11 },
  }),
  object("areas/sea/hydrangea", {
    position: { x: -16.5, y: 2, z: -5.67 },
    rotation: { x: 11 },
  }),
  object("areas/sea/melon_soda", {
    position: { x: -26.5, y: 1.9, z: -6.05 },
    rotation: { x: 11, y: -1, z: 5 },
  }),
  object("areas/sea/submerged", {
    position: { x: -21, y: 3.055, z: -4.785 },
    rotation: { x: 11 },
  }),
];

const objects = [
  object("areas/sea/terrain"),
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
      objects: [...characters, ...illustrations, ...objects],
    },
    undefined,
    2
  )
);
