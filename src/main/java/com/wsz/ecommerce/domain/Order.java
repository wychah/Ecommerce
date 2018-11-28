package com.wsz.ecommerce.domain;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Order {

    private Integer orderId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date orderTime;

    private String orderStatus;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}
