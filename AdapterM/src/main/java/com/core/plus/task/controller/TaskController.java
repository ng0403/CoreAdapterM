package com.core.plus.task.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.common.PagerVO;
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
	
	// 조회
	@RequestMapping(value="task_sch", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> taskSchList(HttpSession session,
												  @RequestParam(value = "taskPageNum", defaultValue = "1") int taskPageNum,
												  String task_no_srch, String subject_srch, 
												  String cust_name_srch, String emp_name_srch,
												  String next_day_srch, String dtype_cd_srch)
	{
		Map<String, Object> taskMap = new HashMap<String, Object>();
		System.out.println("page num : " + taskPageNum);
		taskMap.put("taskPageNum", taskPageNum);
		taskMap.put("task_no_srch", task_no_srch);
		taskMap.put("subject_srch", subject_srch);
		taskMap.put("cust_name_srch", cust_name_srch);
		taskMap.put("emp_name_srch", emp_name_srch);
		taskMap.put("next_day_srch", next_day_srch);
		taskMap.put("dtype_cd_srch", dtype_cd_srch);
		
		// paging
		//PagerVO page = taskService.getTaskListRow(taskMap);
		//taskMap.put("page", page);
		//System.out.println("page : " + page);
				
		List<TaskVO> srcList = taskService.taskSchList(taskMap);
		
		taskMap.put("srcList", srcList);
		
		return taskMap;
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
			mov.addObject("flg", "1");
			
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
			mov.addObject("flg", "2");
			
			return mov;
		}
	}
	
	/* CUD */
	@RequestMapping(value="task_single_add", method=RequestMethod.POST)
	public @ResponseBody int taskSingleInsert(TaskVO taskVo, HttpSession session, HttpServletRequest request)
	{
		int result = 0;
		result = taskService.taskInsert(taskVo);
		
		return 0;
	}
	
	// 수정
	@RequestMapping(value="task_edit", method=RequestMethod.POST)
	public @ResponseBody int taskEdit(TaskVO taskVo, HttpSession session)
	{
		int result = 0;
		int flg=2;
		System.out.println("task_edit : " + taskVo);
		
		result = taskService.taskEdit(taskVo);
		
		System.out.println("edit : " + result);
		
		return result;
	}
	
	
	
}
