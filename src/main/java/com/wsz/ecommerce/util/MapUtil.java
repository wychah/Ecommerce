package com.wsz.ecommerce.util;

import com.wsz.ecommerce.domain.CommodityBrief;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapUtil {

    public static Map setMap(double amount, int maxSize, int currentPage, List<CommodityBrief> commodityBriefList) {
        Map map = new HashMap();
        int totalPages = (int) Math.ceil(amount / maxSize);
        map.put("totalPages",totalPages);
        map.put("commodities",commodityBriefList);
        return map;
    }
}
