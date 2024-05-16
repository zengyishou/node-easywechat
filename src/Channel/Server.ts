'use strict';

import ServerRequestInterface from '../Core/Http/Contracts/ServerRequestInterface';
import BaseServer from '../OfficialAccount/Server';
import { ServerHandlerClosure } from '../Types/global';
import Message from './Message';

class Server extends BaseServer
{
  /**
   * 添加普通消息处理器
   * @deprecated 视频号小店不支持普通消息
   */
  addMessageListener(): this {
    return this;
  }

};

interface Server {
  /**
   * 从后添加处理器
   * @param handler
   */
  with(next: ServerHandlerClosure<Message>): this;
  /**
   * 从后添加处理器
   * @param handler
   */
  withHandler(next: ServerHandlerClosure<Message>): this;
  /**
   * 从前添加处理器
   * @param handler
   */
  prepend(next: ServerHandlerClosure<Message>): this;
  /**
   * 从前添加处理器
   * @param handler
   */
  prependHandler(next: ServerHandlerClosure<Message>): this;
  /**
   * 删除处理器
   * @param handler
   */
  without(next: ServerHandlerClosure<Message>): this;
  /**
   * 删除处理器
   * @param handler
   */
  withoutHandler(next: ServerHandlerClosure<Message>): this;
  /**
   * 添加事件消息处理器
   *
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
   *
   * @param event
   * @param handler
   */
  addEventListener(event: string, handler: ServerHandlerClosure<Message>): this;
  /**
   * 获取来自微信服务器的推送消息
   * @param request 未设置该参数时，则从当前服务端收到的请求中获取
   */
  getRequestMessage(request: ServerRequestInterface): Promise<Message>;
}

export = Server;
