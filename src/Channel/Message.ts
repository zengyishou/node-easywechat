'use strict';

import BaseMessage from '../OfficialAccount/Message';

class Message extends BaseMessage {
}

interface Message {
  /**
   * 消息密文，兼容模式、安全模式才有
   */
  Encrypt?: string;

  /**
   * 开发者微信号
   */
  ToUserName?: string;

  /**
   * 发送方帐号 OpenId
   */
  FromUserName?: string;

  /**
   * 消息创建时间
   */
  CreateTime?: number;

  /**
   * 消息类型
   * - `event` 事件
   */
  MsgType?: string;

  /**
   * 事件类型
   * - `product_category_audit` 类目审核结果
   * - `product_spu_audit` 商品审核
   * - `product_spu_listing` 商品上下架
   * - `product_spu_update` 商品更新
   * - `channels_ec_order_new` 订单下单
   * - `channels_ec_order_cancel` 订单取消
   * - `channels_ec_order_pay` 订单支付成功
   * - `channels_ec_order_deliver` 订单发货
   * - `channels_ec_order_confirm` 订单确认收货
   * - `channels_ec_order_settle` 订单结算成功
   * - `channels_ec_order_ext_info_update` 订单其它信息更新
   * - `channels_ec_acct_notify` 结算账户变更
   * - `channels_ec_withdraw_notify` 提现
   * - `qrcode_status` 提现二维码
   * - `channels_ec_coupon_receive` 领取优惠券
   * - `channels_ec_coupon_create` 创建优惠券
   * - `channels_ec_coupon_delete` 删除优惠券
   * - `channels_ec_coupon_expire` 优惠券过期
   * - `channels_ec_coupon_info_change` 更新优惠券信息
   * - `channels_ec_coupon_invalid` 作废优惠券
   * - `channels_ec_user_coupon_expire` 用户优惠券过期
   * - `channels_ec_user_coupon_unuse` 优惠券返还
   * - `channels_ec_user_coupon_use` 优惠券核销
   * - `channels_ec_aftersale_update` 售后单更新
   * - `channels_ec_complaint_update` 纠纷更新
   * - `channels_ec_phonenumberpool_update` 虚拟号更新
   * - `head_supplier_item_update` 团长商品变更
   * - `channels_ec_brand` 品牌资质
   * - `channels_ec_vip_join` 用户加入会员
   * - `channels_ec_vip_close` 用户注销会员
   * - `channels_ec_vip_grade_info_update` 用户等级信息更新
   * - `channels_ec_vip_task_award` 用户获得任务奖励
   * - `channels_ec_vip_score_update` 用户积分更新
   * - `channels_ec_vip_score_exchange` 用户积分兑换
   * @scope MsgType='event'
   */
  Event?: string;

  /**
   * 类目审核事件主体
   * @scope Event='product_category_audit'
   */
  ProductCategoryAudit?: {
    /**
     * 审核id
     */
    audit_id: string;
    /**
     * 审核状态。1: 审核中, 2: 审核拒绝, 3: 审核通过, 12: 主动取消申请单
     */
    status: number;
    /**
     * 原因
     */
    reason: string;
  };

  /**
   * 商品审核事件主体
   * @scope Event='product_spu_audit'
   */
  ProductSpuAudit?: {
    /**
     * 商品ID
     */
    product_id: string;
    /**
     * 审核状态。2:审核不通过；3:审核通过；4:撤销审核
     */
    status: number;
    /**
     * 原因
     */
    reason: string;
  };

  /**
   * 商品上下架事件主体
   * @scope Event='product_spu_listing'
   */
  ProductSpuListing?: {
    /**
     * 商品ID
     */
    product_id: string;
    /**
     * 状态。5:上架；11:自主下架；13:系统下架；14:保证金违规下架；15:品牌到期下架; 20:封禁下架
     */
    status: number;
    /**
     * 原因
     */
    reason: string;
  };

  /**
   * 商品更新事件主体
   * @scope Event='product_spu_update'
   */
  ProductSpuUpdate?: {
    /**
     * 商品ID
     */
    product_id: string;
    /**
     * 操作。0: 更新; 1: 新增; 2: 删除
     */
    status: number;
  };

  /**
   * 订单下单事件主体
   * @scope Event='channels_ec_order_new' | 'channels_ec_order_cancel' | 'channels_ec_order_pay' | 'channels_ec_order_deliver' | 'channels_ec_order_confirm' | 'channels_ec_order_settle' | 'channels_ec_order_ext_info_update'
   */
  order_info?: {
    /**
     * 订单号
     */
    order_id: string;

    /**
     * 取消原因。1:用户取消；2:超时取消；3:全部商品售后完成,订单取消
     * @scope Event='channels_ec_order_cancel'
     */
    cancel_type?: number;

    /**
     * 付款时间戳
     * @scope Event='channels_ec_order_pay'
     */
    pay_time?: number;

    /**
     * 发货状态。0:尚未全部发货；1:全部商品发货完成
     * @scope Event='channels_ec_order_deliver'
     */
    finish_delivery?: number;

    /**
     * 确认方式。1:用户确认收货；2:超时自动确认收货
     * @scope Event='channels_ec_order_confirm'
     */
    confirm_type?: number;

    /**
     * 结算时间戳
     * @scope Event='channels_ec_order_settle'
     */
    settle_time?: number;

    /**
     * 事件类型。
     * - 1：联盟佣金信息
     * - 2：商家主动地址修改或通过用户修改地址申请
     * - 3：商家备注修改
     * - 4：用户发起申请修改收货地址，特殊条件下需要商家审批
     * - 5：订单虚拟号码信息更新
     * - 6：分享员信息更新
     * - 7：用户催发货
     * @scope Event='channels_ec_order_ext_info_update'
     */
    type?: number;
  };

  /**
   * 结算账户变更事件主体
   * @scope Event='channels_ec_acct_notify'
   */
  account_info?: {
    /**
     * 结算账户变更事件, 1.修改结算账户
     */
    event: number;
  };

  /**
   * 提现事件主体
   * @scope Event='channels_ec_withdraw_notify'
   */
  withdraw_info?: {
    /**
     * 提现单号
     */
    withdraw_id: string;
    /**
     * 提现事件。1.发起提现，生成二维码 2.扫码验证成功，申请提现 3.提现成功 4.提现失败
     */
    event: number;
  };

  /**
   * 提现二维码事件主体
   * @scope Event='qrcode_status'
   */
  qrcode_info?: {
    /**
     * 二维码ticket
     */
    ticket: string;
    /**
     * 二维码状态,1.已确认 2.已取消 3.已失效 4.已扫码
     */
    status: number;
    /**
     * 扫码者身份, 0.非管理员 1.管理员
     */
    scan_user_type: number;
  };

  /**
   * 领取优惠券事件主体
   * @scope Event='channels_ec_coupon_receive'
   */
  receive_info?: {
    /**
     * 领取的优惠券ID
     */
    coupon_id: string;
    /**
     * 生成的用户券ID
     */
    user_coupon_id: string;
    /**
     * 领券时间
     */
    receive_time: number;
  };

  /**
   * 优惠券信息主体
   * @scope Event='channels_ec_coupon_create' | 'channels_ec_coupon_delete' | 'channels_ec_coupon_expire' | 'channels_ec_coupon_info_change' | 'channels_ec_coupon_invalid' | 'channels_ec_user_coupon_unuse'
   */
  coupon_info?: {
    /**
     * 优惠券ID
     */
    coupon_id: string;
    /**
     * 创建时间
     * @scope Event='channels_ec_coupon_create'
     */
    create_time?: string;
    /**
     * 删除时间
     * @scope Event='channels_ec_coupon_delete'
     */
    delete_time?: string;
    /**
     * 过期时间
     * @scope Event='channels_ec_coupon_expire'
     */
    expire_time?: string;
    /**
     * 更新时间
     * @scope Event='channels_ec_coupon_info_change'
     */
    change_time?: string;
    /**
     * 作废时间
     * @scope Event='channels_ec_coupon_invalid'
     */
    invalid_time?: string;
    /**
     * 用户券ID
     * @scope Event='channels_ec_user_coupon_unuse'
     */
    user_coupon_id?: string;
    /**
     * 用券的订单ID
     * @scope Event='channels_ec_user_coupon_unuse'
     */
    order_id?: string;
    /**
     * 返还时间
     * @scope Event='channels_ec_user_coupon_unuse'
     */
    unuse_time?: string;
  };

  /**
   * 用户优惠券过期信息主体
   * @scope Event='channels_ec_user_coupon_expire'
   */
  user_coupon_info?: {
    /**
     * 优惠券ID
     */
    coupon_id: string;
    /**
     * 用户券ID
     */
    user_coupon_id: string;
    /**
     * 过期时间
     */
    expire_time: string;
  };

  /**
   * 优惠券核销信息主体
   * @scope Event='channels_ec_user_coupon_use'
   */
  use_info?: {
    /**
     * 优惠券ID
     */
    coupon_id: string;
    /**
     * 用户券ID
     */
    user_coupon_id: string;
    /**
     * 用券的订单ID
     */
    order_id: string;
    /**
     * 核销时间
     */
    use_time: string;
  };

  /**
   * 售后单更新信息主体
   * @scope Event='channels_ec_aftersale_update'
   */
  finder_shop_aftersale_status_update?: {
    /**
     * 售后单状态
     * @see [状态值及说明](https://developers.weixin.qq.com/doc/channels/API/aftersale/ec_callback/channels_ec_aftersale_update.html#枚举-EcAftersaleInfoStatus)
     */
    status: string;
    /**
     * 小店售后单号
     */
    after_sale_order_id: string;
    /**
     * 小店订单号
     */
    order_id: string;
  };

  /**
   * 纠纷更新信息主体
   * @scope Event='channels_ec_complaint_update'
   */
  finder_shop_complaint?: {
    /**
     * 售后单状态
     * @see [状态值及说明](https://developers.weixin.qq.com/doc/channels/API/complaint/callback/channels_ec_complaint_update.html#枚举-EcComplaintInfoStatus)
     */
    complaint_status: string;
    /**
     * 小店售后单号
     */
    after_sale_order_id: string;
    /**
     * 纠纷单号
     */
    complaint_id: string;
    /**
     * 小店订单号
     */
    order_id: string;
  };

  /**
   * 虚拟号更新信息主体
   * @scope Event='channels_ec_phonenumberpool_update'
   */
  update_info?: {
    /**
     * 状态。1:虚拟号池有更新，需重新获取
     */
    status: string;
  };

  /**
   * 团长商品变更信息主体
   * @scope Event='head_supplier_item_update'
   */
  item_info?: {
    /**
     * 商品变更类型，1：新增商品；2：更新商品
     */
    event_type: number;
    /**
     * 团长商品所属小店appid
     */
    appid: string;
    /**
     * 商品id
     */
    product_id: string;
    /**
     * 商品版本号
     */
    version: string;
    /**
     * 商品更新字段，当event_type = 2时有值。
     *
     * commission_ratio、service_ratio、status、active_time分别表示佣金、服务费、商品状态和合作生效时间有变更
     */
    update_fields: string[];
  };

  /**
   * 品牌资质信息主体
   * @scope Event='channels_ec_brand'
   */
  BrandEvent?: {
    /**
     * 品牌库中的品牌编号
     */
    brand_id: string;
    /**
     * 回调状态
     * @see [状态值及说明](https://developers.weixin.qq.com/doc/channels/API/brand/callback/brand_event.html#回调状态枚举-status)
     */
    status: string;
    /**
     * 审核原因
     */
    reason?: string;
  };

  /**
   * 会员信息主体
   * @scope Event='channels_ec_vip_join' | 'channels_ec_vip_close' | 'channels_ec_vip_grade_info_update' | 'channels_ec_vip_score_update'
   */
  user_info?: {
    /**
     * 加入时间戳，单位为秒
     * @scope Event='channels_ec_vip_join'
     */
    join_time?: number;
    /**
     * 手机号码
     * @scope Event='channels_ec_vip_join'
     */
    phone_number?: string;
    /**
     * 注销时间戳，单位为秒
     * @scope Event='channels_ec_vip_close'
     */
    close_time?: string;
    /**
     * 当前会员等级
     * @scope Event='channels_ec_vip_grade_info_update'
     */
    grade?: number;
    /**
     * 当前等级经验值
     * @scope Event='channels_ec_vip_grade_info_update'
     */
    experience_value?: number;
    /**
     * 当前积分
     * @scope Event='channels_ec_vip_score_update'
     */
    score?: number;
    /**
     * 本次改动积分
     * @scope Event='channels_ec_vip_score_update'
     */
    delta_score?: number;
    /**
     * 流水类型
     * @scope Event='channels_ec_vip_score_update'
     * @see [类型值及说明](https://developers.weixin.qq.com/doc/channels/API/vip/callback/score/user_score_update.html#枚举-flow_type)
     */
    flow_type?: number;
  };

  /**
   * 会员信息主体
   * @scope Event='channels_ec_vip_task_award'
   */
  task_info?: {
    /**
     * 任务ID
     */
    task_id: number;
    /**
     * 任务名称
     */
    task_name: string;
    /**
     * 奖励
     */
    award_info: {
      /**
       * 奖励类型
       */
      award_type: number;
      /**
       * 奖励的优惠券ID
       */
      coupon_id: number;
      /**
       * 奖励的积分
       */
      gain_score: number;
    };
  };

  /**
   * 用户积分兑换信息主体
   * @scope Event='channels_ec_vip_score_exchange'
   */
  exchange_info?: {
    /**
     * 兑换积分
     */
    pay_score: number;
    /**
     * 兑换类型。1:优惠券，2:商品
     */
    score_item_type: number;
    /**
     * 兑换的优惠券
     * @scope score_item_type=1
     */
    coupon_info?: {
      /**
       * 优惠券ID
       */
      related_coupon_id: number;
    };
    /**
     * 兑换的商品
     * @scope score_item_type=2
     */
    product_info?: {
      /**
       * 商品ID
       */
      related_product_id: number;
    };
  };

};

export = Message;
