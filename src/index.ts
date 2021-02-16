import { object } from "./utils/object";

const characters = [
  object("area/cloud/calmery-chan.glb", {
    position: {
      x: 12.55,
      y: 6.15,
      z: 15.05,
    },
    rotation: {
      y: 108,
    },
    scale: 0.25,
  }),
];

const illustrations = [
  object("area/cloud/calmery_chan.glb", {
    position: { x: 6.75, y: 6.85, z: 3.25 },
  }),
  object("area/cloud/fried_egg.glb", {
    position: { x: 11.85, y: 6.85, z: -8.9 },
  }),
  object("area/cloud/koishi.glb", { position: { x: 12, y: 6.85, z: -3.75 } }),
  object("area/cloud/lee_mai.glb", { position: { x: 2.2, y: 3.15, z: 9 } }),
  object("area/cloud/maid.glb", { position: { x: 19.75, y: 6.85, z: 1.7 } }),
  object("area/cloud/maid_gas_mask.glb", {
    position: { x: 11.85, y: 6.85, z: -8.9 },
  }),
  object("area/cloud/maid_pancake.glb", {
    position: { x: 11.85, y: 6.85, z: -8.9 },
  }),
  object("area/cloud/main_visual.glb", {
    position: { x: 11.85, y: 6.85, z: -8.9 },
  }),
  object("area/cloud/moment.glb", { position: { x: 11.85, y: 6.85, z: -8.9 } }),
  object("area/cloud/neminko.glb", { position: { x: 2.15, y: 6.9, z: -14 } }),
  object("area/cloud/okusuri.glb", {
    position: { x: 11.85, y: 6.85, z: -8.9 },
  }),
  object("area/cloud/pancake.glb", { position: { x: 1.9, y: 7, z: -15.45 } }),
  object("area/cloud/satori_koishi.glb", {
    position: { x: 6.8, y: 6.85, z: 3.25 },
  }),
  object("area/cloud/strawberry_cake.glb", {
    position: { x: 20.85, y: 6.85, z: -21.5 },
  }),
  object("area/cloud/tabenemi.glb", { position: { x: 6.8, y: 6.85, z: 3.25 } }),
  object("area/cloud/yumekawa.glb", {
    position: { x: 1.95, y: 6.45, z: -18.8 },
  }),
];

const objects = [
  object("area/cloud/balloons.glb"),
  object("area/cloud/bed.glb", { position: { x: -0.85, y: 4.75, z: -8.35 } }),
  object("area/cloud/candy.glb"),
  object("area/cloud/clouds.glb"),
  object("area/cloud/pc.glb", { position: { x: 12.25, y: 6.1, z: -7 } }),
  object("area/cloud/sweets.glb"),
  object("area/cloud/post.glb", { position: { x: 12.65, y: 6.5, z: 10.75 } }),
];

const cloud = {
  directionalLight: "#FFDACE",
  objects: [...characters, ...illustrations, ...objects],
};

console.log(JSON.stringify(cloud, undefined, 2));
