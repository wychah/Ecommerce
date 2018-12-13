package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.CartDao;
import com.wsz.ecommerce.dao.UserDao;
import com.wsz.ecommerce.domain.CommodityCart;
import com.wsz.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Override
    public List<CommodityCart> deleteCommodity(int userId, int commodityId) {
        cartDao.deleteShoppingCart(userId,commodityId);
        List<CommodityCart> commodityCarts=userDao.getShoppingCart(userId);
        return commodityCarts;
    }

    @Override
    public List<CommodityCart> addCommodity(int userId, int commodityId,int amount) {
        Date addTime = new Date();
        int exist = cartDao.ifexist(userId, commodityId);
        if(exist>0){
            int oldAmount = cartDao.findAmount(userId, commodityId);
            amount = oldAmount+amount;
            cartDao.updataCart(userId,commodityId,amount,addTime);
        }
        else{
            cartDao.addShoppingCart(userId,commodityId,amount,addTime);
        }
        List<CommodityCart> commodityCarts=userDao.getShoppingCart(userId);
        return commodityCarts;
    }
}
