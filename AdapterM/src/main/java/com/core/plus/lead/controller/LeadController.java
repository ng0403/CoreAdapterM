package com.core.plus.lead.controller;

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

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;
import com.core.plus.lead.service.LeadService;
import com.core.plus.lead.vo.LeadVO;
import com.core.plus.task.vo.TaskVO;

@Controller
public class LeadController {
	
	@Resource
	LeadService leadService;
	
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
	
	
	//초기 list 출력
	@RequestMapping(value="lead")
	public ModelAndView lead_list(@RequestParam(value = "PageNum", defaultValue = "1") int PageNum) {
		System.out.println("entering");
	
		Map<String, Object> leadMap = new HashMap<String, Object>();
		leadMap.put("PageNum", PageNum);
		
		// paging
		PagerVO page = leadService.getLeadListRow(leadMap);
		leadMap.put("page", page); 
		
		System.out.println("page?? " + page.toString());
		
		List<LeadVO> vo = leadService.lead_list(leadMap);
		
		ModelAndView mov = new ModelAndView("lead_list");
		mov.addObject("page", page);
		mov.addObject("lead_list", vo);
		
		menuImport(mov, "lead");
		
		System.out.println("mov ?  " + mov.toString());
		return mov;
		
	}
	
	//가망 고객 상세정보
	@RequestMapping(value="lead_detail", method={RequestMethod.GET,RequestMethod.POST})
	public ModelAndView lead_detail(@RequestParam("lead_no") String lead_no){ 
	 
		ModelAndView mov = new ModelAndView("leadCRUD");
		mov.addObject("detail", leadService.lead_detail(lead_no));
		mov.addObject("nal","2017-08-09");
		mov.addObject("flg", "0");
		System.out.println(mov.toString());
		
		menuImport(mov, "lead");
		return mov;
	}
	
	//가망 고객 추가 get.
	@RequestMapping(value="lead_single_add" , method=RequestMethod.GET)
	public ModelAndView lead_single_add_get(LeadVO vo) {
		System.out.println("single enter");

		ModelAndView mov = new ModelAndView("leadCRUD");
		mov.addObject("flg", "1");
		return mov;
	}
	 
	//가망 고객 추가 post.
	@RequestMapping(value="lead_single_add" , method=RequestMethod.POST)
	public String lead_single_add_post(LeadVO vo) {
		
		System.out.println("add single ? " + vo.toString());
 		String cust_no = vo.getCust_no() ;
 		
		if(cust_no == null)
		{
			vo.setCust_no(" ");
		}
		
		leadService.lead_insert(vo);
 		
 		System.out.println("lead add success");
 		
		return "redirect:/lead";
	}
	
	//가망 고객 수정 get.
		@RequestMapping(value="lead_update" , method=RequestMethod.GET)
		public ModelAndView lead_update_get(@RequestParam("lead_no") String lead_no){
			 
			ModelAndView mov = new ModelAndView("leadCRUD");
			mov.addObject("detail", leadService.lead_detail(lead_no));
			mov.addObject("flg", "2");
			
			return mov;
		}
	
	//가망 고객 수정 post.
	@RequestMapping(value="lead_update" , method=RequestMethod.POST)
	public String lead_update_post(LeadVO vo){
		String cust_no = vo.getCust_no();
		
		if(cust_no == null)
		{
			vo.setCust_no(" ");
		} 
		leadService.lead_update(vo);
		
		System.out.println("update... ? " + vo.toString());
		
		return "redirect:/lead";
	}
	
	@RequestMapping(value="lead_delete", method=RequestMethod.POST)
	public String lead_delete(String lead_no){
		
		System.out.println("lead no ? " + lead_no);
		
		leadService.lead_delete(lead_no);
		
		return "redirect:/lead";
	}
	
	//조건 검색
	@RequestMapping(value = "/searchKeyword", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> searchKeyword(
			@RequestParam(value = "PageNum", defaultValue = "1") int PageNum,
			String lead_no_srch,
			String lead_name_srch, String cust_no, String emp_no, String contact_day_srch, String rank_cd) {
	
		System.out.println("contact_day_srch ? " + contact_day_srch);
		
		String contact_day;
		
		contact_day = contact_day_srch.replace("-", "");
		 
		
		Map<String, Object> kwMap = new HashMap<String, Object>(); 
 		System.out.println("page num : " + PageNum);
 		kwMap.put("PageNum", PageNum);
		kwMap.put("lead_no_srch", lead_no_srch);
		kwMap.put("lead_name_srch", lead_name_srch);
		kwMap.put("cust_no", cust_no);
		kwMap.put("emp_no", emp_no);
		kwMap.put("contact_day", contact_day);
		kwMap.put("rank_cd", rank_cd);
		
		System.out.println("kwmap? " + kwMap.toString());
		
		// paging
	  PagerVO page = leadService.getLeadListRow(kwMap);
	  kwMap.put("page", page);
		
		
		
		
		List<LeadVO> leadList = leadService.leadSearch(kwMap);
		
		kwMap.put("leadList", leadList);
		
		System.out.println("leadList? " + leadList.toString());
		System.out.println("lead list size?" + leadList.size());
		
		return kwMap;
	}
	
	//고객 팝업 리스트
	@RequestMapping(value="custPopListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> custListPopup(String s_cust_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 담당자리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_cust_name == null || s_cust_name == "")
		{
			List<CustVO> custPopupList = leadService.custPopupList();
			map.put("custPopupList", custPopupList);
			System.out.println("map ?? " + map.toString());
			return map;
		}
		else
		{
			map.put("s_cust_name", s_cust_name);
			List<CustVO> schCustPopupList = leadService.custPopupList(map);
			map.put("custPopupList", schCustPopupList);
			System.out.println("map? " + map.toString());
			return map;
		}
	}
	
	//담당자 팝업 리스트
	@RequestMapping(value="empPopListAjax", method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> empListPopup(String s_emp_name)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 담당자리스트 불러오는 서비스/다오/맵퍼 작성
		if(s_emp_name == null || s_emp_name == "")
		{
			List<EmpVO> empPopupList = leadService.empPopupList();
			map.put("empPopupList", empPopupList);
			
			return map;
		}
		else
		{
			map.put("s_emp_name", s_emp_name);
			List<EmpVO> schEmpPopupList = leadService.empPopupList(map);
			map.put("empPopupList", schEmpPopupList);
			
			return map;
		}
	}
	
	
	//엑셀 출력 
	@RequestMapping(value = "/toLeadExcel",  method=RequestMethod.POST)
	public ModelAndView toExcel(HttpServletRequest req, HttpSession session) {
		int flg=0;
		ModelAndView result = new ModelAndView();
		Map<String, Object> leadMap = new HashMap<String, Object> ();
		
		//taskMap.put("some",req.getParameter("some"));    			// where에 들어갈 조건??
		 
		List<LeadVO> list = leadService.leadExcelExport(leadMap);	// 쿼리
		result.addObject("leadExcelExport", list); 					// 쿼리 결과를 model에 담아줌
		result.setViewName("/lead/leadList_excel");					// 엑셀로 출력하기 위한 jsp 페이지
		 
		return result;
	}
	
	//엑셀 추가 전 팝업
	@RequestMapping(value="/leadExcelImportTab", method=RequestMethod.GET)
	public ModelAndView excelImportTab(HttpSession session, Locale locale,@RequestParam(value = "pageNum", defaultValue = "1") int pageNum)
	{
		System.out.println("ExcelTab Controller");
		ModelAndView mov = new ModelAndView("/lead/excel_import_tab");
		
		return mov;
	}	
		
		
	// Excel Data Import
    @RequestMapping(value = "/leadExcelUploadAjax", headers = "content-type=multipart/*", method = RequestMethod.POST)
    public ModelAndView excelUploadAjax(MultipartHttpServletRequest request)  throws Exception
    {
        MultipartFile excelFile = request.getFile("excelFile");
        System.out.println("excelFile : " + excelFile);
		
        System.out.println("엑셀 파일 업로드 컨트롤러");
       
        if(excelFile==null || excelFile.isEmpty()){
            throw new RuntimeException("엑셀파일을 선택 해 주세요.");
        }
        
        int result = leadService.excelUpload(excelFile);
        System.out.println(result);
        
        return new ModelAndView("/lead/excel_import_tab", "result", result);
    }	

}
