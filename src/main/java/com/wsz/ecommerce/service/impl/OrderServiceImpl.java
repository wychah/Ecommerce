package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.AddressDao;
import com.wsz.ecommerce.dao.CommodityDao;
import com.wsz.ecommerce.dao.OrderDao;
import com.wsz.ecommerce.domain.*;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private CommodityDao commodityDao;

    /**
     * 生成订单编号
     * userId + 时间戳 + 时间戳长度
     *
     * 时间戳转换成日期
     * String ntime = sd.format(unixTimestamp * 1000);
     *
     * @param userId
     * @return
     */
    @Override
    public String setOrderId(int userId) {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sd.format(new Date());
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long unixTimestamp = date.getTime() / 1000;
        int length = String.valueOf(unixTimestamp).length();
        String orderId = userId + "" + unixTimestamp + "" + length;
        return orderId;
    }

    /**
     * 提交订单
     * @param orderCheck
     * @param request
     * @return
     */
    @Override
    public String orderGenerate(OrderCheck orderCheck, HttpServletRequest request) {
        if (orderDao.getOrderStatus(orderCheck.getOrderId()).equals("待提交")) {
            try {
                orderDao.updateOrder(orderCheck.getOrderId(),orderCheck.getAddressId(),"待发货",orderCheck.getOrderAmount(),new Date());
                logger.info("订单号:" + orderCheck.getOrderId() + "提交成功");
                return "订单提交成功";
            } catch (Exception e) {
                int backToCart = orderDao.backToCart(orderCheck.getUserId(),orderCheck.getCommodityId(),orderCheck.getAmount(),new Date());
                int deleteFakeOrder = orderDao.deleteFakeOrder(orderCheck.getUserId());
                if (backToCart == 0) {
                    orderDao.backToCart(orderCheck.getUserId(),orderCheck.getCommodityId(),orderCheck.getAmount(),new Date());
                    logger.info("订单号:" + orderCheck.getOrderId() + "退回购物车异常，已重试");
                }
                if (deleteFakeOrder == 0) {
                    orderDao.deleteFakeOrder(orderCheck.getUserId());
                    logger.info("订单号:" + orderCheck.getOrderId() + "删除无效订单异常，已重试");
                }
                commodityDao.commoditySold(orderCheck.getCommodityId(), commodityDao.getCommodityInventory(orderCheck.getCommodityId()) + orderCheck.getAmount());
                return "订单提交失败";
            }
        } else {
            return "订单已提交,请勿重复提交订单";
        }
    }

    /**
     * 生成假订单
     * @param orderId
     * @param userId
     * @param commodityId
     * @param amount
     * @param request
     * @return
     */
    @Override
    public String fakeOrderGenerate(String orderId, int userId, int commodityId, int amount,HttpServletRequest request) {
        int inventory = commodityDao.getCommodityInventory(commodityId);
        if (inventory > 0) {
            commodityDao.commoditySold(commodityId, inventory - amount);

            Order order = new Order();
            order.setOrderId(orderId);
            order.setUserId(userId);
            order.setOrderStatus("待提交");
            orderDao.insertOrder(order);

            SubOrder subOrder = new SubOrder();
            subOrder.setOrderId(orderId);
            subOrder.setCommodityId(commodityId);
            subOrder.setAmount(amount);
            orderDao.insertSubOrder(subOrder);

            HttpSession session = request.getSession();
            session.setAttribute("orderId",orderId);
            return "订单生成成功";
        } else {
            return "库存不足";
        }
    }

    /**
     * 返回订单完成信息
     * @param orderId
     * @return
     */
    @Override
    public Map getFinalOrderInfo(String orderId) {
        Map map = new HashMap();
        map.put("commodities",orderDao.findOrderCommodityInfo(orderId));
        map.put("orderInfo",orderDao.findOrderReceiverInfo(orderId));
        return map;
    }

    @Override
    public Map showOrderInfo(int userId, int commodityId, int amount, HttpServletRequest request) {
        Map map = new HashMap();
        HttpSession session = request.getSession();
        if (session.getAttribute("orderId") == null) {
            String orderId = setOrderId(userId);
            List<ReceiverInfo> receiverInfo = addressDao.findReceiverInfoById(userId);
            map.put("orderInfo",commodityDao.getOrderInfo(commodityId, amount));
            map.put("receiverInfo",receiverInfo);
            map.put("orderId",orderId);
            fakeOrderGenerate(orderId,userId,commodityId,amount,request);
        } else {
            String lastOrder = (String) session.getAttribute("orderId");
            List<ReceiverInfo> receiverInfo = addressDao.findReceiverInfoById(userId);
            map.put("orderInfo",commodityDao.getOrderInfo(commodityId, amount));
            map.put("receiverInfo",receiverInfo);
            map.put("orderId",lastOrder);
        }
        return map;
    }

    /**
     * 检验库存
     * @param commodityId
     * @param amount
     * @return
     */
    @Override
    public String checkCommodityInventory(int commodityId, int amount) {
        if (commodityDao.getCommodityInventory(commodityId) < amount) {
            return "库存不足";
        } else {
            return "可以购买";
        }
    }

    /**
     * 取消订单，还原库存
     * @param orderId
     * @return
     */
    @Override
    public Map cancelOrder(String orderId, int userId) {
        Map map = new HashMap();
        int affect = 0;
        List<OrderCommodityAmount> orderCommodityAmount = orderDao.getOrderCommodityAmount(orderId);
        for (int i = 0; i < orderCommodityAmount.size() ; i++) {
            int commodityInventory = commodityDao.getCommodityInventory(orderCommodityAmount.get(i).getCommodityId());
            commodityInventory = commodityInventory + orderCommodityAmount.get(i).getAmount();
            affect = commodityDao.recoverCommodityInventory(orderCommodityAmount.get(i).getCommodityId(),commodityInventory);
        }
        if (affect != 0) {
            int orderDelete = orderDao.orderDelete(orderId);
            if (orderDelete != 0) {
                List<UserOrderInfo> userOrderInfosWaitSend = orderDao.getWaitSend(userId);
                map.put("waitSend",userOrderInfosWaitSend);
                return map;
            } else {
                map.put("error","订单取消失败");
                return map;
            }
        } else {
            map.put("error","订单取消失败");
            return map;
        }
    }
}
