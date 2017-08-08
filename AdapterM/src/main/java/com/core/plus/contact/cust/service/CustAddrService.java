package com.core.plus.contact.cust.service;

import java.util.List;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustAddrService {

	List<CustVO> custAddrDetailList(String cust_no);

	int custAddrDelete(String cust_no);

	int custAddrAdd(List<CustVO> custAD_list);

}
