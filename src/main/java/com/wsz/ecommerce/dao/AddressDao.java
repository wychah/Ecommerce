package com.wsz.ecommerce.dao;

import com.wsz.ecommerce.domain.ReceiverInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AddressDao {
    /**
     * 利用用户Id查找收货人信息
     * @param userId
     * @return
     */
    List<ReceiverInfo> findReceiverInfoById(@Param("userId") int userId);

    /**
     * 利用addressId删除用户收获信息
     * @param addressId
     */
    void deleteReceiverInfoById(@Param("addressId") int addressId);

    /**
     * 根据addressId更新收货信息
     * @param addressId
     * @param userName
     * @param userAddress
     * @param userPhone
     */
    void updateReceiverInfoById(@Param("addressId") int addressId, @Param("userName") String userName, @Param("location") String userAddress, @Param("receiverPhone") String userPhone);

    /**
     * 新增用户收货地址
     * @param userName
     * @param userAddress
     * @param userPhone
     */
    void insertReceiverInfo(@Param("userId") int userId, @Param("userName") String userName, @Param("location") String userAddress, @Param("receiverPhone") String userPhone);
}
