package com.core.plus.lead.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.lead.service.LeadService;
import com.core.plus.lead.vo.LeadVO;

@Controller
public class LeadController {
	
	@Resource
	LeadService leadService;
	
	
	//초기 list 출력
	@RequestMapping(value="lead")
	public ModelAndView lead_list() {
		System.out.println("entering");
		List<LeadVO> vo = leadService.lead_list();
		
		ModelAndView mov = new ModelAndView("lead_list");
		mov.addObject("lead_list", vo);
		
		System.out.println("mov ?  " + mov.toString());
		return mov;
		
	}
	
	//가망 고객 상세정보
	@RequestMapping(value="lead_detail", method={RequestMethod.GET,RequestMethod.POST})
	public ModelAndView lead_detail(@RequestParam("lead_no") String lead_no){ 
	 
		ModelAndView mov = new ModelAndView("leadCRUD");
		mov.addObject("detail", leadService.lead_detail(lead_no));
		mov.addObject("flg", "0");
		System.out.println(mov.toString());
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
 		String cust_no = null;
 		
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
	public @ResponseBody Map<String, Object> searchKeyword(String lead_no_srch,
			String lead_name_srch, String cust_no, String emp_no, String contact_day_srch, String rank_cd) {
	
		System.out.println("contact_day_srch ? " + contact_day_srch);
		
		String contact_day;
		
		contact_day = contact_day_srch.replace("-", "");
		 
		
		Map<String, Object> kwMap = new HashMap<String, Object>(); 
		kwMap.put("lead_no_srch", lead_no_srch);
		kwMap.put("lead_name_srch", lead_name_srch);
		kwMap.put("cust_no", cust_no);
		kwMap.put("emp_no", emp_no);
		kwMap.put("contact_day", contact_day);
		kwMap.put("rank_cd", rank_cd);
		
		System.out.println("kwmap? " + kwMap.toString());
		
		List<LeadVO> leadList = leadService.leadSearch(kwMap);
		
		kwMap.put("leadList", leadList);
		
		System.out.println("leadList? " + leadList.toString());
		
		
		return kwMap;
	}

}
