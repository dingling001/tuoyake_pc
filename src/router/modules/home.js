export default [
  {
    path: "/wen",
    name: "wen",
    meta: {
      cur: 6,
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
      cur: 0,
      showH: true,
      showF: true,
      shownav: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/search.vue"], resolve)
  },
  {
    path: '/competitiondetail/:id',
    name: 'competitiondetail',
    meta: {
      title: "电竞馆详情",
      index: 1,
      showH: true,
      showF: true,
      shownav: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/competitiondetail"], resolve)
  },
  {
    path: '/clubdetail',
    name: 'clubdetail',
    meta: {
      title: "俱乐部详情",
      index: 1,
      showF: false,
      showH: false
    },
    component: resolve => require(["../../pages/home/clubdetail"], resolve)
  },
  {
    path: '/schooldetail',
    name: 'schooldetail',
    meta: {
      title: "学院详情",
      index: 1,
      showF: false,
      showH: false
    },
    component: resolve => require(["../../pages/school/schooldetail"], resolve)
  },
  {
    path: '/taocan/:goods_id/:cid',
    name: 'taocan',
    meta: {
      title: "套餐详情",
      showH: true,
      showF: true,
      shownav: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/taocan"], resolve)
  },
  {
    path: '/gamedetail',
    name: 'gamedetail',
    meta: {
      title: "赛事详情",
      showH: true,
      showF: true,
      shownav: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/gamedetail"], resolve)
  },
  {
    path: '/apoint/:match_id',
    name: 'apoint',
    meta: {
      title: "赛事报名",
      showH: true,
      showF: true,
      shownav: false,
      needLogin: false
    },
    component: resolve => require(["../../pages/home/apoint"], resolve)
  },
  {
    path: '/videolist',
    name: 'videolist',
    meta: {
      title: "全部视频",
      index: 1,
      showF: true,
      showH: true,
      shownav:false
    },
    component: resolve => require(["../../pages/home/videolist"], resolve)
  },
  {
    path: '/videodetail',
    name: 'videodetail',
    meta: {
      title: "视频详情",
      index: 1,
      showF: true,
      showH: true,
      shownav:false
    },
    component: resolve => require(["../../pages/home/videodetail"], resolve)
  },
  {
    path: '/changecity/',
    name: 'changecity',
    meta: {
      title: "城市选择",
      index: 1,
      showF: true,
      showH: true,
      shownav:false
    },
    component: resolve => require(["../../components/changecity"], resolve)
  },
];
