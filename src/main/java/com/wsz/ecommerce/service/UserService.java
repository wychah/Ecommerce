package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.CommodityCart;
import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.domain.UserRegister;
import com.wsz.ecommerce.util.LoginResult;
import com.wsz.ecommerce.util.SuccessOrFail;

import java.util.List;
import java.util.Map;

public interface UserService {
    User getUserById(int userId);
    LoginResult userLogin(String userAccount, String userPassword);
    UserBasicInfo getUserBasicInfo(int userId);
    SuccessOrFail ifUserAccountRepeat(String userAccount);
    SuccessOrFail ifUserEmailRepeat(String userEmail);
    SuccessOrFail ifUserPhoneRepeat(String userPhone);
    SuccessOrFail userRegister(UserRegister userRegister);
    int userOrderDelete(String orderId);
    List<CommodityCart> getShoppingCart(int userId);
    Map getUserOrder(int userId);
}
