package com.core.plus.task.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.dao.TaskDAO;
import com.core.plus.task.vo.TaskVO;

@Service
public class TaskServiceImpl implements TaskService {
	
	@Resource
	TaskDAO taskDao;

	//List 
	@Override
	public List<TaskVO> taskList() {
		return taskDao.taskList();
	}

	//List 페이징
	@Override
	public List<TaskVO> taskList(Map<String, Object> taskMap) {
		return taskDao.taskList(taskMap);
	}
	
	//분류코드
	@Override
	public List<TaskVO> taskDtypeCD() {
		return taskDao.taskDtypeCD();
	}

	//상대가치점수
	@Override
	public List<TaskVO> taskScoreCD() {
		return taskDao.taskScoreCD();
	}
	
	//조회
	@Override
	public List<TaskVO> taskSchList(Map<String, Object> taskMap) {
		return taskDao.taskSchList(taskMap);
	}

	//인덱스번호
	@Override
	public TaskVO taskNoIndex() {
		return taskDao.taskNoIndex();
	}

	//상세보기
	@Override
	public Object taskDetail(String task_no) {
		return taskDao.taskDetail(task_no);
	}

	//추가
	@Override
	public int taskInsert(TaskVO taskVo) {
		return taskDao.taskInsert(taskVo);
	}

	//수정
	@Override
	public int taskEdit(TaskVO taskVo) {
		return taskDao.taskEdit(taskVo);
	}

	//삭제
	@Override
	public int taskDelete(TaskVO taskVo) {
		return taskDao.taskDelete(taskVo);
	}

	@Override
	public PagerVO getTaskPopupRow(Map<String, Object> map) {
		
		int custPageNum = (Integer)map.get("custPopupPageNum");
		PagerVO page = new PagerVO(custPageNum, 0, 10, 10);
		
		int totalRowCount = taskDao.getTaskListRow(map);
		page = new PagerVO(custPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public List<CustVO> custPopupList() {
		return taskDao.custPopupList();
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		return taskDao.custPopupList(map);
	}

	@Override
	public PagerVO getEmpPopupRow(Map<String, Object> map) {
		
		int empPageNum = (Integer)map.get("empPopupPageNum");
		PagerVO page = new PagerVO(empPageNum, 0, 10, 10);
		
		int totalRowCount = taskDao.getEmpPopupRow(map);
		page = new PagerVO(empPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public List<EmpVO> empPopupList() {
		return taskDao.empPopupList();
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		return taskDao.empPopupList(map);
	}

	@Override
	public PagerVO getLeadPopupRow(Map<String, Object> map) {
		
		int leadPageNum = (Integer)map.get("leadPopupPageNum");
		PagerVO page = new PagerVO(leadPageNum, 0, 10, 10);
		
		int totalRowCount = taskDao.getLeadPopupRow(map);
		page = new PagerVO(leadPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public List<LeadVO> leadPopupList() {
		return taskDao.leadPopupList();
	}

	@Override
	public List<LeadVO> leadPopupList(Map<String, Object> map) {
		return taskDao.leadPopupList(map);
	}

	@Override
	public PagerVO getOpptyPopupRow(Map<String, Object> map) {
		
		int opptyPageNum = (Integer)map.get("opptyPopupPageNum");
		PagerVO page = new PagerVO(opptyPageNum, 0, 10, 10);
		
		int totalRowCount = taskDao.getOpptyPopupRow(map);
		page = new PagerVO(opptyPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	@Override
	public List<OpptyVO> opptyPopupList() {
		return taskDao.opptyPopupList();
	}

	@Override
	public List<OpptyVO> opptyPopupList(Map<String, Object> map) {
		return taskDao.opptyPopupList(map);
	}

	//페이징
	@Override
	public PagerVO getTaskListRow(Map<String, Object> map) {
		
		int taskPageNum = (Integer)map.get("taskPageNum");
		PagerVO page = new PagerVO(taskPageNum, 0, 10, 10);
		
		int totalRowCount = taskDao.getTaskListRow(map);
		page = new PagerVO(taskPageNum, totalRowCount, 10, 10);
		
		return page;
	}

	//엑셀 출력
	@Override
	public List<TaskVO> taskExcelExport(Map<String, Object> taskMap) {
		List<TaskVO> taskExcelExport = taskDao.taskExcelExport(taskMap);
		return taskExcelExport;
	}

	@Override
	public int excelUpload(MultipartFile excelFile) {
		// TODO Auto-generated method stub
		int result = taskDao.taskUploadExcel(excelFile);
		
		return result;
	}	
}
