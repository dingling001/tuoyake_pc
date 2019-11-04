const Club = [
  {
    path: '/club',
    meta: {
      cur: 3,
      title: "电竞俱乐部",
      building:false,
    },
    component: () => import('../../pages/club/club'),
  }
]
export default [
  ...Club
]
