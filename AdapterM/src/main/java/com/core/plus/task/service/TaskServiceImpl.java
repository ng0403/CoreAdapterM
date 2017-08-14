package com.core.plus.task.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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

}
