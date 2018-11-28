package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.User;
import org.apache.ibatis.annotations.Param;

public interface UserDao {
    User getUserById(@Param("userId") int userId);
}
