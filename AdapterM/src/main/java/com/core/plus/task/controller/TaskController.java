package com.core.plus.task.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.service.TaskService;
import com.core.plus.task.vo.TaskVO;

import net.sf.json.JSONArray;

@Controller
public class TaskController {

	
	@Resource
	TaskService taskService;
	
	@Resource
	MenuService menuService;
	
	public void menuImport(ModelAndView mav, String url){
		String menu_id = menuService.getMenuUrlID(url);
//		String user_id = session.getAttribute("user").toString();
	
		Map<String, String> menuAuthMap = new HashMap<String, String>();
		menuAuthMap.put("menu_url", url);
//		menuAuthMap.put("user_id", user_id);
		menuAuthMap.put("menu_id", menu_id);
//		MenuVo menuAuth = loginDao.getMenuAuthInfo(menuAuthMap);
//		mav.addObject("menuAuth", menuAuth);
			
		List<MenuVo> mainMenuList = menuService.getMainMenuList(/*user_id*/);
		List<MenuVo> subMenuList = menuService.getSubMenuList(menuAuthMap);
		mav.addObject("mainMenuList", mainMenuList);  //mainMenuList
		mav.addObject("subMenuList", subMenuList);    //subMenuList
	}
	
	// List
	@RequestMapping(value="/task")
	public ModelAndView TaskList(HttpSession session,
									@RequestParam(value = "taskPageNum", defaultValue = "1") int taskPageNum,
									String excel ) {
		
		Map<String, Object> taskMap = new HashMap<String, Object>();
		taskMap.put("taskPageNum", taskPageNum);
		
		
		
		int flg=0;
		//엑셀 출력 부분(리스트 전체 출력)
		if(excel != null){
			if(excel.equals("true")){
				
				ModelAndView mav = new ModelAndView("/task/taskList_excel");
				List<TaskVO> taskExcelExport = taskService.taskExcelExport(taskMap);
				mav.addObject("taskExcelExport", taskExcelExport);

				return mav;
			}
		}
		
		// paging
		PagerVO page = taskService.getTaskListRow(taskMap);
		taskMap.put("page", page);
		
		List<TaskVO> taskList = taskService.taskList(taskMap);		// 전체 리스트
		List<TaskVO> dtypeCd  = taskService.taskDtypeCD();			// 분류코드
		List<TaskVO> scoreCd  = taskService.taskScoreCD();			// 상대가치점수
		
		ModelAndView mov = new ModelAndView("task_list");
		
		mov.addObject("page", page);
		mov.addObject("taskPageNum", taskPageNum);
		mov.addObject("taskList", taskList);
		mov.addObject("dtypeCd", dtypeCd);
		mov.addObject("scoreCd", scoreCd);
		menuImport(mov, "task");
		
		return mov;
	}
	
	// 조회
	@RequestMapping(value="/task_sch", method=RequestMethod.POST)
	@ResponseBody
	public  ModelAndView taskSchList(HttpSession session,
										  @RequestParam(value = "taskPageNum", defaultValue = "1") int taskPageNum,
										  String task_no_srch, String subject_srch, 
										  String cust_name_srch, String emp_name_srch,
										  String next_day_srch, String dtype_cd_srch,
										  String excel) {
		
		ModelAndView mov = new ModelAndView(new MappingJacksonJsonView());
		JSONArray json = new JSONArray();
		
		Map<String, Object> taskMap = new HashMap<String, Object>();
		
		taskMap.put("taskPageNum", taskPageNum);
		taskMap.put("task_no_srch", task_no_srch);
		taskMap.put("subject_srch", subject_srch);
		taskMap.put("cust_name_srch", cust_name_srch);
		taskMap.put("emp_name_srch", emp_name_srch);
		taskMap.put("next_day_srch", next_day_srch);
		taskMap.put("dtype_cd_srch", dtype_cd_srch);
		
		// paging
		PagerVO page = taskService.getTaskListRow(taskMap);
		taskMap.put("page", page);
		
		List<TaskVO> srcList = taskService.taskSchList(taskMap);
		taskMap.put("srcList", srcList);
				
		mov.addObject("page", page);
		mov.addObject("taskPageNum", taskPageNum);
		mov.addObject("srcList", srcList);
		
		return mov;
	}
	
	//엑셀 출력 
	@RequestMapping(value = "/toExcel",  method=RequestMethod.POST)
	public ModelAndView toExcel(HttpServletRequest req, HttpSession session, 
									String task_no_srch,  String subject_srch,  String cust_name_srch, 
									String emp_name_srch, String next_day_srch, String dtype_cd_srch, String flg ) {
		
		char temp = flg.charAt(flg.length()-1);
		
		ModelAndView result = new ModelAndView();
		Map<String, Object> taskMap = new HashMap<String, Object> ();
		if(temp == '0')
		{
			taskMap.put("task_no_srch", task_no_srch);
			taskMap.put("subject_srch", subject_srch);
			taskMap.put("cust_name_srch", cust_name_srch);
			taskMap.put("emp_name_srch", emp_name_srch);
			taskMap.put("next_day_srch", next_day_srch);
			taskMap.put("dtype_cd_srch", dtype_cd_srch);
			
			//taskMap.put("some",req.getParameter("some"));    			// where에 들어갈 조건??
			 
			List<TaskVO> list = taskService.taskExcelExport(taskMap);	// 쿼리
			System.out.println("taskMap"+ taskMap.toString());
			result.addObject("taskExcelExport", list); 					// 쿼리 결과를 model에 담아줌
			result.setViewName("/task/taskList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
			
			return result;
		}
		else
		{
			result.setViewName("/task/taskList_excel");						// 엑셀로 출력하기 위한 jsp 페이지
			
			return result;
		}
		
	}
	
	// 상세보기 및 단건등록화면
	@RequestMapping(value="task_detail")
	public ModelAndView taskDetail(String task_no, String flg) {

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
			
			menuImport(mov, "task");
			
			return mov;
		}
		else	// 상세보기	
		{
			List<TaskVO> dtypeCd  = taskService.taskDtypeCD();			// 분류코드
			List<TaskVO> scoreCd  = taskService.taskScoreCD();			// 상대가치점수
			
			ModelAndView mov = new ModelAndView("task_detail");

			mov.addObject("taskDetail",  taskService.taskDetail(task_no));
			mov.addObject("dtypeCd", dtypeCd);
			mov.addObject("scoreCd", scoreCd);
			mov.addObject("flg", "2");
			
			menuImport(mov, "task");
			
			return mov;
		}
	}
	
	/* CUD */
	@RequestMapping(value="task_single_add", method=RequestMethod.POST)
	public @ResponseBody int taskSingleInsert(TaskVO taskVo, HttpSession session, HttpServletRequest request) {
		int result = 0;
		result = taskService.taskInsert(taskVo);
		
		return 0;
	}
	
	// 수정
	@RequestMapping(value="task_edit", method=RequestMethod.POST)
	public @ResponseBody int taskEdit(TaskVO taskVo, HttpSession session) {
		
		int result = 0;
		int flg=2;
		
		result = taskService.taskEdit(taskVo);

		return result;
	}
	
	// 삭제
	@RequestMapping(value="task_delete", method=RequestMethod.POST)
	public @ResponseBody int taskDelete(TaskVO taskVo, HttpSession session) {
		
		int result = 0;
		
		result = taskService.taskDelete(taskVo);
		
		return result;
	}
	
	/* Popup*/
	@RequestMapping(value="taskCustListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> taskCustListPopup(@RequestParam(value = "custPopupPageNum", defaultValue = "1") 
																int custPopupPageNum, String s_cust_name) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("custPopupPageNum", custPopupPageNum);
		
		// paging
		PagerVO page = taskService.getTaskPopupRow(map);
		
		// 고객리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_cust_name == null || s_cust_name == "") {
			List<CustVO> custPopupList = taskService.custPopupList();
			map.put("custPopupList", custPopupList);
			map.put("page", page);
			map.put("pageNum", custPopupPageNum);
			
			return map;
			
		} else {
			
			map.put("s_cust_name", s_cust_name);
			
			List<CustVO> schCustPopupList = taskService.custPopupList(map);
			
			map.put("custPopupList", schCustPopupList);
			map.put("page", page);
			map.put("pageNum", custPopupPageNum);
			
			return map;
		}
	}
	
	@RequestMapping(value="taskEmpListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> taskEmpListPopup(@RequestParam(value = "empPopupPageNum", defaultValue = "1") 
																int empPopupPageNum, String s_emp_name) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("empPopupPageNum", empPopupPageNum);
		
		// paging
		PagerVO page = taskService.getEmpPopupRow(map);
		
		// 담당자리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_emp_name == null || s_emp_name == "") {
			
			List<EmpVO> empPopupList = taskService.empPopupList();
			
			map.put("empPopupList", empPopupList);
			map.put("page", page);
			map.put("pageNum", empPopupPageNum);
			
			return map;
			
		} else {
			
			map.put("s_emp_name", s_emp_name);
			
			List<EmpVO> schEmpPopupList = taskService.empPopupList(map);
			
			map.put("empPopupList", schEmpPopupList);
			map.put("page", page);
			map.put("pageNum", empPopupPageNum);
			
			return map;
		}
	}
	
	
	@RequestMapping(value="taskLeadListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> taskLeadListPopup(@RequestParam(value = "leadPopupPageNum", defaultValue = "1") 
																int leadPopupPageNum, String s_lead_name) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("leadPopupPageNum", leadPopupPageNum);
		
		// paging
		PagerVO page = taskService.getLeadPopupRow(map);
		
		// 가망고객리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_lead_name == null || s_lead_name == ""){
			
			List<LeadVO> leadPopupList = taskService.leadPopupList();
			
			map.put("leadPopupList", leadPopupList);
			map.put("page", page);
			map.put("pageNum", leadPopupPageNum);
			
			return map;
			
		} else {
			
			map.put("s_lead_name", s_lead_name);
			
			List<LeadVO> schLeadPopupList = taskService.leadPopupList(map);
			
			map.put("leadPopupList", schLeadPopupList);
			map.put("page", page);
			map.put("pageNum", leadPopupPageNum);
			
			return map;
		}
	}
	
	@RequestMapping(value="taskOpptyListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> taskOpptyListPopup(@RequestParam(value = "opptyPopupPageNum", defaultValue = "1") 
																	int opptyPopupPageNum, String s_oppty_name) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("opptyPopupPageNum", opptyPopupPageNum);
		
		// paging
		PagerVO page = taskService.getOpptyPopupRow(map);
		
		// 영업기회 리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_oppty_name == null || s_oppty_name == "") {
			
			List<OpptyVO> opptyPopupList = taskService.opptyPopupList();
			
			map.put("opptyPopupList", opptyPopupList);
			map.put("page", page);
			map.put("pageNum", opptyPopupPageNum);
			
			return map;
		} else {
			
			map.put("s_oppty_name", s_oppty_name);
			
			List<OpptyVO> schOpptyPopupList = taskService.opptyPopupList(map);
			
			map.put("opptyPopupList", schOpptyPopupList);
			map.put("page", page);
			map.put("pageNum", opptyPopupPageNum);
			
			return map;
		}
	}
	
	//엑셀 추가 전 팝업
	@RequestMapping(value="/taskExcelImportTab", method=RequestMethod.GET)
	public ModelAndView excelImportTab(HttpSession session, Locale locale,@RequestParam(value = "pageNum", defaultValue = "1") int pageNum)
	{
		System.out.println("ExcelTab Controller");
		ModelAndView mov = new ModelAndView("/lead/excel_import_tab");
		
		return mov;
	}	
		
	// Excel Data Import
    @RequestMapping(value = "/taskExcelUploadAjax", headers = "content-type=multipart/*", method = RequestMethod.POST)
    public ModelAndView excelUploadAjax(MultipartHttpServletRequest request)  throws Exception
    {
        MultipartFile excelFile = request.getFile("excelFile");
        System.out.println("excelFile : " + excelFile);
		
        System.out.println("엑셀 파일 업로드 컨트롤러");
       
        if(excelFile==null || excelFile.isEmpty()){
            throw new RuntimeException("엑셀파일을 선택 해 주세요.");
        }
        
        int result = taskService.excelUpload(excelFile);
        System.out.println(result);
        
        return new ModelAndView("/task/excel_import_tab", "result", result);
    }	
}
