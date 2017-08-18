package com.core.plus.contact.cust.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.dao.CustDAO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.task.vo.TaskVO;

@Service
public class CustServiceImpl implements CustService{
	@Resource
	CustDAO custDao;

	@Override
	public List<CustVO> custList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<CustVO> custList = custDao.custList(map);
		
		return custList;
	}

	@Override
	public CustVO custDetailList(String cust_no) {
		// TODO Auto-generated method stub
		CustVO custDList = custDao.custDetailList(cust_no);
		return custDList;
	}

	@Override
	public int custAdd(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = custDao.custAdd(cvo);
		return result;
	}

	@Override
	public int custMdfy(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = custDao.custMdfy(cvo);
		return result;
	}

	@Override
	public PagerVO getCustListRow(Map<String, Object> custMap) {
		// TODO Auto-generated method stub
		int optyPageNum = (Integer)custMap.get("custPageNum");
		PagerVO page = new PagerVO(optyPageNum, 0, 10, 10);
		
		int totalRowCount = custDao.getCustListRow(custMap);
		
		page = new PagerVO(optyPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public int custDelete(CustVO custVo) {
		// TODO Auto-generated method stub
		return custDao.custDelete(custVo);
	}

	@Override
	public int excelUpload(MultipartFile destFile) {
		// TODO Auto-generated method stub
		int result = custDao.custUploadExcel(destFile);
		
		return result;
	}

	// 엑셀 출력
	@Override
	public List<CustVO> custExcelExport(Map<String, Object> custkMap) {
		List<CustVO> custExcelExport = custDao.custExcelExport(custkMap);
		return custExcelExport;
	}

}
