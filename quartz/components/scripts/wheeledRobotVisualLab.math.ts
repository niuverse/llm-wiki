export type Vec2 = {
  x: number
  y: number
}

export type BodyTwist = {
  vx: number
  vy: number
  omega: number
}

export type MatrixRow = [number, number, number]

export function unitFromAngle(theta: number): Vec2 {
  return { x: Math.cos(theta), y: Math.sin(theta) }
}

export function normalFromTangent(tangent: Vec2): Vec2 {
  return { x: -tangent.y, y: tangent.x }
}

export function dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y
}

export function wheelPointVelocity(twist: BodyTwist, point: Vec2): Vec2 {
  return {
    x: twist.vx - twist.omega * point.y,
    y: twist.vy + twist.omega * point.x,
  }
}

export function directionRow(direction: Vec2, point: Vec2, radius = 1): MatrixRow {
  return [
    direction.x / radius,
    direction.y / radius,
    (-direction.x * point.y + direction.y * point.x) / radius,
  ]
}

export function rollingSpeed(twist: BodyTwist, point: Vec2, tangent: Vec2, radius = 1): number {
  return dot(tangent, wheelPointVelocity(twist, point)) / radius
}

export function lateralConstraintResidual(twist: BodyTwist, point: Vec2, normal: Vec2): number {
  return dot(normal, wheelPointVelocity(twist, point))
}

export function differentialDriveRows(
  radius: number,
  halfTrack: number,
): { left: MatrixRow; right: MatrixRow } {
  const tangent = unitFromAngle(0)
  return {
    left: directionRow(tangent, { x: 0, y: halfTrack }, radius),
    right: directionRow(tangent, { x: 0, y: -halfTrack }, radius),
  }
}
