package com.core.plus.contact.cust.service;

import java.util.List;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustPhoneService {

	List<CustVO> custPhoneDetailList(String cust_no);

	int custPhoneDelete(String cust_no);

	int custPhoneAdd(List<CustVO> custPH_list);

}
