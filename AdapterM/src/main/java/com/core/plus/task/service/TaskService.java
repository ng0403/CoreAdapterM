package com.core.plus.task.service;

import java.util.List;

import com.core.plus.task.vo.TaskVO;

public interface TaskService {

	List<TaskVO> taskList();											// List화면
	List<TaskVO> taskDtypeCD();											// 분류코드
	List<TaskVO> taskScoreCD();											// 상대가치점수

}
