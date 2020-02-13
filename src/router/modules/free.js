export default [
  {
    path: "/free",
    name: "free",
    meta: {
      cur: 5,
      showH: true,
      showF: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/free/free.vue"], resolve)
  },
]
