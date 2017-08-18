package com.core.plus.contact.cust.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;

public interface CustService {

	List<CustVO> custList(Map<String, Object> map);

	CustVO custDetailList(String cust_no);

	int custAdd(CustVO cvo);

	int custMdfy(CustVO cvo);

	PagerVO getCustListRow(Map<String, Object> custMap);

	int custDelete(CustVO custVo);

	int excelUpload(MultipartFile destFile);

	List<CustVO> custExcelExport(Map<String, Object> custkMap);					// 엑셀 출력

}
