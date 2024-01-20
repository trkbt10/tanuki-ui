import * as React from "react";
import * as THREE from "three";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry";

/**
 * Props for the WebGLRectangleNode component
 */
interface WebGLRectangleNodeProps {
  /** Width of the canvas in pixels */
  width: number;
  /** Height of the canvas in pixels */
  height: number;
  /** Color of the teapot (hex string or color name) */
  color?: string;
  /** Border radius - creatively used to scale the teapot */
  borderRadius?: number;
}

/**
 * Internal state structure for Three.js renderer management
 */
interface ThreeRendererState {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  isReady: boolean;
  isDisposed: boolean;
}

/**
 * Store interface for managing Three.js resources with external state synchronization
 */
interface ThreeRendererStore extends ThreeRendererState {
  listeners: Set<() => void>;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => ThreeRendererState;
  getServerSnapshot: () => ThreeRendererState;
  initialize: (canvas: HTMLCanvasElement, width: number, height: number) => boolean;
  dispose: () => void;
  updateSize: (width: number, height: number) => void;
}

/**
 * Creates a store for managing Three.js renderer lifecycle
 * This pattern ensures proper resource management in React.StrictMode
 */
function createThreeRendererStore(): ThreeRendererStore {
  let state: ThreeRendererState = {
    renderer: null,
    scene: null,
    camera: null,
    isReady: false,
    isDisposed: false,
  };

  const listeners = new Set<() => void>();

  const notifyListeners = () => {
    listeners.forEach((listener) => listener());
  };

  const store: ThreeRendererStore = {
    ...state,
    listeners,

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    getSnapshot() {
      return state;
    },

    getServerSnapshot() {
      return {
        renderer: null,
        scene: null,
        camera: null,
        isReady: false,
        isDisposed: false,
      };
    },

    initialize(canvas, width, height) {
      // Prevent re-initialization of active renderer
      if (state.renderer) {
        console.warn("ThreeRendererStore: Renderer already initialized");
        return false;
      }

      // Reset state for new initialization
      state.isDisposed = false;
      state.isReady = false;

      try {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 50);
        camera.lookAt(0, 0, 0);

        // Lighting setup
        const lights = [
          new THREE.AmbientLight(0x404040),
          new THREE.DirectionalLight(0xffffff, 1),
          new THREE.PointLight(0xffffff, 1),
        ];

        lights[1].position.set(5, 5, 5);
        lights[2].position.set(-5, 5, -5);
        lights.forEach((light) => scene.add(light));

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 1);

        // Update state
        state = {
          renderer,
          scene,
          camera,
          isReady: true,
          isDisposed: false,
        };

        // Copy state to store properties
        Object.assign(store, state);

        notifyListeners();

        console.log("ThreeRendererStore: Successfully initialized WebGL renderer");
        return true;
      } catch (error) {
        console.error("ThreeRendererStore: Failed to create WebGL renderer:", error);
        state.isReady = false;
        notifyListeners();
        return false;
      }
    },

    dispose() {
      if (state.isDisposed) {
        console.warn("ThreeRendererStore: Already disposed");
        return;
      }
      
      // Mark as disposing to prevent concurrent calls
      state.isDisposed = true;
      
      // Only proceed if we have something to dispose
      if (!state.renderer && !state.scene && !state.camera) {
        console.log("ThreeRendererStore: Nothing to dispose");
        return;
      }

      // Clean up scene objects first
      if (state.scene) {
        // Clear all children from scene
        while (state.scene.children.length > 0) {
          const child = state.scene.children[0];
          state.scene.remove(child);
          
          // Dispose mesh resources
          if (child instanceof THREE.Mesh) {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
          
          // Dispose light resources
          if (child instanceof THREE.Light) {
            if ('dispose' in child) {
              (child as any).dispose();
            }
          }
        }
        
        // Clear the scene
        state.scene.clear();
      }

      // Dispose renderer
      if (state.renderer) {
        state.renderer.dispose();
        state.renderer.forceContextLoss();
        
        // Attempt to release WebGL context
        const gl = state.renderer.getContext();
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }

      // Reset state - only mark as disposed after all cleanup is complete
      state = {
        renderer: null,
        scene: null,
        camera: null,
        isReady: false,
        isDisposed: true,
      };

      // Copy state to store properties
      Object.assign(store, state);

      notifyListeners();

      console.log("ThreeRendererStore: Successfully disposed WebGL renderer");
    },

    updateSize(width, height) {
      if (!state.camera || !state.renderer || state.isDisposed) return;

      state.camera.aspect = width / height;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(width, height);
    },
  };

  return store;
}

/**
 * Custom hook for managing Three.js renderer lifecycle with useSyncExternalStore
 * Ensures proper initialization and cleanup in React.StrictMode
 */
function useThreeRenderer(canvasRef: React.RefObject<HTMLCanvasElement | null>, width: number, height: number) {
  const storeRef = React.useRef<ThreeRendererStore | null>(null);

  // Create store only once
  if (!storeRef.current) {
    storeRef.current = createThreeRendererStore();
  }

  // Subscribe to store updates
  const state = React.useSyncExternalStore(
    storeRef.current.subscribe,
    storeRef.current.getSnapshot,
    storeRef.current.getServerSnapshot,
  );

  // Initialize renderer
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const store = storeRef.current;

    if (!canvas || !store) return;

    console.log("useThreeRenderer: Setting up renderer initialization");

    // Small delay to ensure canvas is properly mounted
    const timeoutId = setTimeout(() => {
      const initialized = store.initialize(canvas, width, height);
      if (initialized) {
        console.log("useThreeRenderer: Renderer initialized successfully");
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      console.log("useThreeRenderer: Cleaning up renderer");
      store.dispose();
    };
  }, []); // Only run on mount/unmount

  // Update size when dimensions change
  React.useEffect(() => {
    storeRef.current?.updateSize(width, height);
  }, [width, height]);

  return {
    renderer: state.renderer,
    scene: state.scene,
    camera: state.camera,
    isReady: state.isReady && !state.isDisposed,
  };
}

/**
 * Custom hook for managing animation loops with automatic cleanup
 * @param callback - Function to call on each animation frame
 * @param enabled - Whether the animation loop should be running
 */
function useAnimationLoop(callback: () => void, enabled: boolean) {
  const animationIdRef = React.useRef<number | null>(null);
  const callbackRef = React.useRef(callback);

  // Update callback ref to avoid stale closures
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    if (!enabled) return;

    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      animationIdRef.current = requestAnimationFrame(animate);

      // Use try-catch to prevent errors from breaking the animation loop
      try {
        callbackRef.current();
      } catch (error) {
        console.error("Animation loop error:", error);
      }
    };

    animate();

    return () => {
      isRunning = false;
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [enabled]);
}

/**
 * WebGLRectangleNode - A React component that renders a 3D teapot using Three.js
 *
 * This component demonstrates:
 * - Proper Three.js resource management in React 19
 * - StrictMode compatibility with useSyncExternalStore
 * - Clean animation loop implementation
 * - Comprehensive error handling and cleanup
 */
export const WebGLRectangleNode: React.FC<WebGLRectangleNodeProps> = React.memo(
  ({ width, height, color = "#2196F3", borderRadius = 0 }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { renderer, scene, camera, isReady } = useThreeRenderer(canvasRef, width, height);

    // Refs for mutable objects
    const meshRef = React.useRef<THREE.Mesh | null>(null);
    const materialRef = React.useRef<THREE.MeshPhongMaterial | null>(null);
    const wireframeRef = React.useRef<THREE.Mesh | null>(null);
    const gridRef = React.useRef<THREE.GridHelper | null>(null);
    console.log("WebGLRectangleNode: Rendered with color", color, "and borderRadius", borderRadius);
    // Create and manage scene objects
    React.useEffect(() => {
      if (!isReady || !scene) return;

      // Geometries
      const teapotGeometry = new TeapotGeometry(15, 10);
      const wireframeGeometry = new TeapotGeometry(15, 10);

      // Materials
      const teapotMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        specular: 0x222222,
        shininess: 100,
        side: THREE.DoubleSide,
      });

      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      // Create meshes
      const teapot = new THREE.Mesh(teapotGeometry, teapotMaterial);
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);

      // Set up hierarchy
      teapot.add(wireframe);
      scene.add(teapot);

      // Create grid
      const grid = new THREE.GridHelper(40, 20, 0x00ff00, 0x004400);
      grid.rotation.x = Math.PI / 2;
      scene.add(grid);

      // Store references
      meshRef.current = teapot;
      materialRef.current = teapotMaterial;
      wireframeRef.current = wireframe;
      gridRef.current = grid;

      // Cleanup function
      return () => {
        // Remove from scene
        scene.remove(teapot);
        scene.remove(grid);

        // Dispose geometries
        teapotGeometry.dispose();
        wireframeGeometry.dispose();

        // Dispose materials
        teapotMaterial.dispose();
        wireframeMaterial.dispose();

        // Clear references
        meshRef.current = null;
        materialRef.current = null;
        wireframeRef.current = null;
        gridRef.current = null;
      };
    }, [isReady, scene]); // Note: color is handled separately

    // Update material color
    React.useEffect(() => {
      if (materialRef.current) {
        materialRef.current.color.set(color);
      }
    }, [color]);

    // Update scale based on border radius
    React.useEffect(() => {
      if (meshRef.current) {
        const scale = Math.max(0.1, 1 + borderRadius / 20);
        meshRef.current.scale.setScalar(scale);
      }
    }, [borderRadius]);

    // Animation loop
    useAnimationLoop(
      React.useCallback(() => {
        // Rotate teapot
        if (meshRef.current) {
          meshRef.current.rotation.x += 0.005;
          meshRef.current.rotation.y += 0.01;
        }

        // Render scene
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      }, [renderer, scene, camera]),
      isReady,
    );

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "block",
          backgroundColor: isReady ? "transparent" : "#000",
        }}
      />
    );
  },
);

WebGLRectangleNode.displayName = "WebGLRectangleNode";
