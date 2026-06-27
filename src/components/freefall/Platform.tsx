/**
 * The platform he walks along and leaps off. Static at y≈0 (top surface at 0,
 * where the character's feet sit). It naturally leaves frame during the fall
 * because the camera rises away with the character — no fade hack (README §6:
 * the camera angle clears it, fading was explicitly rejected).
 *
 * Geometry/positions ported from the prototype: slab Box(7,0.5,3.2) at x=-1.4,
 * glowing leap-edge strip Box(0.2,0.5,3.2) at x=2.0 (where he jumps).
 */
export function Platform() {
  return (
    <group>
      <mesh position={[-1.4, -0.25, 0]} receiveShadow>
        <boxGeometry args={[7, 0.5, 3.2]} />
        <meshStandardMaterial color={0x16142a} roughness={0.75} metalness={0.25} />
      </mesh>
      {/* glowing leap edge */}
      <mesh position={[2.0, -0.24, 0]}>
        <boxGeometry args={[0.2, 0.5, 3.2]} />
        <meshStandardMaterial color={0x7c5cff} emissive={0x7c5cff} emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
