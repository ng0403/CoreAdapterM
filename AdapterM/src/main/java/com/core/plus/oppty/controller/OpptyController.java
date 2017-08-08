package com.core.plus.oppty.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.oppty.service.OpptyService;
import com.core.plus.oppty.vo.OpptyVO;

@Controller
public class OpptyController {
	
	@Resource
	OpptyService opptyService;
	
	// 처음 list 화면
	@RequestMapping(value="oppty")
	public ModelAndView oppty_list()
	{
		List<OpptyVO> vo = opptyService.opptyList();
		List<OpptyVO> status = opptyService.opptyStatusCD();
		List<OpptyVO> stage = opptyService.opptyStageCD();
		List<OpptyVO> dtype = opptyService.opptyDtypeCD();
		List<OpptyVO> purchase = opptyService.opptyPerchaseType();
		
		System.out.println("status : " + status);
		
		ModelAndView mov = new ModelAndView("oppty_list");
		
		mov.addObject("oppty_list", vo);
		mov.addObject("oppty_status_cd", status);
		mov.addObject("oppty_stage_cd", stage);
		mov.addObject("dtype_cd", dtype);
		mov.addObject("purchase_type", purchase);
		
		return mov;
	}

}
