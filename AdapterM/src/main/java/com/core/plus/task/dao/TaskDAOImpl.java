package com.core.plus.task.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

	//인덱스번호
	@Override
	public TaskVO taskNoIndex() {
		return sqlSession.selectOne("task.taskNoIndex");
	}

	//상세보기
	@Override
	public Object taskDetail(String task_no) {
		OpptyVO detail = sqlSession.selectOne("task.taskDetail", task_no);
		return detail;
	}

}
