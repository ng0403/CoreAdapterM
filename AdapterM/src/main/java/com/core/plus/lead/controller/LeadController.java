package com.core.plus.lead.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.lead.service.LeadService;
import com.core.plus.lead.vo.LeadVO;

@Controller
public class LeadController {
	
	@Resource
	LeadService leadService;
	
	@RequestMapping(value="lead")
	public ModelAndView lead_list() {
		
		List<LeadVO> vo = leadService.lead_list();
		
		ModelAndView mov = new ModelAndView("lead_list");
		mov.addObject("lead_list", vo);
		
		return mov;
		
	}
	

}
