package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.ListCommodities;
import com.wsz.ecommerce.domain.NewReceiverInfo;
import com.wsz.ecommerce.domain.ReceiverInfo;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.service.AddressService;
import com.wsz.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private OrderService orderService;

    /**
     * 订单确认页面，返回确认信息
     * @param userId
     * @param orderId
     * @return
     */
    @GetMapping("/show")
    @ResponseBody
    public Map showOrderInfo(@RequestParam("userId") int userId, @RequestParam("orderId") String orderId) {
        return orderService.showOrderInfo(userId, orderId);
    }

    /**
     * 删除地址
     * @param addressId
     */
    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestParam("addressId") int addressId) {
        addressService.deleteReceiverInfoById(addressId);
    }

    /**
     * 更新收货地址
     * @param receiverInfo
     */
    @PostMapping("/update")
    @ResponseBody
    public void update(@RequestBody ReceiverInfo receiverInfo) {
        addressService.updateReceiverInfoById(receiverInfo);
    }

    /**
     * 新增收货地址
     * @param newReceiverInfo
     * @return
     */
    @PostMapping("/insert")
    @ResponseBody
    public Map insert(@RequestBody NewReceiverInfo newReceiverInfo) {
        return addressService.insertAndFind(newReceiverInfo);
    }

    /**
     * 提交订单
     * @param orderCheck
     * @param request
     * @return
     */
    @PostMapping("/pay")
    @ResponseBody
    public String payment(@RequestBody OrderCheck orderCheck,HttpServletRequest request) {
        return orderService.orderGenerate(orderCheck,request);
    }

    /**
     * 展示订单状态
     * @param orderId
     * @return
     */
    @GetMapping("/status")
    @ResponseBody
    public Map checkOrderInfo(@RequestParam("orderId") String orderId) {
        return orderService.getFinalOrderInfo(orderId);
    }

    /**
     * 取消订单
     * @param orderId
     * @param userId
     * @return
     */
    @PostMapping("/cancel")
    @ResponseBody
    public Map cancelOrder(@RequestParam("orderId") String orderId,@RequestParam("userId") int userId) {
        return orderService.cancelOrder(orderId,userId);
    }

    /**
     * 多选购买商品
     * @param listCommodities
     * @param request
     * @return
     */
    @PostMapping("/buyCommodities")
    @ResponseBody
    public String listOrderGenerate(@RequestBody List<ListCommodities> listCommodities,HttpServletRequest request) {
        return orderService.fakeOrderList(listCommodities,request);
    }
}
