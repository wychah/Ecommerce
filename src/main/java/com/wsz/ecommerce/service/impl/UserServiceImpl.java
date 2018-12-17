package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.OrderDao;
import com.wsz.ecommerce.dao.UserDao;
import com.wsz.ecommerce.domain.*;
import com.wsz.ecommerce.service.UserService;
import com.wsz.ecommerce.util.LoginResult;
import com.wsz.ecommerce.util.SuccessOrFail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public User getUserById(int userId) {
        return userDao.getUserById(userId);
    }

    @Override
    public LoginResult userLogin(String userAccount, String userPassword) {
        LoginResult loginResult = new LoginResult();
        int count = userDao.ifUserExist(userAccount,userPassword);
        int userId;
        if (count==0){
            userId = 0;
            loginResult.setLoginResult("loginFail");
            loginResult.setResultMsg("用户名或密码错误");
            loginResult.setUserId(userId);//登录失败时用户id置0
        }
        else{
            userId = userDao.loginFindUserId(userAccount, userPassword);//再次查出userId
            loginResult.setLoginResult("loginSuccess");
            loginResult.setResultMsg("用户基本信息已经存入seesion");
            loginResult.setUserId(userId);//登录成功时存入用户id
        }
        return loginResult;
    }

    @Override
    public UserBasicInfo getUserBasicInfo(int userId) {
        UserBasicInfo userBasicInfo = userDao.findUserBasicInfoById(userId);
        return userBasicInfo;
    }

    @Override
    public SuccessOrFail ifUserAccountRepeat(String userAccount) {
        SuccessOrFail successOrFail = new SuccessOrFail();
        successOrFail.setResult(userDao.findAccount(userAccount));
        return successOrFail;
    }

    @Override
    public SuccessOrFail ifUserEmailRepeat(String userEmail) {
        SuccessOrFail successOrFail = new SuccessOrFail();
        successOrFail.setResult(userDao.findEmail(userEmail));
        return successOrFail;
    }

    @Override
    public SuccessOrFail ifUserPhoneRepeat(String userPhone) {
        SuccessOrFail successOrFail = new SuccessOrFail();
        successOrFail.setResult(userDao.findPhone(userPhone));
        return successOrFail;
    }

    @Override
    public SuccessOrFail userRegister(UserRegister userRegister) {
        SuccessOrFail successOrFail = new SuccessOrFail();
        if(userDao.findPhone(userRegister.getUserPhone())==0&&userDao.findAccount(userRegister.getUserAccount())==0){
            userDao.userRegister(userRegister);
            if(userDao.findAccount(userRegister.getUserAccount())==1){
                successOrFail.setResult(1);
            }
        }
        else{
            successOrFail.setResult(0);
        }

        return successOrFail;
    }

    @Override
    public List<CommodityCart> getShoppingCart(int userId) {
        List<CommodityCart> commodityCarts = userDao.getShoppingCart(userId);
        return commodityCarts;
    }

    @Override
    public Map getUserOrder(int userId) {
        List<UserOrderInfo> userOrderInfosWaitPush = orderDao.getWaitPush(userId);
        List<UserOrderInfo> userOrderInfosWaitSend = orderDao.getWaitSend(userId);
        List<UserOrderInfo> userOrderInfoCompleted = orderDao.getCompleted(userId);
        Map map = new HashMap();
        map.put("waitPush",userOrderInfosWaitPush);
        map.put("waitSend",userOrderInfosWaitSend);
        map.put("completed",userOrderInfoCompleted);
        return map;
    }

    @Override
    public int userOrderDelete(String orderId) {
        int i = 0;
        int result=0;
        for (;i<3;i++){
            result = orderDao.orderDelete(orderId);
            if (result == 2) {
                break;
            }
        }
        return result;
    }
}
