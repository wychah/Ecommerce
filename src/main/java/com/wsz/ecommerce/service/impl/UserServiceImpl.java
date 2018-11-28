package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.UserDao;
import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.service.UserService;
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
}
