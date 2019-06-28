<ViroBox
  position={[0, -5, 0]}
  height={.5}
  width={200}
  length={200}
  physicsBody={{
    type: "Static",
    friction: 1,
  }}
  opacity={.1}
/>
  <ViroBox
    position={[100, 45, 0]}
    height={100}
    width={.5}
    length={200}
    physicsBody={{
      type: "Static",
      friction: 1,
    }}
    opacity={.1}
  />
  <ViroBox
    position={[-100, 45, 0]}
    height={100}
    width={.5}
    length={200}
    physicsBody={{
      type: "Static",
      friction: 1,
    }}
    opacity={.1}
  />
  <ViroBox
    position={[0, 45, 100]}
    height={100}
    width={200}
    length={.5}
    physicsBody={{
      type: "Static",
      friction: 1,
    }}
    opacity={.1}
  />
  <ViroBox
    position={[0, 45, -100]}
    height={100}
    width={200}
    length={.5}
    physicsBody={{
      type: "Static",
      friction: 1,
    }}
    opacity={.1}
  />
  <ViroBox position={[-3, 0, -10]}
    height={7} width={2} length={2}
    materials={['grid']}
    physicsBody={{
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: true,
    }}
    ref="box0"
  />
  <ViroBox position={[10, 0, 8]}
    height={7} width={2} length={2}
    materials={['grid']}
    physicsBody={{
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: true,
    }}
    onCollision={this.boxCollide}
    ref="box1"
  />
  <ViroBox position={[-13, 0, 0]}
    height={7} width={2} length={2}
    materials={['grid']}
    physicsBody={{
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: true,
    }}
    onCollision={this.boxCollide}
    ref="box2"
  />

  <ViroBox position={[-20, 0, -18]}
    height={7} width={2} length={2}
    materials={['grid']}
    physicsBody={{
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: true,
    }}
    onCollision={this.boxCollide}
    ref="box2"
  />
  <ViroBox position={[3, 0, 18]}
    height={7} width={2} length={2}
    materials={['grid']}
    physicsBody={{
      type: 'Dynamic',
      friction: 1,
      mass: 1,
      useGravity: true,
    }}
    onCollision={this.boxCollide}
    ref="box2"
  />