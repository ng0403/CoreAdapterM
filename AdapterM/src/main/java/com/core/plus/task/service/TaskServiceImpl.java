package com.core.plus.task.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.task.dao.TaskDAO;

@Service
public class TaskServiceImpl implements TaskService {
	
	@Resource
	TaskDAO taskDao;

	//List 
	@Override
	public List<TaskVO> taskList() {
		return taskDao.taskList();
	}

}
