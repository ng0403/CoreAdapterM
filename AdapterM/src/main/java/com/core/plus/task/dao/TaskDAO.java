package com.core.plus.task.dao;

import java.util.List;
import java.util.Map;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

public interface TaskDAO {

	List<TaskVO> taskList();											// List
	List<TaskVO> taskDtypeCD();											// 분류코드
	List<TaskVO> taskScoreCD();											// 상대가치점수
	List<TaskVO> taskSchList(Map<String, Object> taskMap);				// 조회
	TaskVO taskNoIndex();												// 인덱스번호
	Object taskDetail(String task_no);									// 상세보기
	int taskInsert(TaskVO taskVo);										// 추가
	int taskEdit(TaskVO taskVo);										// 수정
	int taskDelete(TaskVO taskVo);										// 삭제
	
	int getTaskListRow(Map<String, Object> map);
	List<CustVO> custPopupList();
	List<CustVO> custPopupList(Map<String, Object> map);
	
	int getEmpPopupRow(Map<String, Object> map);
	List<EmpVO> empPopupList();
	List<EmpVO> empPopupList(Map<String, Object> map);
	
	int getLeadPopupRow(Map<String, Object> map);
	List<LeadVO> leadPopupList();
	List<LeadVO> leadPopupList(Map<String, Object> map);
	
	int getOpptyPopupRow(Map<String, Object> map);
	List<OpptyVO> opptyPopupList();
	List<OpptyVO> opptyPopupList(Map<String, Object> map);
	
	
	

}
