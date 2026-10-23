import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ChevronDown, ChevronUp, Eye, Layers, Palette, RotateCcw } from "lucide-react";

// Pre-allocated math helpers at module scope (Zero GC in render loop)
const _vec3 = new THREE.Vector3();
const _targetLook = new THREE.Vector3(0, 1.45, 0);
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();

type FinishPreset = {
  id: string;
  label: string;
  primaryHex: number;
  accentHex: number;
  crystalHex: number;
};

const FINISH_PRESETS: FinishPreset[] = [
  {
    id: "cobalt",
    label: "Lumina Cobalt",
    primaryHex: 0x1e293b,
    accentHex: 0x3b82f6,
    crystalHex: 0xfacc15,
  },
  {
    id: "gold",
    label: "Brushed Gold",
    primaryHex: 0x18181b,
    accentHex: 0xf59e0b,
    crystalHex: 0x38bdf8,
  },
  {
    id: "titanium",
    label: "Titanium Silver",
    primaryHex: 0x334155,
    accentHex: 0xe2e8f0,
    crystalHex: 0x3b82f6,
  },
  {
    id: "emerald",
    label: "Bio Emerald",
    primaryHex: 0x0f2922,
    accentHex: 0x10b981,
    crystalHex: 0xfacc15,
  },
];

type CameraPreset = {
  id: string;
  label: string;
  pos: [number, number, number];
  look: [number, number, number];
};

const CAMERA_PRESETS: CameraPreset[] = [
  { id: "iso", label: "Isometric", pos: [4.6, 3.2, 5.2], look: [0, 1.45, 0] },
  { id: "macro", label: "Core Macro", pos: [2.2, 2.0, 2.6], look: [0, 1.75, 0] },
  { id: "zenith", label: "Top Blueprint", pos: [0.2, 6.8, 0.8], look: [0, 1.2, 0] },
  { id: "hero", label: "Low Hero", pos: [4.2, 1.1, 4.4], look: [0, 1.65, 0] },
];

function createProceduralDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      const r1 = i % 5 === 0 ? 190 : 205;
      const r2 = 220;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
      ctx.lineTo(256 + Math.cos(angle) * r2, 256 + Math.sin(angle) * r2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    grad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
    grad.addColorStop(0.55, "rgba(0, 0, 0, 0.28)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Lumina3DStage() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [exploded, setExploded] = useState(0);
  const [finishId, setFinishId] = useState<string>("cobalt");
  const [camPresetId, setCamPresetId] = useState<string>("iso");
  const [spinSpeed, setSpinSpeed] = useState<number>(1);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  // Mutable refs read inside the WebGL loop without re-mounting the canvas
  const stateRef = useRef({
    targetExplode: 0,
    currentExplode: 0,
    spinSpeed: 1,
    finishId: "cobalt",
    camTargetPos: new THREE.Vector3(4.6, 3.2, 5.2),
    camTargetLook: new THREE.Vector3(0, 1.45, 0),
    camTransitioning: false,
  });

  const materialsRef = useRef<{
    chassis?: THREE.MeshStandardMaterial;
    outerRing?: THREE.MeshPhysicalMaterial;
    innerRing?: THREE.MeshStandardMaterial;
    crystal?: THREE.MeshPhysicalMaterial;
  }>({});

  useEffect(() => {
    stateRef.current.targetExplode = exploded;
  }, [exploded]);

  useEffect(() => {
    stateRef.current.spinSpeed = spinSpeed;
  }, [spinSpeed]);

  useEffect(() => {
    const preset = FINISH_PRESETS.find((p) => p.id === finishId) ?? FINISH_PRESETS[0];
    if (materialsRef.current.chassis) {
      materialsRef.current.chassis.color.setHex(preset.primaryHex);
    }
    if (materialsRef.current.outerRing) {
      materialsRef.current.outerRing.color.setHex(preset.accentHex);
    }
    if (materialsRef.current.innerRing) {
      materialsRef.current.innerRing.color.setHex(preset.crystalHex);
    }
    if (materialsRef.current.crystal) {
      materialsRef.current.crystal.color.setHex(preset.crystalHex);
      materialsRef.current.crystal.emissive.setHex(preset.accentHex);
    }
  }, [finishId]);

  const selectCameraPreset = (preset: CameraPreset) => {
    setCamPresetId(preset.id);
    stateRef.current.camTargetPos.set(...preset.pos);
    stateRef.current.camTargetLook.set(...preset.look);
    stateRef.current.camTransitioning = true;
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) return true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 560);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    scene.fog = new THREE.FogExp2(0x0b1220, 0.045);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 800) / (container.clientHeight || 560),
      0.1,
      100,
    );
    camera.position.set(4.6, 3.2, 5.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.45, 0);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 2.0;
    controls.maxDistance = 12.0;
    controls.addEventListener("start", () => {
      stateRef.current.camTransitioning = false;
    });

    // 3-Point Studio Lighting Rig + Cool Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0x60a5fa, 0x0f172a, 0.85);
    hemiLight.position.set(0, 12, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.4);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.65);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Ground Floor + Contact Shadow + Calibration Dial
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const dialTex = createProceduralDialTexture(maxAniso);
    const shadowTex = createContactShadowTexture();

    const floorGeo = new THREE.CircleGeometry(9, 64);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.82,
      metalness: 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const dialGeo = new THREE.PlaneGeometry(4.6, 4.6);
    dialGeo.rotateX(-Math.PI / 2);
    const dialMat = new THREE.MeshStandardMaterial({
      map: dialTex,
      roughness: 0.45,
      metalness: 0.5,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.y = 0.01;
    dialMesh.receiveShadow = true;
    scene.add(dialMesh);

    const contactGeo = new THREE.PlaneGeometry(3.8, 3.8);
    contactGeo.rotateX(-Math.PI / 2);
    const contactMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const contactMesh = new THREE.Mesh(contactGeo, contactMat);
    contactMesh.position.y = 0.02;
    scene.add(contactMesh);

    // ── COMPOSITE 8-PART PROCEDURAL SCULPTURE (THREE.Group) ──────────
    const rootSculpture = new THREE.Group();
    scene.add(rootSculpture);

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.28,
      metalness: 0.88,
    });
    const outerRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      roughness: 0.15,
      metalness: 0.94,
      clearcoat: 0.6,
    });
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.42,
      metalness: 0.85,
    });
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xfacc15,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.22,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.82 : 1.0,
      ior: 1.75,
      thickness: 1.2,
    });

    materialsRef.current = {
      chassis: chassisMat,
      outerRing: outerRingMat,
      innerRing: innerRingMat,
      crystal: crystalMat,
    };

    // Part 1: Fluted Pedestal Base (LatheGeometry, bottom-center flush at y = 0)
    const lathePoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.25, 0),
      new THREE.Vector2(1.18, 0.14),
      new THREE.Vector2(0.92, 0.24),
      new THREE.Vector2(0.96, 0.38),
      new THREE.Vector2(0.68, 0.52),
      new THREE.Vector2(0, 0.52),
    ];
    const pedestalGeo = new THREE.LatheGeometry(lathePoints, 32);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, chassisMat);
    pedestalMesh.castShadow = true;
    pedestalMesh.receiveShadow = true;
    rootSculpture.add(pedestalMesh);

    // Part 2: Beveled Octagonal Core Chassis (ExtrudeGeometry)
    const octShape = new THREE.Shape();
    const octRadius = 0.62;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const px = Math.cos(a) * octRadius;
      const py = Math.sin(a) * octRadius;
      if (i === 0) octShape.moveTo(px, py);
      else octShape.lineTo(px, py);
    }
    octShape.closePath();
    const extrudeGeo = new THREE.ExtrudeGeometry(octShape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 3,
    });
    extrudeGeo.rotateX(Math.PI / 2);
    const chassisPlatform = new THREE.Mesh(extrudeGeo, chassisMat);
    chassisPlatform.position.y = 0.68;
    chassisPlatform.castShadow = true;
    rootSculpture.add(chassisPlatform);

    // Part 3: Outer Gimbal Ring (TorusGeometry)
    const outerGimbalGeo = new THREE.TorusGeometry(1.15, 0.055, 24, 72);
    const outerGimbal = new THREE.Mesh(outerGimbalGeo, outerRingMat);
    outerGimbal.position.y = 1.75;
    outerGimbal.castShadow = true;
    rootSculpture.add(outerGimbal);

    // Part 4: Inner Gyroscope Ring (TorusGeometry)
    const innerGyroGeo = new THREE.TorusGeometry(0.86, 0.042, 20, 64);
    const innerGyro = new THREE.Mesh(innerGyroGeo, innerRingMat);
    innerGyro.position.y = 1.75;
    innerGyro.castShadow = true;
    rootSculpture.add(innerGyro);

    // Part 5: Helical Induction Coil (TubeGeometry)
    const curvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 4;
      curvePoints.push(
        new THREE.Vector3(Math.cos(t) * 0.56, (i / 48) * 0.85 - 0.425, Math.sin(t) * 0.56),
      );
    }
    const coilCurve = new THREE.CatmullRomCurve3(curvePoints);
    const coilGeo = new THREE.TubeGeometry(coilCurve, 96, 0.022, 12, false);
    const coilMesh = new THREE.Mesh(coilGeo, innerRingMat);
    coilMesh.position.y = 1.75;
    rootSculpture.add(coilMesh);

    // Part 6: Optical Sapphire Crystal Core
    const crystalGeo = new THREE.OctahedronGeometry(0.42, 1);
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalMesh.position.y = 1.75;
    crystalMesh.castShadow = true;
    rootSculpture.add(crystalMesh);

    // Part 7: Upper Crown Cap
    const crownGeo = new THREE.CylinderGeometry(0.18, 0.46, 0.24, 8);
    const crownMesh = new THREE.Mesh(crownGeo, chassisMat);
    crownMesh.position.y = 2.95;
    crownMesh.castShadow = true;
    rootSculpture.add(crownMesh);

    // Part 8: 24 Instanced Perimeter Calibration Pillars (InstancedMesh > 20 items)
    const pillarGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.36, 12);
    pillarGeo.translate(0, 0.18, 0); // Pivot at bottom-center flush with ground
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.82,
    });
    const instancedPillars = new THREE.InstancedMesh(pillarGeo, pillarMat, 24);
    instancedPillars.castShadow = true;
    instancedPillars.receiveShadow = true;

    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 1.85;
      _vec3.set(Math.cos(angle) * radius, 0.01, Math.sin(angle) * radius);
      _quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
      const scaleH = i % 3 === 0 ? 1.15 : i % 2 === 0 ? 0.92 : 1.0;
      _scale.set(1, scaleH, 1);
      _mat4.compose(_vec3, _quat, _scale);
      instancedPillars.setMatrixAt(i, _mat4);
      _color.setHex(i % 4 === 0 ? 0xfacc15 : 0x3b82f6);
      instancedPillars.setColorAt(i, _color);
    }
    instancedPillars.instanceMatrix.needsUpdate = true;
    if (instancedPillars.instanceColor) instancedPillars.instanceColor.needsUpdate = true;
    instancedPillars.computeBoundingSphere();
    rootSculpture.add(instancedPillars);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const st = stateRef.current;

      // Smooth exponential damping for exploded-view separation
      st.currentExplode = THREE.MathUtils.damp(st.currentExplode, st.targetExplode, 6, dt);
      const ex = st.currentExplode;

      // Apply exploded offsets smoothly
      chassisPlatform.position.y = 0.68 + ex * 0.25;
      outerGimbal.position.y = 1.75 + ex * 0.55;
      innerGyro.position.y = 1.75 + ex * 0.85;
      coilMesh.position.y = 1.75 + ex * 0.4;
      crystalMesh.position.y = 1.75 + ex * 1.15 + Math.sin(elapsed * 2.2) * 0.05;
      crownMesh.position.y = 2.95 + ex * 1.65;

      // Rotate rings & core
      const spd = st.spinSpeed;
      outerGimbal.rotation.y += dt * 0.55 * spd;
      outerGimbal.rotation.x = Math.sin(elapsed * 0.7) * 0.35;
      innerGyro.rotation.x += dt * 0.85 * spd;
      innerGyro.rotation.z += dt * 0.45 * spd;
      coilMesh.rotation.y -= dt * 0.4 * spd;
      crystalMesh.rotation.y += dt * 1.1 * spd;
      crystalMesh.rotation.z = Math.cos(elapsed * 1.3) * 0.25;

      // Smooth camera transition if active
      if (st.camTransitioning) {
        camera.position.lerp(st.camTargetPos, 1 - Math.exp(-5 * dt));
        _targetLook.lerp(st.camTargetLook, 1 - Math.exp(-5 * dt));
        controls.target.copy(_targetLook);
        if (camera.position.distanceTo(st.camTargetPos) < 0.04) {
          st.camTransitioning = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      dialTex.dispose();
      shadowTex.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="three-studio"
      aria-labelledby="three-studio-heading"
      className="border-b border-hairline bg-background"
    >
      <div className="container-editorial section-pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-meta text-accent-yellow">
              Interactive 3D WebGL Studio · Procedural 08-Part Chronometer Core
            </p>
            <h2
              id="three-studio-heading"
              className="mt-4 font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.86] tracking-normal"
            >
              LUMINALM 3D
              <br />
              KINETIC CORE
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            Drag to orbit, scroll to zoom, or use the bottom control deck to inspect the exploded
            assembly, switch PBR metallic finishes, and trigger camera presets.
          </p>
        </div>

        {/* Bounded 3D Viewport with Unobstructed Center & Collapsible Bottom Dock */}
        <div className="relative h-[min(78vh,44rem)] min-h-[32rem] w-full overflow-hidden border border-hairline bg-[#0b1220]">
          {/* Dedicated Isolated WebGL Canvas Mount */}
          <div ref={canvasMountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

          {/* Top-Left Minimal Spec Header Overlay (Solid rgba surface, no backdrop-filter over WebGL) */}
          <div className="pointer-events-none absolute left-4 top-4 z-10 border border-hairline bg-[#0b1220]/92 px-3.5 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent-yellow">
              LuminaLM Core · Three.js PBR Engine
            </p>
            <p className="mt-0.5 font-mono text-[10px] tabular-nums text-ink-soft">
              08 Procedural Parts · 24 Instanced Nodes · ACES Filmic
            </p>
          </div>

          {/* Unified Collapsible Bottom Control Dock (<= 15% viewport height, solid rgba surface) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center px-3">
            <button
              type="button"
              onClick={() => setDockCollapsed(!dockCollapsed)}
              className="pointer-events-auto mb-1 inline-flex items-center gap-1.5 border border-hairline bg-[#0b1220]/95 px-3 py-1 font-mono text-[10px] uppercase text-ink-soft transition-colors hover:border-accent-blue hover:text-ink"
            >
              {dockCollapsed ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
              <span>{dockCollapsed ? "Show 3D Controls" : "Hide Controls"}</span>
            </button>

            {!dockCollapsed ? (
              <div className="pointer-events-auto flex w-full max-w-[56rem] flex-wrap items-center justify-between gap-4 border border-hairline bg-[#0b1220]/95 px-4 py-3 shadow-2xl">
                {/* Exploded View Slider */}
                <div className="flex items-center gap-3">
                  <Layers className="size-4 text-accent-blue" />
                  <label className="flex items-center gap-2 font-mono text-[10px] uppercase text-ink">
                    <span>Explode</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.02}
                      value={exploded}
                      onChange={(e) => setExploded(Number(e.target.value))}
                      className="h-1.5 w-24 accent-blue-500"
                    />
                    <span className="w-8 tabular-nums text-accent-yellow">
                      {Math.round(exploded * 100)}%
                    </span>
                  </label>
                </div>

                {/* Material Finish Swatches */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <Palette className="mr-1 size-3.5 text-accent-yellow" />
                  {FINISH_PRESETS.map((fp) => (
                    <button
                      key={fp.id}
                      type="button"
                      onClick={() => setFinishId(fp.id)}
                      className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                        finishId === fp.id
                          ? "bg-accent-blue text-primary-foreground"
                          : "border border-hairline bg-[#111827] text-ink-soft hover:text-ink"
                      }`}
                    >
                      {fp.label}
                    </button>
                  ))}
                </div>

                {/* Camera View Presets & Speed */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <Eye className="mr-1 size-3.5 text-accent-blue" />
                  {CAMERA_PRESETS.map((cp) => (
                    <button
                      key={cp.id}
                      type="button"
                      onClick={() => selectCameraPreset(cp)}
                      className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                        camPresetId === cp.id
                          ? "border border-accent-yellow bg-[#172033] text-accent-yellow"
                          : "border border-hairline bg-[#111827] text-ink-soft hover:text-ink"
                      }`}
                    >
                      {cp.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setExploded(0);
                      setSpinSpeed((s) => (s === 0 ? 1 : s === 1 ? 2.2 : 0));
                    }}
                    title="Cycle rotation speed"
                    className="inline-flex items-center gap-1 border border-hairline bg-[#111827] px-2.5 py-1 font-mono text-[10px] uppercase tabular-nums text-ink-soft hover:text-ink"
                  >
                    <RotateCcw className="size-3" />
                    <span>{spinSpeed === 0 ? "Paused" : `${spinSpeed}x`}</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
