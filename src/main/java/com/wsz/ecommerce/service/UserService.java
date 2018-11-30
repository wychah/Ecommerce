package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.util.LoginResult;

public interface UserService {
    User getUserById(int userId);
    LoginResult userLogin(String userAccount, String userPassword);
    UserBasicInfo getUserBasicInfo(int userId);
}
