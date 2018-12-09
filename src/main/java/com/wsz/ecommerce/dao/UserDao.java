package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.ReceiverInfo;
import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserDao {
    User getUserById(@Param("userId") int userId);
    //如果该用户存在就返回1，如果不存在就是0
    int ifUserExist(@Param("userAccount") String userAccount,@Param("userPassword") String userPassword);
    //如果返回行数是1就再找出用户id
    int loginFindUserId(@Param("userAccount") String userAccount,@Param("userPassword") String userPassword);
    //利用用户Id查找基本信息，不要返回敏感信息,数据未加密
    UserBasicInfo findUserBasicInfoById(@Param("userId") int userId);
    //如果有该用户名，返回count应该等于1，否则等于0
    int findAccount(@Param("userAccount") String userAccount);
    //如果有邮箱，返回count应该等于1，否则等于0
    int findEmail(@Param("userEmail") String userEmail);
    //如果有该电话号码，返回count应该等于1，否则等于0
    int findPhone(@Param("userPhone") String userPhone);
    //将该注册用户注册,返回值为Int
    int userRegister(User user);
}
