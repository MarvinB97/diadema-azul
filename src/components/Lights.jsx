const Lights = () =>{
    return (
        <>
            <ambientLight color={"#77FEF5"} intensity={0.7} />
            <directionalLight castShadow color={"#77FEF5"} position={[5, 10, 5]} intensity={10} />
        </>
        
    );
}

export default Lights;