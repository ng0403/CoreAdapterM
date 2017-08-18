package com.core.plus.oppty.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.oppty.dao.OpptyDao;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

@Service
public class OpptyServiceImlp implements OpptyService {

	@Resource
	OpptyDao opptyDao;
	
	@Override
	public List<OpptyVO> opptyList(Map<String, Object> opptyMap) {
		// TODO Auto-generated method stub
		return opptyDao.opptyList(opptyMap);
	}
	
	@Override
	public List<OpptyVO> opptySchList(Map<String, Object> kwMap) {
		// TODO Auto-generated method stub
		return opptyDao.opptySchList(kwMap);
	}

	@Override
	public List<OpptyItemVO> opptyItemList(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyItemList(oppty_no);
	}
	
	@Override
	public OpptyVO opptyDetail(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyDetail(oppty_no);
	}
	
	/* CUD */
	@Override
	public int opptyInsert(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyInsert(opptyVo);
	}
	
	@Override
	public int opptyEdit(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyEdit(opptyVo);
	}
	
	@Override
	public int opptyDelete(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyDelete(opptyVo);
	}
	
	/* OpptyItem */
	@Override
	public int opptyItemInsert(List<OpptyItemVO> opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyItemInsert(opptyVo);
	}
	
	@Override
	public int opptyItemDelete(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyItemDelete(oppty_no);
	}

	/* Index */
	@Override
	public OpptyVO opptyNoIndex() {
		// TODO Auto-generated method stub
		return opptyDao.opptyNoIndex();
	}
	
	/* code */
	@Override
	public List<OpptyVO> opptyStatusCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyStatusCD();
	}

	@Override
	public List<OpptyVO> opptyStageCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyStageCD();
	}

	@Override
	public List<OpptyVO> opptyDtypeCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyDtypeCD();
	}

	@Override
	public List<OpptyVO> opptyPerchaseType() {
		// TODO Auto-generated method stub
		return opptyDao.opptyPerchaseType();
	}

	@Override
	public List<OpptyVO> opptyPaymentCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyPaymentCD();
	}

	@Override
	public List<OpptyVO> opptyRecPerCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyRecPerCD();
	}

	/* Popup */
	@Override
	public List<CustVO> custPopupList() {
		// TODO Auto-generated method stub
		return opptyDao.custPopupList();
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return opptyDao.custPopupList(map);
	}

	@Override
	public List<EmpVO> empPopupList() {
		// TODO Auto-generated method stub
		return opptyDao.empPopupList();
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return opptyDao.empPopupList(map);
	}

	@Override
	public List<OpptyItemVO> mainCatPopupList() {
		// TODO Auto-generated method stub
		return opptyDao.mainCatPopupList();
	}

	@Override
	public List<OpptyItemVO> mainCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return opptyDao.mainCatPopupList(map);
	}

	@Override
	public List<OpptyItemVO> midCatPopupList() {
		// TODO Auto-generated method stub
		return opptyDao.midCatPopupList();
	}

	@Override
	public List<OpptyItemVO> midCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return opptyDao.midCatPopupList(map);
	}

	@Override
	public List<OpptyItemVO> smallCatPopupList() {
		// TODO Auto-generated method stub
		return opptyDao.smallCatPopupList();
	}

	@Override
	public List<OpptyItemVO> smallCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return opptyDao.smallCatPopupList(map);
	}

	@Override
	public PagerVO getOpptyListRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int optyPageNum = (Integer)map.get("opptyPageNum");
		PagerVO page = new PagerVO(optyPageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getOpptyListRow(map);
		
		page = new PagerVO(optyPageNum, totalRowCount, 10, 10);
		
		return page;
	}
	
	@Override
	public PagerVO getCustPopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int custPageNum = (Integer)map.get("custPopupPageNum");
		PagerVO page = new PagerVO(custPageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getOpptyListRow(map);
		
		page = new PagerVO(custPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public PagerVO getEmpPopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int empPageNum = (Integer)map.get("empPopupPageNum");
		PagerVO page = new PagerVO(empPageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getEmpPopupRow(map);
		
		page = new PagerVO(empPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public PagerVO getMainCatePopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int mainCatePageNum = (Integer)map.get("mainCatePopupPageNum");
		PagerVO page = new PagerVO(mainCatePageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getMainCatePopupRow(map);
		
		page = new PagerVO(mainCatePageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public PagerVO getMidCatePopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int midCatePageNum = (Integer)map.get("midCatePopupPageNum");
		PagerVO page = new PagerVO(midCatePageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getMidCatePopupRow(map);
		
		page = new PagerVO(midCatePageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public PagerVO getSmallCatePopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int smallCatePageNum = (Integer)map.get("smallCatePopupPageNum");
		PagerVO page = new PagerVO(smallCatePageNum, 0, 10, 10);
		
		int totalRowCount = opptyDao.getSmallPopupRow(map);
		
		page = new PagerVO(smallCatePageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public int excelUpload(MultipartFile excelFile) {
		// TODO Auto-generated method stub
		int result = opptyDao.opptyUploadExcel(excelFile);
		
		return result;
	}

	@Override
	public List<OpptyVO> opptyExcelExport(Map<String, Object> opptykMap) {
		
		List<OpptyVO> opptyExcelExport = opptyDao.opptyExcelExport(opptykMap);
		return opptyExcelExport;
	}

}
