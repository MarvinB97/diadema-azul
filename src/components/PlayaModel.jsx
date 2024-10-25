import { useGLTF } from '@react-three/drei';

function PlayaModel(props) {
  const { scene } = useGLTF('/models-3d/playa.glb');
  
  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models-3d/playa.glb');
export default PlayaModel;




