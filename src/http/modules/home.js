import axios from "../api";


/**
 * 获取首页轮播图
 */
export const GetSlideList = (city) =>
  axios(
    "/api/index/getSlideList", {
      city
    },
    "POST",
    true
  );
/**
 * 获取首页列表接口
 */
export const GetBarList = (page = 1, keyword, city, lat = 0, lng = 0, recommend = 0, label, district, circle, per_page,order) =>
  axios(
    "/api/index/getBarList", {
      page,
      keyword,
      city,
      lat,
      lng,
      recommend,
      label,
      district,
      circle,
      per_page,
      order
    },
    "POST",
    true
  );
/**
 * 获取服务标签
 */
export const GetLabelList = () =>
  axios(
    "/api/index/getLabelList", {},
    "POST",
    true
  );

/**
 * 根据城市换id
 */
export const GetAreaPidByName = (name = '北京市') =>
  axios(
    "/api/common/getAreaPidByName", {name},
    "POST",
    true
  );
/**
 * 根据城市id，获取区列表
 */
export const GetAreaListTree = (pid = 2) =>
  axios(
    "/api/common/getAreaListTree", {pid},
    "POST",
    true
  );
/**
 * 获取俱乐部分类
 */
export const Category = () =>
  axios(
    "/api/club/category", {},
    "POST",
    true
  );
/**
 * 获取俱乐部列表
 */
export const ClubIndex = (page = 0, category_id, city, keyword = '') =>
  axios(
    "/api/club/index", {
      page,
      category_id,
      city,
      keyword
    },
    "POST",
    true
  );
/**
 * 获取俱乐部列表详情
 */
export const ClubDetail = (club_id) =>
  axios(
    "/api/club/detail", {
      club_id,
    },
    "POST",
    true
  );

/**
 * 获取学院分类
 */
export const CollegeCategory = () =>
  axios(
    "/api/college/category", {},
    "POST",
    true
  );
/**
 * 获取学院列表
 */
export const CollegeIndex = (page = 0, category_id, city, keyword = '') =>
  axios(
    "/api/college/index", {
      page,
      category_id,
      city,
      keyword
    },
    "POST",
    true
  );
/**
 * 获取俱乐部列表详情
 */
export const CollegeDetail = (college_id) =>
  axios(
    "/api/college/detail", {
      college_id,
    },
    "POST",
    true
  );
/**
 * 获取俱乐部列表详情
 */
export const GetBarInfo = (id) =>
  axios(
    "/api/index/getBarInfo", {
      id,
      token: localStorage.user_tpc,
    },
    "POST",
    true
  );
/**
 * 获取俱乐部列表详情
 */
export const SetCollection = (type = 1, object_id) =>
  axios(
    "/api/collection/setCollection", {
      token: localStorage.user_tpc,
      type,
      object_id,
    },
    "POST",
    true
  );
/**
 * 获取俱乐部列表详情
 */
export const GetGoodsInfo = (goods_id) =>
  axios(
    "/api/index/getGoodsInfo", {
      token: localStorage.user_tpc,
      goods_id,
    },
    "POST",
    true
  );
/**
 * 获取赛事详情
 */
export const GetMatchInfo = (match_id) =>
  axios(
    "/api/index/getMatchInfo", {
      token: localStorage.user_tpc,
      match_id,
    },
    "POST",
    true
  );

/**
 * 获取视频列表
 */
export const GetVideoList = (match_id) =>
  axios(
    "/api/index/getVideoList", {
      token: localStorage.user_tpc,
      match_id,
    },
    "POST",
    true
  );
/**
 * 获取视频详情
 */
export const GetVideoInfo = (video_id) =>
  axios(
    "/api/index/getVideoInfo", {
      token: localStorage.user_tpc,
      video_id,
    },
    "POST",
    true
  );
