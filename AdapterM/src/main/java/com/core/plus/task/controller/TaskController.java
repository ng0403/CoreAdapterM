package com.core.plus.task.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.task.service.TaskService;
import com.core.plus.task.vo.TaskVO;

@Controller
public class TaskController {

	
	@Resource
	TaskService taskService;
	
	// List
	@RequestMapping(value="/task")
	public ModelAndView TaskList() {
		
		List<TaskVO> taskList = taskService.taskList();				// 전체 리스트
		List<TaskVO> dtypeCd = taskService.taskDtypeCD();			// 분류코드
		List<TaskVO> scoreCd	= taskService.taskScoreCD();		// 상대가치점수
		
		ModelAndView mov = new ModelAndView("task_list");
		
		mov.addObject("taskList", taskList);
		mov.addObject("dtypeCd", dtypeCd);
		mov.addObject("scoreCd", scoreCd);
		
		return mov;
	}
	
	
	
}
