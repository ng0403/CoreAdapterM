package com.core.plus.contact.cust.dao;

import java.util.List;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustPhoneDAO {

	List<CustVO> custPhoneDetailList(String cust_no);

	int custPhoneDelete(String cust_no);

	int custPhoneAdd(CustVO custVO);

}
