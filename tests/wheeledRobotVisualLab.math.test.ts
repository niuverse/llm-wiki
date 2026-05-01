import assert from "node:assert/strict"
import test from "node:test"
import {
  differentialDriveRows,
  directionRow,
  lateralConstraintResidual,
  unitFromAngle,
  wheelPointVelocity,
} from "../quartz/components/scripts/wheeledRobotVisualLab.math"

test("wheelPointVelocity adds rotational velocity in the body frame", () => {
  const velocity = wheelPointVelocity({ vx: 2, vy: 1, omega: 3 }, { x: 0.5, y: 0.25 })

  assert.deepEqual(velocity, { x: 1.25, y: 2.5 })
})

test("directionRow maps body twist to a wheel rolling speed row", () => {
  const row = directionRow(unitFromAngle(0), { x: 0, y: 0.6 }, 0.3)

  assert.deepEqual(row.map((value) => Number(value.toFixed(6))), [3.333333, 0, -2])
})

test("differentialDriveRows produces left and right wheel rows", () => {
  const rows = differentialDriveRows(0.25, 0.5)

  assert.deepEqual(rows.left.map((value) => Number(value.toFixed(6))), [4, 0, -2])
  assert.deepEqual(rows.right.map((value) => Number(value.toFixed(6))), [4, 0, 2])
})

test("lateralConstraintResidual is zero when local velocity is parallel to the wheel", () => {
  const residual = lateralConstraintResidual(
    { vx: 1, vy: 0, omega: 0 },
    { x: 0, y: 0.5 },
    unitFromAngle(Math.PI / 2),
  )

  assert.ok(Math.abs(residual) < 1e-12)
})
