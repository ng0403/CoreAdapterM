package com.core.plus.task.service;

import java.util.List;
import java.util.Map;

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

	

}
