package com.core.plus.task.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;
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
		List<TaskVO> dtypeCd  = taskService.taskDtypeCD();			// 분류코드
		List<TaskVO> scoreCd  = taskService.taskScoreCD();			// 상대가치점수
		
		ModelAndView mov = new ModelAndView("task_list");
		
		mov.addObject("taskList", taskList);
		mov.addObject("dtypeCd", dtypeCd);
		mov.addObject("scoreCd", scoreCd);
		
		return mov;
	}
	
	// 상세보기 및 단건등록화면
	@RequestMapping(value="task_detail")
	public ModelAndView taskDetail(String task_no, String flg)
	{
		System.out.println(task_no);
		
		if(task_no == null || task_no == "")	// 단건등록 시
		{
			TaskVO taskNoIndex	 = taskService.taskNoIndex();			// 인덱스번호
			List<TaskVO> dtypeCd = taskService.taskDtypeCD();			// 분류코드
			List<TaskVO> scoreCd = taskService.taskScoreCD();			// 상대가치점수

			ModelAndView mov = new ModelAndView("task_detail");

			mov.addObject("taskNoIndex", taskNoIndex);
			mov.addObject("dtypeCd", dtypeCd);
			mov.addObject("scoreCd", scoreCd);
			
			return mov;
		}
		else	// 상세보기	
		{
			//List<OpptyItemVO> itemList 	= taskService.opptyItemList(task_no);
			List<TaskVO> dtypeCd  = taskService.taskDtypeCD();			// 분류코드
			List<TaskVO> scoreCd  = taskService.taskScoreCD();			// 상대가치점수
			
			//System.out.println("itemList : " + itemList);
			ModelAndView mov = new ModelAndView("task_detail");

			mov.addObject("taskDetail",  taskService.taskDetail(task_no));
			//mov.addObject("itemList", itemList);
			mov.addObject("dtypeCd", dtypeCd);
			mov.addObject("scoreCd", scoreCd);
			
			return mov;
		}
	}
	
	
	
	
	
	
	
}
