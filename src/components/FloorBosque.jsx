import { useGLTF } from '@react-three/drei';

function FloorBosque(props) {
  const { scene } = useGLTF('/models-3d/floor_bosque.glb');
  
  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  
  return <primitive object={scene} {...props} scale={[2.0, 2.0, 2.0]} position={[0, -10, 0]}/>;
}

useGLTF.preload('/models-3d/floor_bosque.glb');
export default FloorBosque;