package com.core.plus.contact.cust.dao;

import java.util.List;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustDAO {

	List<CustVO> custList();

	CustVO custDetailList(String cust_no);

	int custAdd(CustVO cvo);

	int custMdfy(CustVO cvo);

}
