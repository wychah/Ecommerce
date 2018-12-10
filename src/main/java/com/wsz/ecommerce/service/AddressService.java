package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.ReceiverInfo;

import java.util.List;

public interface AddressService {
    List<ReceiverInfo> findReceiverInfoById(int userId);
    void deleteReceiverInfoById(int addressId);
    void updateReceiverInfoById(ReceiverInfo receiverInfo);
    void insertReceiverInfo(int userId,String userName,String userAddress,String userPhone);
}
