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

}
