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
  {
    path: "/search/:tkeyword",
    name: "search",
    meta: {
      cur:0,
      showH: true,
      showF: true,
      shownav:false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/search.vue"], resolve)
  },
];
