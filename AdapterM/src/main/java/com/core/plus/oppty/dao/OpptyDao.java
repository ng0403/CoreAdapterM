package com.core.plus.oppty.dao;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

public interface OpptyDao {
	
	List<OpptyVO> opptyList(Map<String, Object> opptyMap);
	List<OpptyVO> opptySchList(Map<String, Object> kwMap);
	List<OpptyItemVO> opptyItemList(String oppty_no);
	
	OpptyVO opptyDetail(String oppty_no);
	
	// CUD
	int opptyInsert(OpptyVO opptyVo);
	int opptyEdit(OpptyVO opptyVo);
	int opptyDelete(OpptyVO opptyVo);
	
	int opptyItemInsert(List<OpptyItemVO> opptyVo);
	int opptyItemDelete(String oppty_no);
	
	// Index
	OpptyVO opptyNoIndex();
	
	// Code 값 불러오는 Method
	List<OpptyVO> opptyStatusCD();
	List<OpptyVO> opptyStageCD();
	List<OpptyVO> opptyDtypeCD();
	List<OpptyVO> opptyPerchaseType();
	List<OpptyVO> opptyPaymentCD();
	List<OpptyVO> opptyRecPerCD();
	
	// Popup
	List<CustVO> custPopupList();
	List<CustVO> custPopupList(Map<String, Object> s_cust_name);
	List<EmpVO> empPopupList();
	List<EmpVO> empPopupList(Map<String, Object> map);
	List<OpptyItemVO> mainCatPopupList();
	List<OpptyItemVO> mainCatPopupList(Map<String, Object> map);
	List<OpptyItemVO> midCatPopupList();
	List<OpptyItemVO> midCatPopupList(Map<String, Object> map);
	List<OpptyItemVO> smallCatPopupList();
	List<OpptyItemVO> smallCatPopupList(Map<String, Object> map);

	// Paging
	int getOpptyListRow(Map<String, Object> map);
	int getCustPopupRow(Map<String, Object> map);
	int getEmpPopupRow(Map<String, Object> map);
	int getMainCatePopupRow(Map<String, Object> map);
	int getMidCatePopupRow(Map<String, Object> map);
	int getSmallPopupRow(Map<String, Object> map);
	int opptyUploadExcel(MultipartFile excelFile);
	
	// excel Export
	List<OpptyVO> opptyExcelExport(Map<String, Object> opptykMap);
	
}
