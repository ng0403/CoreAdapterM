package com.core.plus.contact.cust.service;

import java.util.List;
import java.util.Map;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;

public interface CustService {

	List<CustVO> custList(Map<String, Object> map);

	CustVO custDetailList(String cust_no);

	int custAdd(CustVO cvo);

	int custMdfy(CustVO cvo);

	PagerVO getCustListRow(Map<String, Object> custMap);

}
