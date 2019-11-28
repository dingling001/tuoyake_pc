const Club = [
  {
    path: '/club',
    meta: {
      cur: 3,
      title: "电竞俱乐部",
      building:false,
      showF: true,
      showH: true,
      needLogin: false
    },
    component: () => import('../../pages/club/club'),
  },
  {
    path: '/clubdetail',
    name: 'clubdetail',
    meta: {
      title: "俱乐部详情",
      cur: 3,
      building:false,
      showF: true,
      showH: true,
      shownav:false,
      needLogin: false
    },
    component: resolve => require(["../../pages/club/clubdetail"], resolve)
  },
]
export default [
  ...Club
]
