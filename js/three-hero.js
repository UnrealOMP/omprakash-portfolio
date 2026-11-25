/**
 * OM PRAKASH GADGE — INTERACTIVE 3D HERO SCENE (Three.js)
 * Inspired by Reference Image 1:
 * Floating matte-graphite geometric cubes & cylinders illuminated by a warm
 * emissive glowing sphere light source with real-time shadows and cursor parallax.
 */

(function initHeroThreeScene() {
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scene, Camera & Renderer Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0e14, 0.042);

  const camera = new THREE.PerspectiveCamera(
    38,
     heroSection.clientWidth / heroSection.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.4, 11.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  // 2. Main Sculpture Group (Offset to right on desktop so typography on left is unobstructed)
  const clusterGroup = new THREE.Group();
  scene.add(clusterGroup);

  function updateClusterLayout() {
    const width = heroSection.clientWidth;
    if (width > 1100) {
      clusterGroup.position.set(2.55, 0.05, 0);
      clusterGroup.scale.setScalar(1.02);
    } else if (width > 768) {
      clusterGroup.position.set(1.3, -0.15, -0.8);
      clusterGroup.scale.setScalar(0.88);
    } else {
      clusterGroup.position.set(0.2, -0.3, -1.8);
      clusterGroup.scale.setScalar(0.72);
    }
  }
  updateClusterLayout();

  // 3. Materials (Matte Charcoal/Graphite with subtle metallic specular response)
  const primaryCubeMat = new THREE.MeshStandardMaterial({
    color: 0x262b36,
    roughness: 0.36,
    metalness: 0.28
  });

  const secondaryCubeMat = new THREE.MeshStandardMaterial({
    color: 0x1d232f,
    roughness: 0.42,
    metalness: 0.22
  });

  const darkCylinderMat = new THREE.MeshStandardMaterial({
    color: 0x12161f,
    roughness: 0.28,
    metalness: 0.45
  });

  const edgeLineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.07
  });

  // Helper to create an architectural cube with subtle edge highlight
  function createArchitecturalCube(size, material, pos, rot) {
    const group = new THREE.Group();
    const geom = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geom, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(edges, edgeLineMat);
    group.add(line);

    group.position.set(pos.x, pos.y, pos.z);
    group.rotation.set(rot.x, rot.y, rot.z);
    return group;
  }

  // Primary Center Cube (Hero Monolith)
  const mainCube = createArchitecturalCube(
    2.15,
    primaryCubeMat,
    { x: 0.15, y: 0.15, z: 0.2 },
    { x: 0.42, y: -0.62, z: 0.22 }
  );
  clusterGroup.add(mainCube);

  // Upper-Left Floating Cube
  const topCube = createArchitecturalCube(
    1.55,
    secondaryCubeMat,
    { x: -1.45, y: 1.38, z: -0.65 },
    { x: 0.25, y: -0.48, z: 0.12 }
  );
  clusterGroup.add(topCube);

  // Lower-Base Tilted Cube
  const bottomCube = createArchitecturalCube(
    1.62,
    secondaryCubeMat,
    { x: 0.42, y: -1.68, z: -0.25 },
    { x: 0.55, y: 0.38, z: -0.42 }
  );
  clusterGroup.add(bottomCube);

  // Sleek Dark Cylinder 1 (Upper Right behind Main Cube)
  const cylGeom1 = new THREE.CylinderGeometry(0.28, 0.28, 1.85, 32);
  const cylinder1 = new THREE.Mesh(cylGeom1, darkCylinderMat);
  cylinder1.castShadow = true;
  cylinder1.receiveShadow = true;
  cylinder1.position.set(1.25, 0.42, -0.55);
  cylinder1.rotation.set(0.28, 0.15, -0.32);
  clusterGroup.add(cylinder1);

  // Sleek Dark Cylinder 2 (Lower Left under Main Cube)
  const cylGeom2 = new THREE.CylinderGeometry(0.26, 0.26, 1.65, 32);
  const cylinder2 = new THREE.Mesh(cylGeom2, darkCylinderMat);
  cylinder2.castShadow = true;
  cylinder2.receiveShadow = true;
  cylinder2.position.set(-0.55, -1.25, 0.55);
  cylinder2.rotation.set(-0.35, 0.22, 0.52);
  clusterGroup.add(cylinder2);

  // Small Accent Satellite Cube
  const miniCube = createArchitecturalCube(
    0.58,
    primaryCubeMat,
    { x: -1.85, y: -0.45, z: 0.85 },
    { x: 0.7, y: 0.4, z: 0.3 }
  );
  clusterGroup.add(miniCube);

  // 4. Warm Emissive Glowing Light Orb (Signature Element from Reference Image 1)
  const orbGroup = new THREE.Group();
  orbGroup.position.set(0.75, 1.92, 0.85);
  clusterGroup.add(orbGroup);

  const orbCoreGeom = new THREE.SphereGeometry(0.24, 32, 32);
  const orbCoreMat = new THREE.MeshBasicMaterial({
    color: 0xffd8b0
  });
  const orbMesh = new THREE.Mesh(orbCoreGeom, orbCoreMat);
  orbGroup.add(orbMesh);

  // Procedural Soft Radial Glow Sprite around the Orb
  function createGlowTexture() {
    const size = 256;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = size;
    glowCanvas.height = size;
    const ctx = glowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      4,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, 'rgba(255, 245, 230, 1)');
    gradient.addColorStop(0.18, 'rgba(255, 168, 96, 0.85)');
    gradient.addColorStop(0.45, 'rgba(255, 120, 50, 0.28)');
    gradient.addColorStop(1, 'rgba(255, 120, 50, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(glowCanvas);
  }

  const glowSpriteMat = new THREE.SpriteMaterial({
    map: createGlowTexture(),
    color: 0xff9a5a,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const glowSprite = new THREE.Sprite(glowSpriteMat);
  glowSprite.scale.set(2.45, 2.45, 1);
  orbGroup.add(glowSprite);

  // Primary Warm Point Light attached to the Orb
  const warmOrbLight = new THREE.PointLight(0xff9248, 8.5, 14, 1.6);
  warmOrbLight.castShadow = true;
  warmOrbLight.shadow.mapSize.width = 1024;
  warmOrbLight.shadow.mapSize.height = 1024;
  warmOrbLight.shadow.bias = -0.002;
  orbGroup.add(warmOrbLight);

  // 5. Studio Architectural Lighting Rig
  const ambientLight = new THREE.AmbientLight(0x1e293b, 1.35);
  scene.add(ambientLight);

  // Cool Slate-Blue Rim Light from Upper Left
  const coolRimLight = new THREE.DirectionalLight(0x60a5fa, 1.85);
  coolRimLight.position.set(-6, 5, -3);
  scene.add(coolRimLight);

  // Warm Floor Bounce Light from Bottom
  const floorBounceLight = new THREE.PointLight(0xd97706, 2.2, 12);
  floorBounceLight.position.set(1.5, -3.5, 2);
  scene.add(floorBounceLight);

  // Subtle Shadow-Receiving Pedestal Plane at Bottom
  const floorGeom = new THREE.PlaneGeometry(18, 18);
  const floorMat = new THREE.ShadowMaterial({
    opacity: 0.38
  });
  const floorMesh = new THREE.Mesh(floorGeom, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -2.65;
  floorMesh.receiveShadow = true;
  clusterGroup.add(floorMesh);

  // 6. Mouse & Touch Interaction State
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
    pointer.targetY = -(clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // 7. Resize Handling
  function onWindowResize() {
    if (!heroSection) return;
    const w = heroSection.clientWidth;
    const h = heroSection.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    updateClusterLayout();
  }

  window.addEventListener('resize', onWindowResize, { passive: true });

  // 8. Animation Loop with IntersectionObserver Optimization
  let isHeroVisible = true;
  let clock = new THREE.Clock();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isHeroVisible = entry.isIntersecting;
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(heroSection);

  function animate() {
    requestAnimationFrame(animate);
    if (!isHeroVisible) return;

    const elapsed = clock.getElapsedTime();

    // Smooth pointer damping
    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;

    if (!prefersReducedMotion) {
      // Gentle levitation and independent rotation for each geometric monolith
      mainCube.position.y = 0.15 + Math.sin(elapsed * 1.15) * 0.11;
      mainCube.rotation.y = -0.62 + Math.sin(elapsed * 0.45) * 0.08 + pointer.x * 0.18;
      mainCube.rotation.x = 0.42 + Math.cos(elapsed * 0.4) * 0.06 - pointer.y * 0.14;

      topCube.position.y = 1.38 + Math.sin(elapsed * 1.35 + 1.2) * 0.14;
      topCube.rotation.y = -0.48 + Math.cos(elapsed * 0.5) * 0.1;
      topCube.rotation.z = 0.12 + Math.sin(elapsed * 0.4) * 0.06;

      bottomCube.position.y = -1.68 + Math.cos(elapsed * 1.05 + 2.4) * 0.09;
      bottomCube.rotation.y = 0.38 + Math.sin(elapsed * 0.38) * 0.08;

      cylinder1.position.y = 0.42 + Math.cos(elapsed * 1.4) * 0.1;
      cylinder1.rotation.z = -0.32 + Math.sin(elapsed * 0.6) * 0.07;

      cylinder2.position.y = -1.25 + Math.sin(elapsed * 1.25 + 0.8) * 0.1;
      cylinder2.rotation.x = -0.35 + Math.cos(elapsed * 0.55) * 0.07;

      miniCube.position.y = -0.45 + Math.sin(elapsed * 1.8) * 0.16;
      miniCube.rotation.x += 0.006;
      miniCube.rotation.y += 0.008;

      // Glowing Orb subtle orbit + pointer response
      orbGroup.position.x = 0.75 + Math.sin(elapsed * 0.9) * 0.18 + pointer.x * 0.38;
      orbGroup.position.y = 1.92 + Math.cos(elapsed * 1.3) * 0.12 + pointer.y * 0.25;

      // Subtle breathing glow scale
      const pulseScale = 2.45 + Math.sin(elapsed * 2.4) * 0.18;
      glowSprite.scale.set(pulseScale, pulseScale, 1);

      // Whole cluster subtle tilt
      clusterGroup.rotation.y = pointer.x * 0.14;
      clusterGroup.rotation.x = -pointer.y * 0.09;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
