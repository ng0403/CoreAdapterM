package com.core.plus.task.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

@Repository
public class TaskDAOImpl implements TaskDAO {
	
	@Autowired
	SqlSession sqlSession;

	//List
	@Override
	public List<TaskVO> taskList() {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList");
		return vo;
	}

	//List 페이지
	@Override
	public List<TaskVO> taskList(Map<String, Object> taskMap) {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList", taskMap);
		return vo;
	}
	
	//분류코드
	@Override
	public List<TaskVO> taskDtypeCD() {
		
		List<TaskVO> code = sqlSession.selectList("task.taskDtypeCode");
		return code;
	}

	//상대가치점수
	@Override
	public List<TaskVO> taskScoreCD() {
		
		List<TaskVO> code = sqlSession.selectList("task.taskScoreCode");
		return code;
	}

	//조회
	@Override
	public List<TaskVO> taskSchList(Map<String, Object> taskMap) {
		
		List<TaskVO> vo = sqlSession.selectList("task.taskList", taskMap);
		return vo;
	}
	
	//인덱스번호
	@Override
	public TaskVO taskNoIndex() {
		
		return sqlSession.selectOne("task.taskNoIndex");
	}

	//상세보기
	@Override
	public Object taskDetail(String task_no) {
		
		TaskVO detail = sqlSession.selectOne("task.taskDetail", task_no);
		System.out.println("taskDetail"+detail);
		return detail;
	}

	//추가
	@Override
	public int taskInsert(TaskVO taskVo) {
		
		int result = sqlSession.insert("task.taskInsert", taskVo);
		return result;
	}

	//수정
	@Override
	public int taskEdit(TaskVO taskVo) {
		
		int result = sqlSession.insert("task.taskEdit", taskVo);
		return result;
	}

	@Override
	public int taskDelete(TaskVO taskVo) {
		
		int result = sqlSession.delete("task.taskDelete", taskVo);
		return result;
	}

	@Override
	public int getTaskListRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.taskListTotalRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}
	
	@Override
	public List<CustVO> custPopupList() {
		
		List<CustVO> custPopList = sqlSession.selectList("task.custPopupList");
		return custPopList;
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		
		List<CustVO> custPopList = sqlSession.selectList("task.custPopupList", map);
		return custPopList;
	}

	@Override
	public int getEmpPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.empPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<EmpVO> empPopupList() {
		
		List<EmpVO> empPopList = sqlSession.selectList("task.empPopupList");
		return empPopList;
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		
		List<EmpVO> empPopList = sqlSession.selectList("task.empPopupList", map);
		return empPopList;
	}

	@Override
	public int getLeadPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.leadPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<LeadVO> leadPopupList() {
		
		List<LeadVO> leadPopupList = sqlSession.selectList("task.leadPopupList");
		return leadPopupList;
	}

	@Override
	public List<LeadVO> leadPopupList(Map<String, Object> map) {
		
		List<LeadVO> leadPopupList = sqlSession.selectList("task.leadPopupList", map);
		return leadPopupList;
	}

	@Override
	public int getOpptyPopupRow(Map<String, Object> map) {
		
		int totalCount = 0;
		try {
			totalCount = sqlSession.selectOne("task.opptyPopupRow", map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public List<OpptyVO> opptyPopupList() {
		
		List<OpptyVO> opptyPopupList = sqlSession.selectList("task.opptyPopupList");
		return opptyPopupList;
	}

	@Override
	public List<OpptyVO> opptyPopupList(Map<String, Object> map) {
		
		List<OpptyVO> opptyPopupList = sqlSession.selectList("task.opptyPopupList", map);
		return opptyPopupList;
	}


}
