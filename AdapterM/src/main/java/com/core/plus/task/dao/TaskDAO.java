package com.core.plus.task.dao;

import java.util.List;

import com.core.plus.task.vo.TaskVO;

public interface TaskDAO {

	List<TaskVO> taskList();											// List
	List<TaskVO> taskDtypeCD();											// 분류코드
	List<TaskVO> taskScoreCD();											// 상대가치점수
	TaskVO taskNoIndex();												// 인덱스번호
	Object taskDetail(String task_no);									// 상세보기
	

}
