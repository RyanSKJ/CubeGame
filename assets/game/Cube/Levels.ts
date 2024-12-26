import { Vec3 } from "cc";
export const Levels = [
  {
    Level: 1,          // 第1关
    Count: 3,          // 总物体数量：3组×3个相同
    Time: 5000,         // 通关时间限制（秒）
    DampTime: 2,       // 动画锁定时间
    TypeRands: 3,      // 类型数量（3种类型）
    Types: ['Prefab1', 'Prefab2', 'Prefab3'], // 指定预制体类型
    CustomOrder: [0, 1, 2, 1, 2, 0, 2, 0, 1], // 关卡 13 的特定顺序
    Rotations: [
      { axes: [Vec3.UNIT_X], angles: [0, 0, 0] },   // 物体0绕X轴旋转
      { axes: [Vec3.UNIT_Y], angles: [0, 0, 0] },   // 物体1绕Y轴旋转
      { axes: [Vec3.UNIT_Z], angles: [0, 0, 0] },   // 物体2绕Z轴旋转
  ],
  },
  {
    Level: 2,          // 第2关
    Count: 3,          // 3组×3个相同
    Time: 5000,
    DampTime: 2,
    TypeRands: 3,      // 类型数量：3种类型
    Types: ['Prefab1', 'Prefab2', 'Prefab3'],
    CustomOrder: [0, 1, 2, 1, 2, 0, 2, 0, 1], // 关卡 13 的特定顺序
    Rotations: [
        { axes: [Vec3.UNIT_X], angles: [0, 45, 90] },   // 物体0绕X轴旋转
        { axes: [Vec3.UNIT_Y], angles: [0, 45, 90] },   // 物体1绕Y轴旋转
        { axes: [Vec3.UNIT_Z], angles: [0, 45, 90] },   // 物体2绕Z轴旋转
    ],
},
{
    Level: 3,          // 第3关
    Count: 4,          // 4组×3个相同
    Time: 5000,
    DampTime: 2,
    TypeRands: 4,      // 类型数量：4种类型
    Types: ['Prefab2', 'Prefab3', 'Prefab4'],
    CustomOrder: [0, 1, 2, 2, 1, 0, 1, 0, 2],
    Rotations: [
        { axes: [Vec3.UNIT_X, Vec3.UNIT_Y], angles: [0, 45, 90] },      // 物体0绕X、Y轴旋转
        { axes: [Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [0, 45, 90] },      // 物体1绕Y、Z轴旋转
        { axes: [Vec3.UNIT_X, Vec3.UNIT_Z], angles: [0, 45, 90] } // 物体3绕X、Y、Z轴旋转
    ],
},
  {
    Level: 4,          // 第4关
    Count: 4,         // 4组×3个相同
    Time: 5000,
    DampTime: 2,
    TypeRands: 4,
    Types: ['Prefab3', 'Prefab4', 'Prefab5'],
    CustomOrder: [0, 2, 1, 1, 0, 2, 2, 1, 0],
    Rotations: [
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [0, 60, 120] }, // 所有物体都绕XYZ旋转
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [0, 60, 120] }, // 所有物体都绕XYZ旋转
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [0, 60, 120] }, // 所有物体都绕XYZ旋转
  ],
  },
  {
    Level: 5,          // 第5关
    Count: 5,         // 5组×3个相同
    Time: 5000,
    DampTime: 2,
    TypeRands: 5,      // 类型数量：5种类型
    Types: ['Prefab1', 'Prefab6', 'Prefab4'],
    CustomOrder: [0, 2, 1, 2, 1, 0, 1, 2, 0 ],
    Rotations: [
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [-60, 45, 90] }, // 所有物体都绕XYZ旋转
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [-60, 45, 90] }, // 所有物体都绕XYZ旋转
      { axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z], angles: [-60, 45, 90] }, // 所有物体都绕XYZ旋转
  ],
  },
];