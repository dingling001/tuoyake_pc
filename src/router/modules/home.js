export default [
  {
    path: "/wen",
    name: "wen",
    meta: {
      footer: false,
      cur:6,
    },
    component: resolve => require(["../../components/wen"], resolve)
  },
];
