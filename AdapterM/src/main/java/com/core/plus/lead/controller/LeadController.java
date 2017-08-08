package com.core.plus.lead.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
		
		List<LeadVO> vo = leadService.lead_list();
		
		ModelAndView mov = new ModelAndView("lead_list");
		mov.addObject("lead_list", vo);
		
		return mov;
		
	}
	
	//가망 고객 상세정보
	@RequestMapping(value="lead_detail")
	public ModelAndView lead_detail(@RequestParam("lead_no") String lead_no){
		
		
		leadService.lead_detail(lead_no);
		
		ModelAndView mov = new ModelAndView("lead_detail");
		
		
		return mov;
	}
	
	
	//가망 고객 추가.
	@RequestMapping(value="lead_insert")
	public void lead_insert(LeadVO vo) {
		
		leadService.lead_insert(vo);
		
	}
	
	//가망 고객 수정.
	@RequestMapping(value="lead_update")
	public void lead_update(LeadVO vo){
		
		leadService.lead_update(vo);
	}
	
	 
	 

}
