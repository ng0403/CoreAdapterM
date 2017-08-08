package com.core.plus.test.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.test.service.TestService;
import com.core.plus.test.vo.TestVO;

import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;

@Controller
public class testController {
	
	@Resource
	TestService testService;
	
	@Resource
	MenuService menuService;
	
	@RequestMapping(value="/test")
	public ModelAndView testList(){
		List<TestVO> tlist = testService.testList();
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		mav.addObject("tlist", tlist);
		
		menuImport(mav,"test");
		
		return mav;
	}
	
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

}
