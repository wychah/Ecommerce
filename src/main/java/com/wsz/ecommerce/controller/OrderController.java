package com.wsz.ecommerce.controller;

import com.wsz.ecommerce.domain.NewReceiverInfo;
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
    private AddressService addressService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/buy")
    @ResponseBody
    public Map payOrder(@RequestParam("userId") int userId, @RequestParam("commodityId") Integer commodityId, @RequestParam("amount") int amount) {
        return orderService.showOrderInfo(userId, commodityId, amount);
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
    public Map insert(@RequestBody NewReceiverInfo newReceiverInfo) {
        return addressService.insertAndFind(newReceiverInfo);
    }

    @PostMapping("/pay")
    @ResponseBody
    public String payment(@RequestBody OrderCheck orderCheck) {
        return orderService.orderGenerate(orderCheck);
    }

    @GetMapping("/status")
    @ResponseBody
    public Map checkOrderInfo(@RequestParam("orderId") String orderId) {
        return orderService.getFinalOrderInfo(orderId);
    }
}
