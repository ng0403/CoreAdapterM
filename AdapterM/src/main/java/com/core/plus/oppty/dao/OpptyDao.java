package com.core.plus.oppty.dao;

import java.util.List;
import java.util.Map;

import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

public interface OpptyDao {
	
	List<OpptyVO> opptyList();
	List<OpptyVO> opptySchList(Map<String, Object> kwMap);
	List<OpptyItemVO> opptyItemList(String oppty_no);
	
	OpptyVO opptyDetail(String oppty_no);
	
	// CUD
	int opptyInsert(OpptyVO opptyVo);
	int opptyEdit(OpptyVO opptyVo);
	int opptyDelete(OpptyVO opptyVo);
	
	// Index
	OpptyVO opptyNoIndex();
	
	// Code 값 불러오는 Method
	List<OpptyVO> opptyStatusCD();
	List<OpptyVO> opptyStageCD();
	List<OpptyVO> opptyDtypeCD();
	List<OpptyVO> opptyPerchaseType();
	List<OpptyVO> opptyPaymentCD();
	List<OpptyVO> opptyRecPerCD();

}
