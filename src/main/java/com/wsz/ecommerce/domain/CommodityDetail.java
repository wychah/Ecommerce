package com.wsz.ecommerce.domain;

/***
 * 商品详情页面
 */
public class CommodityDetail {
    private Integer commodityId;
    private String commodityTitle;
    private int commodityPrice;
    private int commodityInventory;
    private String commodityPicture;
    private String attributeName;
    private String attributeValue;

    public Integer getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(Integer commodityId) {
        this.commodityId = commodityId;
    }

    public String getCommodityTitle() {
        return commodityTitle;
    }

    public void setCommodityTitle(String commodityTitle) {
        this.commodityTitle = commodityTitle;
    }

    public int getCommodityPrice() {
        return commodityPrice;
    }

    public void setCommodityPrice(int commodityPrice) {
        this.commodityPrice = commodityPrice;
    }

    public int getCommodityInventory() {
        return commodityInventory;
    }

    public void setCommodityInventory(int commodityInventory) {
        this.commodityInventory = commodityInventory;
    }

    public String getCommodityPicture() {
        return commodityPicture;
    }

    public void setCommodityPicture(String commodityPicture) {
        this.commodityPicture = commodityPicture;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public String getAttributeValue() {
        return attributeValue;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }
}
