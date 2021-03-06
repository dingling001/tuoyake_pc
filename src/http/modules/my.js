import axios from "../api";
import $com from '../../bin/common'

/**
 * 获取广告位
 */
export const GetAdv = (type = 1) =>
  axios(
    "/api/index/getAdv", {
      type,
    },
    "POST",
    true
  );
/**
 * 获取个人信息
 */
export const GetUserInfo = () =>
  axios(
    "/api/user/getUserInfo", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 获取平台信息
 */
export const Platform = () =>
  axios(
    "/api/user/platform", {},
    "POST",
    true
  );
/**
 * 意见反馈
 */
export const SetFeedback = (content, images) =>
  axios(
    "/api/user/setFeedback", {
      token: $com.getCookies('user_tpc'),
      content,
      images,
    },
    "POST",
    true
  );

/**
 * 上传文件
 */
export const CommonUpload = (file) =>
  axios(
    "/api/common/upload", {
      file
    },
    "FORMDATA",
    true
  );


/**
 * 获取我的优惠券
 */
export const GetCouponList = (type = 1, page = 0) =>
  axios(
    "/api/coupon/getCouponList", {
      type,
      page,
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 获取我的优惠券详情
 */
export const GetCouponInfo = (id) =>
  axios(
    "/api/coupon/getCouponInfo", {
      id,
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 修改个人信息
 */
export const Profile = (avatar, nickname) =>
  axios(
    "/api/user/profile", {
      token: $com.getCookies('user_tpc'),
      avatar,
      nickname
    },
    "POST",
    true
  );
/**
 * 收藏列表
 */
// 类型:1=网吧,2=赛事,3=视频,4=套餐
export const CollectionIndex = (type, page, lat = 0, lng = 0, per_page) =>
  axios(
    "/api/collection/index", {
      token: $com.getCookies('user_tpc'),
      type,
      page,
      lat,
      lng,
      per_page
    },
    "POST",
    true
  );
/**
 * 我的积分
 */
export const ScoreIndex = () =>
  axios(
    "/api/score/index", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 积分规则说明
 */
export const ScoreRule = (goods_id, address_id) =>
  axios(
    "/api/score/rule", {
      token: $com.getCookies('user_tpc'),
      goods_id,
      address_id
    },
    "POST",
    true
  );
/**
 * 积分领取奖励
 */
export const ScoreReceive = () =>
  axios(
    "/api/score/receive", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );


/**
 * 报名规则说明
 */
export const SignRule = () =>
  axios(
    "/api/sign/rule", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );

/**
 * 奖品列表
 */
export const ScoreGoods = () =>
  axios(
    "/api/score/goods", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );

/**
 * 我的领取
 */
export const ScoreMyReceived = () =>
  axios(
    "/api/score/myReceived", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 领取奖品
 */
export const ScoreReceived = (goods_id, address_id) =>
  axios(
    "/api/score/receive", {
      token: $com.getCookies('user_tpc'),
      goods_id,
      address_id
    },
    "POST",
    true
  );
/**
 * 地址列表
 */
export const AddressIndex = () =>
  axios(
    "/api/address/index", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
/**
 * 报名获奖情况
 */
export const SignIndex = () =>
  axios(
    "/api/sign/index", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );

/**
 * 我的报名
 */
// :1=进行中,2=获奖,3=未获奖"
export const GetSignList = (page = 0, status = 1) =>
  axios(
    "/api/sign/getSignList", {
      token: $com.getCookies('user_tpc'),
      page,
      status
    },
    "POST",
    true
  );
// 我的订单
// 状态:0=全部,1=未付款,2=未使用,3=已使用,4=取消/退款
export const OrderIndex = (page = 0, status = 0) =>
  axios(
    "/api/order/index", {
      token: $com.getCookies('user_tpc'),
      page,
      status
    },
    "POST",
    true
  );
// 我的订单数量
export const OrderGetOrderNum = () =>
  axios(
    "/api/order/getOrderNum", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );

export const SignGoods = () =>
  axios(
    "/api/sign/goods", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );

export const SignAchievement = () =>
  axios(
    "/api/sign/achievement", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
export const signReceive = (goods_id, address_id) =>
  axios(
    "/api/sign/receive", {
      token: $com.getCookies('user_tpc'),
      goods_id,
      address_id
    },
    "POST",
    true
  );
// 添加地址
export const AddressSetAddress = (name, mobile, province, city, district, address, is_default, id) =>
  axios(
    "/api/address/setAddress", {
      name,
      mobile,
      province,
      city,
      district,
      address,
      is_default,
      id,
    },
    "POST",
    true
  );
// 默认地址
export const addressSingle = () =>
  axios(
    "/api/address/single", {
      token: $com.getCookies('user_tpc'),
    },
    "POST",
    true
  );
// 删除地址
export const addressDel = (id) =>
  axios(
    "/api/address/del", {
      token: $com.getCookies('user_tpc'),
      id
    },
    "POST",
    true
  );
//地址详情
export const AddressDetail = (id) =>
  axios(
    "/api/address/detail", {
      token: $com.getCookies('user_tpc'),
      id
    },
    "POST",
    true
  );

