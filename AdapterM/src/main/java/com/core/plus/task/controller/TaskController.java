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
		
		List<TaskVO> vo = taskService.taskList();
		
		
		ModelAndView mov = new ModelAndView("task_list");
		
		
		return mov;
	}
	
	
	
}
