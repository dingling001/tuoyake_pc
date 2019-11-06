export default [
  {
    path: "/wen",
    name: "wen",
    meta: {
      cur:6,
      showH: true,
      showF: false,
      needLogin: false
    },
    component: resolve => require(["../../components/wen"], resolve)
  },
];
