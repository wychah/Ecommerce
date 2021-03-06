package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.CommodityCart;
import com.wsz.ecommerce.domain.User;
import com.wsz.ecommerce.domain.UserBasicInfo;
import com.wsz.ecommerce.domain.UserRegister;
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
    int userRegister(UserRegister userRegister);
    //返回用户购物车列表
    List<CommodityCart> getShoppingCart(@Param("userId") int userId);
    //更改用户基本信息
    int changeUserBasicInfo(@Param("userId") int userId,@Param("userName") String userName,@Param("userEmail")String userEmail);
    //修改用户头像
    int changeUserAvatar(@Param("userAvatar") String userAvatar,@Param("userId") int userId);
}
