package com.core.plus.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.test.service.TestService;
import com.core.plus.test.vo.TestVO;

@Controller
public class testController {
	@Autowired
	TestService testService;
	
	@RequestMapping(value="/test")
	public ModelAndView testList(){
		
		List<TestVO> tlist = testService.testList();
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		mav.addObject("name", tlist);
		
		return mav;
	}

}
