package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.ReceiverInfo;
import com.wsz.ecommerce.domain.OrderCheck;
import com.wsz.ecommerce.service.AddressService;
import com.wsz.ecommerce.service.CommodityService;
import com.wsz.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private CommodityService commodityService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/buy")
    @ResponseBody
    public Map payOrder(@RequestParam("id") Integer id, @RequestParam("thingsNumber") int amount) {
        Map map = new HashMap();
        // 到时候改成userBasicInfo里的id
        List<ReceiverInfo> receiverInfo = addressService.findReceiverInfoById(1);
        map.put("orderInfo",commodityService.getOrderInfo(id, amount));
        map.put("receiverInfo",receiverInfo);
        return map;
    }

    @PostMapping("/delete")
    @ResponseBody
    public void delete(@RequestParam("addressId") int addressId) {
        addressService.deleteReceiverInfoById(addressId);
    }

    @PostMapping("/update")
    @ResponseBody
    public void update(@RequestBody ReceiverInfo receiverInfo) {
        addressService.updateReceiverInfoById(receiverInfo);
    }

    @PostMapping("/insert")
    @ResponseBody
    public Map insert(@RequestParam("userName") String userName, @RequestParam("userAddress") String userAddress, @RequestParam("userPhone") String userPhone) {
        Map map = new HashMap();
        addressService.insertReceiverInfo(1,userName,userAddress,userPhone); //gai
        List<ReceiverInfo> receiverInfo = addressService.findReceiverInfoById(1);
        map.put("receiverInfo",receiverInfo);
        return map;
    }

    @PostMapping("/pay")
    @ResponseBody
    public String payment(@RequestBody OrderCheck orderCheck) {
        String orderId = orderService.setOrderId(orderCheck.getUserId());
        orderService.orderGenerate(orderId, orderCheck);
        return orderId;
    }

    @GetMapping("/status")
    @ResponseBody
    public Map checkOrderInfo(@RequestParam("orderId") String orderId) {
        return orderService.getFinalOrderInfo(orderId);
    }
}
