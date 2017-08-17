package com.core.plus.contact.cust.dao;

import java.util.List;
import java.util.Map;

import com.core.plus.contact.cust.vo.CustVO;

public interface CustDAO {

	List<CustVO> custList(Map<String, Object> map);

	CustVO custDetailList(String cust_no);

	int custAdd(CustVO cvo);

	int custMdfy(CustVO cvo);

	int getCustListRow(Map<String, Object> custMap);

	int custDelete(CustVO custVo);

}
