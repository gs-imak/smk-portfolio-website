import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scroll } from "./useScrollStore";
import { CAM_POS_EASE, CAM_TARGET_EASE } from "./choreography";
import { PLANETS, visit, visitTuning } from "./visit";

/**
 * The scroll→camera rig. Reads the choreography frame and applies it to the
 * default camera. During a planet VISIT it blends (by visit.t) from the locked
 * follow-cam toward a "hover at the planet" pose — behind the character, the
 * planet looming off to one side — so the fly-to is one smooth move.
 *
 * THE FALL RULES are unchanged (pure vertical follow, up = head dir, no roll).
 */
export function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(...scroll.frame.camera.target));
  const desired = useRef(new THREE.Vector3());
  const tmpTarget = useRef(new THREE.Vector3());
  const up = useRef(new THREE.Vector3(0, 1, 0));
  // scratch for the visit pose
  const vDir = useRef(new THREE.Vector3());
  const vSide = useRef(new THREE.Vector3());
  const WORLD_UP = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    const cam = scroll.frame.camera;

    // The camera does NOT react to the cursor — no parallax (it read as a flicker
    // as the whole scene shifted under the mouse). Pure scroll-driven follow.
    desired.current.set(cam.position[0], cam.position[1], cam.position[2]);
    tmpTarget.current.set(cam.target[0], cam.target[1], cam.target[2]);
    up.current.set(cam.up[0], cam.up[1], cam.up[2]);

    // --- VISIT blend: OVER-THE-SHOULDER at the selected planet ---
    let voff = cam.viewOffsetX;
    if (visit.t > 0.001 && visit.index >= 0) {
      const pl = PLANETS[visit.index].position;
      const ch = visit.charPos; // where he flew to (hover anchor at the planet)
      // forward = the way he faces (toward the planet); side = over his shoulder
      vDir.current.set(pl[0] - ch[0], pl[1] - ch[1], pl[2] - ch[2]).normalize();
      vSide.current.crossVectors(vDir.current, WORLD_UP.current).normalize();
      const T = visitTuning;
      // camera CLOSE behind one shoulder + raised → he fills the foreground
      const vx = ch[0] - vDir.current.x * T.camDist + vSide.current.x * T.camShoulder;
      const vy = ch[1] - vDir.current.y * T.camDist + T.camHeight + vSide.current.y * T.camShoulder;
      const vz = ch[2] - vDir.current.z * T.camDist + vSide.current.z * T.camShoulder;
      // look past him toward the planet
      const tx = ch[0] + vDir.current.x * T.lookAhead;
      const ty = ch[1] + vDir.current.y * T.lookAhead + T.lookUp;
      const tz = ch[2] + vDir.current.z * T.lookAhead;
      const t = visit.t;
      desired.current.set(
        THREE.MathUtils.lerp(desired.current.x, vx, t),
        THREE.MathUtils.lerp(desired.current.y, vy, t),
        THREE.MathUtils.lerp(desired.current.z, vz, t),
      );
      tmpTarget.current.set(
        THREE.MathUtils.lerp(tmpTarget.current.x, tx, t),
        THREE.MathUtils.lerp(tmpTarget.current.y, ty, t),
        THREE.MathUtils.lerp(tmpTarget.current.z, tz, t),
      );
      up.current.lerp(WORLD_UP.current, t).normalize();
      voff = -T.viewShift * t; // push the 3D subject RIGHT (clear the left dossier)
    }

    if (scroll.forceCam) {
      camera.position.copy(desired.current);
      target.current.copy(tmpTarget.current);
    } else {
      camera.position.lerp(desired.current, CAM_POS_EASE);
      target.current.lerp(tmpTarget.current, CAM_TARGET_EASE);
    }

    camera.up.copy(up.current);
    camera.lookAt(target.current);
    if (cam.tilt) camera.rotateX(cam.tilt);

    if (voff !== 0) {
      camera.setViewOffset(size.width, size.height, voff * size.width, 0, size.width, size.height);
    } else if (camera.view?.enabled) {
      camera.clearViewOffset();
    }
  });

  return null;
}
