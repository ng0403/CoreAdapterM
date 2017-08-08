package com.core.plus.contact.cust.dao;

import java.util.List;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustAddrDAO {

	List<CustVO> custAddrDetailList(String cust_no);

	int custAddrDelete(String cust_no);

	int custAddrAdd(CustVO custVO);

}
