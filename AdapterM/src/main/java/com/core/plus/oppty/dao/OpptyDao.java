package com.core.plus.oppty.dao;

import java.util.List;

import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

public interface OpptyDao {
	
	List<OpptyVO> opptyList();
	List<OpptyItemVO> opptyItemList();
	
	// Code 값 불러오는 Method
	List<OpptyVO> opptyStatusCD();
	List<OpptyVO> opptyStageCD();
	List<OpptyVO> opptyDtypeCD();
	List<OpptyVO> opptyPerchaseType();
	List<OpptyVO> opptyPaymentCD();
	List<OpptyVO> opptyRecPerCD();

}
