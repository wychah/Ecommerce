package com.wsz.ecommerce.domain;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Collect {

    private Integer userId;

    private Integer commodityId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date collectTime;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(Integer commodityId) {
        this.commodityId = commodityId;
    }

    public Date getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(Date collectTime) {
        this.collectTime = collectTime;
    }
}
