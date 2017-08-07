package com.core.plus.test.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.test.service.TestService;
import com.core.plus.test.vo.TestVO;
import com.core.plus.info.menu.controller.*;

@Controller
public class testController {
	
	@Resource
	TestService testService;
	
	@RequestMapping(value="/test")
	public ModelAndView testList(){
		List<TestVO> tlist = testService.testList();
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		mav.addObject("tlist", tlist);
		
		menuImport(mav,"test");
		
		return mav;
	}

}
