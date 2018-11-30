package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.UserDao;
import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.service.UserService;
import com.wsz.ecommerce.util.LoginResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

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
}
