const Competition = [
  {
    path: '/competition',
    meta: {
      cur: 1,
      title: "电竞馆",
      building:false,
      showF: true,
      showH: true,
      needLogin: false
    },
    component: () => import('../../pages/competition/competition'),
  }
]
export default [
  ...Competition
]
