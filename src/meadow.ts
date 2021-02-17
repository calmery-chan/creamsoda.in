import { object } from "./utils/object";

const characters = [
  object("areas/meadow/ameri_swing", {
    position: { x: -21, y: 4.15, z: 13.1 },
    rotation: { y: 124 },
    scale: 0.25,
  }),
  object("areas/meadow/noneme_piano", {
    position: { x: -1.365, y: 3.99, z: 11.56 },
    rotation: { y: 257 },
    scale: 0.595,
  }),
  object("characters/hitugi", {
    position: { x: -22.65, y: 4.28, z: 1.72 },
    rotation: { y: 137 },
    scale: 0.5,
  }),
  object("characters/neminko", {
    position: { x: -22.65, y: 4.28, z: 3.72 },
    rotation: { y: 137 },
    scale: 0.5,
  }),
];

const illustrations = [
  object("areas/meadow/ameri_sunflower", {
    position: { x: -18.72, y: 5.355, z: 14.3 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/easter_egg", {
    position: { x: -10.05, y: 5.135, z: -0.143 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/koishi", {
    position: { x: 6.6, y: 5.23, z: 6 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/koishi_hydrangea", {
    position: { x: 13.85, y: 5.455, z: 10.8 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/koishi_sakura", {
    position: { x: -3.07, y: 5.24, z: 6 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/koishi_sunflower", {
    position: { x: -13.9, y: 5.335, z: 15.4 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/lee_white_clover", {
    position: { x: -7.65, y: 5.265, z: -0.55 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/noneme_dry", {
    position: { x: 5.2, y: 5.4, z: 14 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/noneme_sunflower", {
    position: { x: -4.2, y: 5.45, z: 15.35 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/rainy_season", {
    position: { x: 17.765, y: 5.3, z: 11 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/red_gerbera", {
    position: { x: 15.35, y: 5.275, z: 1 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/red_spider_lily", {
    position: { x: 19.575, y: 5.12, z: 0.65 },
    rotation: { x: 11 },
  }),
  object("areas/meadow/sakura", {
    position: { x: -7.525, y: 5.257, z: 5.9 },
    rotation: { x: 11 },
  }),
];

const objects = [
  object("areas/meadow/terrain"),
  object("areas/meadow/bushes"),
  object("areas/meadow/flowers"),
  object("areas/meadow/grasses"),
  object("areas/meadow/trees"),
  object("areas/meadow/waterlily"),
  object("areas/meadow/tulips"),
  object("areas/meadow/stones"),
  object("areas/meadow/sunflowers"),
  object("areas/meadow/stumps"),
  object("areas/meadow/piano"),
  object("areas/meadow/chair", {
    position: { x: -22.4, y: 4.35, z: 2.3 },
    rotation: { y: 140 },
    scale: 3.2,
  }),
];

console.log(
  JSON.stringify(
    {
      objects: [...characters, ...objects, ...illustrations],
    },
    undefined,
    2
  )
);
