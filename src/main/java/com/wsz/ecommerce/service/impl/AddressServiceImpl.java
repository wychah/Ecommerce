package com.wsz.ecommerce.service.impl;

import com.wsz.ecommerce.dao.AddressDao;
import com.wsz.ecommerce.domain.ReceiverInfo;
import com.wsz.ecommerce.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressDao addressDao;

    @Override
    public List<ReceiverInfo> findReceiverInfoById(int userId) {
        return addressDao.findReceiverInfoById(userId);
    }

    @Override
    public void deleteReceiverInfoById(int addressId) {
        addressDao.deleteReceiverInfoById(addressId);
    }

    @Override
    public void updateReceiverInfoById(ReceiverInfo receiverInfo) {
        addressDao.updateReceiverInfoById(receiverInfo);
    }

    @Override
    public void insertReceiverInfo(int userId, String userName, String userAddress, String userPhone) {
        addressDao.insertReceiverInfo(userId, userName, userAddress, userPhone);
    }
}
