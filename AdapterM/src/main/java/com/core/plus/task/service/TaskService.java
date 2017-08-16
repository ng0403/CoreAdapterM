package com.core.plus.task.service;

import java.util.List;
import java.util.Map;

import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

public interface TaskService {

	List<TaskVO> taskList();											// List화면
	List<TaskVO> taskDtypeCD();											// 분류코드
	List<TaskVO> taskScoreCD();											// 상대가치점수
	List<TaskVO> taskSchList(Map<String, Object> taskMap);				// 조회
	TaskVO taskNoIndex();												// 인덱스 번호
	Object taskDetail(String task_no);									// 상세보기
	int taskInsert(TaskVO taskVo);										// 추가
	int taskEdit(TaskVO taskVo);										// 수정
	
}
