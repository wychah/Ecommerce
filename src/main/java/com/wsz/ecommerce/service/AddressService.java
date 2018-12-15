package com.wsz.ecommerce.service;

import com.wsz.ecommerce.domain.NewReceiverInfo;
import com.wsz.ecommerce.domain.ReceiverInfo;

import java.util.List;
import java.util.Map;

public interface AddressService {
    Map findUserAddress(int userId);
    List<ReceiverInfo> findReceiverInfoById(int userId);
    void deleteReceiverInfoById(int addressId);
    void updateReceiverInfoById(ReceiverInfo receiverInfo);
    void insertReceiverInfo(int userId,String userName,String userAddress,String userPhone);
    Map insertAndFind(NewReceiverInfo newReceiverInfo);
}
