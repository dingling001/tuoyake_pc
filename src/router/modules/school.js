const School = [
  {
    path: '/school',
    meta: {
      cur: 2,
      title: "电竞学院",
      building:false,
    },

    component: () => import('../../pages/school/school'),
  }
]
export default [
  ...School
]
