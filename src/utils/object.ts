const defaultTransform = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

const isNumber = (maybeNumber: unknown): maybeNumber is number =>
  typeof maybeNumber === "number";

export const object = (
  filePath: string,
  transform?: {
    position?:
      | {
          x?: number;
          y?: number;
          z?: number;
        }
      | number;
    rotation?:
      | {
          x?: number;
          y?: number;
          z?: number;
        }
      | number;
    scale?:
      | {
          x?: number;
          y?: number;
          z?: number;
        }
      | number;
  }
) => {
  return {
    transform: !transform
      ? defaultTransform
      : {
          position: isNumber(transform.position)
            ? {
                x: transform.position,
                y: transform.position,
                z: transform.position,
              }
            : {
                x: transform.position?.x || defaultTransform.position.x,
                y: transform.position?.y || defaultTransform.position.y,
                z: (transform.position?.z || defaultTransform.position.z) * -1,
              },
          rotation: isNumber(transform.rotation)
            ? {
                x: transform.rotation,
                y: transform.rotation,
                z: transform.rotation,
              }
            : {
                x: (transform.rotation?.x || defaultTransform.rotation.x) * -1,
                y: (transform.rotation?.y || defaultTransform.rotation.y) * -1,
                z: transform.rotation?.z || defaultTransform.rotation.z,
              },
          scale: isNumber(transform.scale)
            ? { x: transform.scale, y: transform.scale, z: transform.scale }
            : {
                x: transform.scale?.x || defaultTransform.scale.x,
                y: transform.scale?.y || defaultTransform.scale.y,
                z: transform.scale?.z || defaultTransform.scale.z,
              },
        },
    url:
      process.env.NODE_ENV === "production"
        ? `https://assets.metaneno.art/objects/${filePath}.glb`
        : `http://localhost:8000/objects/${filePath}.glb`,
  };
};
