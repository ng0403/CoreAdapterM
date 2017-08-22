package com.core.plus.task.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

public interface TaskService {
	
	PagerVO getTaskListRow(Map<String, Object> map);					// 페이징
	List<TaskVO> taskList();											// List
	List<TaskVO> taskList(Map<String, Object> taskMap);					// List 페이징
	List<TaskVO> taskSchList(Map<String, Object> taskMap);				// 조회
	
	List<TaskVO> taskDtypeCD();											// 분류코드
	List<TaskVO> taskScoreCD();											// 상대가치점수
	
	TaskVO taskNoIndex();												// 인덱스 번호
	
	Object taskDetail(String task_no);									// 상세보기
	
	int taskInsert(TaskVO taskVo);										// 추가
	int taskEdit(TaskVO taskVo);										// 수정
	int taskDelete(TaskVO taskVo);										// 삭제
	
	PagerVO getTaskPopupRow(Map<String, Object> map);					// 고객 팝업 페이지
	List<CustVO> custPopupList();										// 고객 리스트
	List<CustVO> custPopupList(Map<String, Object> map);				// 고객 리스트
	
	PagerVO getEmpPopupRow(Map<String, Object> map);					// 담당자 팝업 페이지
	List<EmpVO> empPopupList();											// 담당자 리스트
	List<EmpVO> empPopupList(Map<String, Object> map);					// 담당자 리스트
	
	PagerVO getLeadPopupRow(Map<String, Object> map);					// 가망고객 팝업 페이지
	List<LeadVO> leadPopupList();										// 가망고객 리스트
	List<LeadVO> leadPopupList(Map<String, Object> map);				// 가망고객 리스트
	
	PagerVO getOpptyPopupRow(Map<String, Object> map);					// 영업기회 팝업 페이지
	List<OpptyVO> opptyPopupList();										// 영업기회 리스트
	List<OpptyVO> opptyPopupList(Map<String, Object> map);				// 영업기회 리스트
	
	List<TaskVO> taskExcelExport(Map<String, Object> taskMap);			// 엑셀 출력
	
	// Excel
	int excelUpload(MultipartFile excelFile);	
	
}
