import axios from "../api";

import  $com from '../../bin/common'


/**
 * 获取平台配置
 */
export const getConfig = () =>
  axios(
    "/api/common/getConfig", {
    },
    "POST",
    true
  );
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
export const CollegeIndex = (page = 0, category_id, city, keyword = '',district,circle) =>
  axios(
    "/api/college/index", {
      page,
      category_id,
      city,
      keyword,
      district,
      circle
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
      token:  $com.getCookies('user_tpc'),
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
      token:  $com.getCookies('user_tpc'),
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
      token: $com.getCookies('user_tpc'),
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
      token: $com.getCookies('user_tpc'),
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
      token: $com.getCookies('user_tpc'),
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
      token: $com.getCookies('user_tpc'),
      video_id,
    },
    "POST",
    true
  );
/**
 * 获取赛事报名
 */
export const SetMatchSign = (match_id,username,mobile,team_name,email,remark) =>
  axios(
    "/api/index/setMatchSign", {
      match_id,
      username,
      mobile,
      team_name,
      email,
      remark,
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 推荐门店
 */
export const GetRecommendBarByGoods = (goods_id) =>
  axios(
    "/api/index/getRecommendBarByGoods", {
      goods_id,
    },
    "POST",
    true
  );
/**
 * 赛事列表
 */
	// integer	是	状态:1=精选赛事,2=进行赛事,3=过往赛事

export const GetMatchList = (bar_id,status=1) =>
  axios(
    "/api/index/getMatchList", {
      bar_id,
      status
    },
    "POST",
    true
  );
