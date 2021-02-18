import { object } from "./utils/object";

const characters: ReturnType<typeof object>[] = [
  object("characters/ameri", {
    position: { x: 15.05, y: 6.155, z: -2.56 },
    rotation: { x: 180, y: 18, z: 180 },
    scale: 0.25,
  }),
  object("characters/meido", {
    position: { x: 7.75, y: 5.79, z: -9.835 },
    rotation: { x: 180, y: 18, z: 180 },
    scale: 0.25,
  }),
  object("characters/hitugi", {
    position: { x: -2.2, y: 6.375, z: -11.25 },
    rotation: { y: 200 },
    scale: 0.5,
  }),
];

const illustrations: ReturnType<typeof object>[] = [
  object("areas/cloud/calmery_chan", {
    position: { x: 3.25, y: 6.85, z: 3.25 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/fried_egg", {
    position: { x: 12.6, y: 6.87, z: -9.9 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/koishi", {
    position: { x: -3.75, y: 6.85, z: -2 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/lee_mai", {
    position: { x: 6.95, y: 6.9, z: 2.85 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/maid", {
    position: { x: 1.7, y: 6.885, z: -9.75 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/maid_gas_mask", {
    position: { x: 9.2, y: 6.85, z: -9.35 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/maid_pancake", {
    position: { x: -10.65, y: 6.87, z: -9.68 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/main_visual", {
    position: { x: -10.175, y: 6.75, z: 19.8 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/moment", {
    position: { x: -0.615, y: 6.85, z: 3.13 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/neminko", {
    position: { x: -14, y: 6.925, z: 7.85 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/okusuri", {
    position: { x: -8.9, y: 6.85, z: -1.85 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/pancake", {
    position: { x: -15.28, y: 6.88, z: -8.82 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/satori_koishi", {
    position: { x: -0.37, y: 6.85, z: -2.12 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/strawberry_cake", {
    position: { x: -21.5, y: 6.85, z: -10.85 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/tabenemi", {
    position: { x: -17.95, y: 6.85, z: -9 },
    rotation: { x: 11 },
  }),
  object("areas/cloud/yumekawa", {
    position: { x: -17.95, y: 6.85, z: -9 },
    rotation: { x: 11 },
  }),
];

const objects = [
  object("areas/cloud/balloons"),
  object("areas/cloud/candy"),
  object("areas/cloud/clouds"),
  object("areas/cloud/neminko_sleeping", {
    position: { x: -11.25, y: 6.095, z: 6.5 },
    rotation: { y: 200 },
    scale: 0.5,
  }),
  object("areas/cloud/noneme_sitting", {
    position: { x: 12.15, y: 5.825, z: -2.385 },
    rotation: { y: 180 },
    scale: 0.25,
  }),
  object("areas/cloud/pc"),
  object("areas/cloud/post", { position: { x: 10.75, y: 5.5, z: -2.65 } }),
  object("areas/cloud/sweets"),
  object("areas/cloud/terrain"),
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
