import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

export const Camera: React.FC<{ x: number; y: number; z: number }> = ({
  x,
  y,
  z,
}) => {
  useFrame((state) => {
    state.camera.position.x = x - 2;
    state.camera.position.y = y + 4;
    state.camera.position.z = z - 2;
    state.camera.lookAt(new Vector3(x, y, z));
    state.camera.updateProjectionMatrix();
  });

  return null;
};
