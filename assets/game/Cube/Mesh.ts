import { Vec3, utils } from "cc";
let positions = [
  1.5, 0.7, 1.7, 1.4121320343559642, 0.7, 1.9121320343559642, 1.2, 0.7, 2,
  1.4121320343559642, 0.9121320343559642, 1.7, 1.35, 0.9121320343559642,
  1.8499999999999999, 1.2, 0.9121320343559642, 1.9121320343559642, 1.2, 1, 1.7,
  1.5, 0.7, -1.7, 1.4121320343559642, 0.7, -1.9121320343559642, 1.2, 0.7, -2,
  1.4121320343559642, 0.9121320343559642, -1.7, 1.35, 0.9121320343559642,
  -1.8499999999999999, 1.2, 0.9121320343559642, -1.9121320343559642, 1.2, 1,
  -1.7, -1.5, 0.7, -1.7, -1.4121320343559642, 0.7, -1.9121320343559642, -1.2,
  0.7, -2, -1.4121320343559642, 0.9121320343559642, -1.7, -1.35,
  0.9121320343559642, -1.8499999999999999, -1.2, 0.9121320343559642,
  -1.9121320343559642, -1.2, 1, -1.7, -1.5, 0.7, 1.7, -1.4121320343559642, 0.7,
  1.9121320343559642, -1.2, 0.7, 2, -1.4121320343559642, 0.9121320343559642,
  1.7, -1.35, 0.9121320343559642, 1.8499999999999999, -1.2, 0.9121320343559642,
  1.9121320343559642, -1.2, 1, 1.7, 1.5, -0.7, 1.7, 1.4121320343559642, -0.7,
  1.9121320343559642, 1.2, -0.7, 2, 1.4121320343559642, -0.9121320343559642,
  1.7, 1.35, -0.9121320343559642, 1.8499999999999999, 1.2, -0.9121320343559642,
  1.9121320343559642, 1.2, -1, 1.7, 1.5, -0.7, -1.7, 1.4121320343559642, -0.7,
  -1.9121320343559642, 1.2, -0.7, -2, 1.4121320343559642, -0.9121320343559642,
  -1.7, 1.35, -0.9121320343559642, -1.8499999999999999, 1.2,
  -0.9121320343559642, -1.9121320343559642, 1.2, -1, -1.7, -1.5, -0.7, -1.7,
  -1.4121320343559642, -0.7, -1.9121320343559642, -1.2, -0.7, -2,
  -1.4121320343559642, -0.9121320343559642, -1.7, -1.35, -0.9121320343559642,
  -1.8499999999999999, -1.2, -0.9121320343559642, -1.9121320343559642, -1.2, -1,
  -1.7, -1.5, -0.7, 1.7, -1.4121320343559642, -0.7, 1.9121320343559642, -1.2,
  -0.7, 2, -1.4121320343559642, -0.9121320343559642, 1.7, -1.35,
  -0.9121320343559642, 1.8499999999999999, -1.2, -0.9121320343559642,
  1.9121320343559642, -1.2, -1, 1.7, -1.2, 1, -1.7, -1.2, 1, 1.7, 1.2, 1, 1.7,
  1.2, 1, -1.7, 1.2, -1, 1.7, 1.2, -1, -1.7, -1.2, -1, -1.7, -1.2, -1, 1.7, 1.5,
  0.7, 1.7, 1.5, 0.7, -1.7, 1.5, -0.7, 1.7, 1.5, -0.7, -1.7, -1.5, 0.7, -1.7,
  -1.5, 0.7, 1.7, -1.5, -0.7, -1.7, -1.5, -0.7, 1.7, 1.2, 0.7, 2, -1.2, 0.7, 2,
  1.2, -0.7, 2, -1.2, -0.7, 2, 1.2, 0.7, -2, -1.2, 0.7, -2, 1.2, -0.7, -2, -1.2,
  -0.7, -2,
];
let normals = [
  1, 0, 0, 0.7071067811865476, 0, 0.7071067811865475, 0, 0, 1,
  0.7071067811865476, 0.7071067811865475, 0, 0.5000000000000001,
  0.7071067811865475, 0.5, 4.329780281177467e-17, 0.7071067811865475,
  0.7071067811865476, 0, 1, 0, 1, 0, 0, 0.7071067811865476, 0,
  -0.7071067811865475, 0, 0, -1, 0.7071067811865476, 0.7071067811865475, 0,
  0.5000000000000001, 0.7071067811865475, -0.5, 4.329780281177467e-17,
  0.7071067811865475, -0.7071067811865476, 0, 1, 0, -1, 0, 0,
  -0.7071067811865476, 0, -0.7071067811865475, -0, 0, -1, -0.7071067811865476,
  0.7071067811865475, 0, -0.5000000000000001, 0.7071067811865475, -0.5,
  -4.329780281177467e-17, 0.7071067811865475, -0.7071067811865476, 0, 1, 0, -1,
  0, 0, -0.7071067811865476, 0, 0.7071067811865475, -0, 0, 1,
  -0.7071067811865476, 0.7071067811865475, 0, -0.5000000000000001,
  0.7071067811865475, 0.5, -4.329780281177467e-17, 0.7071067811865475,
  0.7071067811865476, 0, 1, 0, 1, 0, 0, 0.7071067811865476, 0,
  0.7071067811865475, 0, 0, 1, 0.7071067811865476, -0.7071067811865475, 0,
  0.5000000000000001, -0.7071067811865475, 0.5, 4.329780281177467e-17,
  -0.7071067811865475, 0.7071067811865476, 0, -1, 0, 1, 0, 0,
  0.7071067811865476, 0, -0.7071067811865475, 0, 0, -1, 0.7071067811865476,
  -0.7071067811865475, 0, 0.5000000000000001, -0.7071067811865475, -0.5,
  4.329780281177467e-17, -0.7071067811865475, -0.7071067811865476, 0, -1, 0, -1,
  0, 0, -0.7071067811865476, 0, -0.7071067811865475, -0, 0, -1,
  -0.7071067811865476, -0.7071067811865475, 0, -0.5000000000000001,
  -0.7071067811865475, -0.5, -4.329780281177467e-17, -0.7071067811865475,
  -0.7071067811865476, 0, -1, 0, -1, 0, 0, -0.7071067811865476, 0,
  0.7071067811865475, -0, 0, 1, -0.7071067811865476, -0.7071067811865475, 0,
  -0.5000000000000001, -0.7071067811865475, 0.5, -4.329780281177467e-17,
  -0.7071067811865475, 0.7071067811865476, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
  0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 1, -0, 0, 1, 0, 0, 1, -0,
  0, 1, 0, 0, -1, -0, 0, -1, 0, 0, -1, -0, 0, -1,
];
let uvs = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];
let indices = [
  56, 57, 58, 56, 58, 59, 60, 62, 61, 60, 63, 62, 64, 66, 65, 65, 66, 67, 68,
  70, 69, 69, 70, 71, 72, 73, 74, 73, 75, 74, 76, 78, 77, 77, 78, 79, 0, 3, 1,
  1, 3, 4, 1, 4, 2, 2, 4, 5, 3, 6, 4, 4, 6, 5, 7, 8, 10, 8, 11, 10, 8, 9, 11, 9,
  12, 11, 10, 11, 13, 11, 12, 13, 14, 17, 15, 15, 17, 18, 15, 18, 16, 16, 18,
  19, 17, 20, 18, 18, 20, 19, 21, 22, 24, 22, 25, 24, 22, 23, 25, 23, 26, 25,
  24, 25, 27, 25, 26, 27, 28, 29, 31, 29, 32, 31, 29, 30, 32, 30, 33, 32, 31,
  32, 34, 32, 33, 34, 35, 38, 36, 36, 38, 39, 36, 39, 37, 37, 39, 40, 38, 41,
  39, 39, 41, 40, 42, 43, 45, 43, 46, 45, 43, 44, 46, 44, 47, 46, 45, 46, 48,
  46, 47, 48, 49, 52, 50, 50, 52, 53, 50, 53, 51, 51, 53, 54, 52, 55, 53, 53,
  55, 54, 0, 1, 28, 1, 29, 28, 1, 2, 29, 2, 30, 29, 7, 35, 8, 8, 35, 36, 8, 36,
  9, 9, 36, 37, 14, 15, 42, 15, 43, 42, 15, 16, 43, 16, 44, 43, 21, 49, 22, 22,
  49, 50, 22, 50, 23, 23, 50, 51, 2, 5, 23, 5, 26, 23, 5, 6, 26, 6, 27, 26, 9,
  16, 12, 12, 16, 19, 12, 19, 13, 13, 19, 20, 30, 51, 33, 33, 51, 54, 33, 54,
  34, 34, 54, 55, 37, 40, 44, 40, 47, 44, 40, 41, 47, 41, 48, 47, 0, 7, 3, 3, 7,
  10, 3, 10, 6, 6, 10, 13, 14, 21, 17, 17, 21, 24, 17, 24, 20, 20, 24, 27, 28,
  31, 35, 31, 38, 35, 31, 34, 38, 34, 41, 38, 42, 45, 49, 45, 52, 49, 45, 48,
  52, 48, 55, 52,
];

const size = new Vec3(3, 2, 4).multiplyScalar(0.5);
const minPos = new Vec3(-size.x, -size.y, -size.z);
const maxPos = new Vec3(size.x, size.y, size.z);
const boundingRadius = Math.sqrt(
  size.x * size.x + size.y * size.y + size.z * size.z
);

export const CubeMesh = utils.MeshUtils.createMesh({
  positions,
  normals,
  uvs,
  indices,
  minPos,
  maxPos,
  boundingRadius,
});