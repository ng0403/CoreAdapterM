/*
업 무 명 : 메뉴관리
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/07/29
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/07/29
내 용 : 메뉴관리에 대한 서버 부분이다.
*참고사항 : 
*/

package com.core.plus.info.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.core.plus.info.menu.service.MenuService;
import com.core.plus.info.menu.vo.MenuVo;

@Controller
public class MenuController {
	
	@Autowired
	MenuService menuService;
	
//	@Resource
//	LoginDao loginDao;
	
	@Autowired
	private HttpSession session;
	
	//기준정보 메뉴관리 리스트
//	@RequestMapping(value="/menu")
//	public ModelAndView MenuList(HttpSession session, @RequestParam Map<String, Object> map,
//			@RequestParam(value = "menuSearch", defaultValue = "") String menuSearch
//			, @RequestParam(value = "seq_no", defaultValue = "1") int seq_no
//			, String menu_id, String main_menu_id){
//		
//		ModelAndView mov = new ModelAndView("menu");
//		mov.addObject("main_menu_url", "org");
//		mov.addObject("sub_menu_url", "menu");
//		
//		//메뉴 그리기
//		menuImport(mov, "menu");
//		
//		List<MenuVo> menuList = menuService.getMenuList(map); //상위메뉴리스트
//		map.put("seq_no", seq_no);
//		List<MenuVo> menudownList = menuService.getMenuDownList(map); //하위메뉴리스트
//		List<MenuVo> menuTree = menuService.getMenuTree(map); //메뉴트리보기위한 리스트
//		
//		MenuVo menuVo = menuService.getMenuDetail(menu_id);
//		
//		List<MenuVo> upmenuList = menuService.getUpMenuList();   //메뉴상세정보의 상위메뉴 검색버튼 > 리스트
//		List<MenuVo> menuLevCode = menuService.getMenuLevCode(); //메뉴레벨코드 리스트
//		
//		map = new HashMap<String, Object>();
//		
//		map.put("menuSearch", menuSearch);
//		
//		mov.addObject("menuList", menuList);  //"" 안은 for each의 items 이름
//		mov.addObject("menudownList", menudownList);  
//		mov.addObject("menuSearch", menuSearch);
//		mov.addObject("menuTree", menuTree);
//		
//		mov.addObject("menuLevCode", menuLevCode);
//		mov.addObject("menuVo", menuVo);
//		mov.addObject("upmenuList", upmenuList);
//		
//		//메뉴리스트 추가
//		if (menu_id == "") {
//			mov.addObject("menuList_add", 1);
//			menuImport(mov, "menu");
//			return mov;
//		}
//
//		return mov;
//	}
	
	//메뉴id 눌렀을 때 하위메뉴 상세정보
//	@RequestMapping(value="/MenuDownDetailAjax" , method=RequestMethod.POST)
//	public @ResponseBody Map<String, Object> MenuDetail(String menu_id){
//		MenuVo menuVo = menuService.getMenuDetail(menu_id);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("menuVo", menuVo);
//		return map;
//	}
	
	//상위메뉴 편집 저장
//	@RequestMapping(value="/menuUpdateSaveAjax" , method=RequestMethod.POST)
//	public @ResponseBody int menuUpdateSave(String menu_id, String seq_no){
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("menu_id", menu_id);
//		map.put("seq_no", seq_no);
//		int menuUpdateSave = menuService.menuUpdateSave(map);
//		return menuUpdateSave;
//	}
	
	//하위메뉴 편집 저장
//	@RequestMapping(value="/menudownUpdateSaveAjax" , method=RequestMethod.POST)
//	public @ResponseBody int menudownUpdateSave(String menu_id, String seq_no){
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("menu_id", menu_id);
//		map.put("seq_no", seq_no);
//		int menudownUpdateSave = menuService.menudownUpdateSave(map);
//		return menudownUpdateSave;
//	}
	
	//메뉴 추가
//	@RequestMapping(value = "/menuInsert" , method = RequestMethod.POST)
//	public ModelAndView MenuInsert(HttpSession session, MenuVo menuVo, String main_menu_id) {
//		ModelAndView mov = new ModelAndView("menu");
//		mov.addObject("main_menu_url", "org");
//		mov.addObject("sub_menu_url", "menu");
//		
//		//등록, 수정자 ID 세팅
//		String user_id = session.getAttribute("user").toString();
//		menuVo.setCrt_id(user_id);
//		menuVo.setMdfy_id(user_id);
//		
//		//메뉴그리기
//		menuImport(mov, "menu");
//		
//		int authMenuResult = 0;
//		String menu_id = "";
//		int result = menuService.getMenuInsert(menuVo);
//		if("admin".equals(user_id)){
//			menu_id = menuService.getMenuId();
//			authMenuResult = menuService.getAuthMenuInsert1(menu_id, "AU00001"
//								, "Y", "Y", "Y", "Y", menuVo);
//			
//		}
//		System.out.println(menuVo.getMenu_id());
//		List<MenuVo> menuLevCode = menuService.getMenuLevCode(); //메뉴레벨코드 리스트
//		mov.addObject("menuLevCode", menuLevCode);
//		
//		mov.addObject("result", result);
//		mov.addObject("authMenuResult", authMenuResult);
//		mov.addObject("menu_id", menuVo.getMenu_id());
//		mov.addObject("menuVo", menuVo);
//		
//		return mov;
//	}
	
	//메뉴 삭제
//	@RequestMapping(value = "/menuDelete", method=RequestMethod.POST)
//	public ModelAndView MenuDelete(HttpSession session, MenuVo menuVo, String main_menu_id){
//		ModelAndView mov = new ModelAndView("menu");
//		mov.addObject("main_menu_url", "org");
//		mov.addObject("sub_menu_url", "menu");
//		
//		//메뉴 그리기
//		menuImport(mov, "menu");
//		
//		System.out.println("메뉴삭제 : " +menuVo.getMi());
//		int menuDel_result = menuService.getMenuDelete(menuVo);
//		mov.addObject("menuDel_result", menuDel_result);
//		
//		return mov;
//	}
	
	//메뉴 체크 삭제 (여러개 삭제)
//	@RequestMapping(value = "/menuChkDelete", method=RequestMethod.POST)
//	public ModelAndView MenuChkDelete(HttpSession session, String[] menu_id, String main_menu_id){
//		
//		ModelAndView mov = new ModelAndView("menu");
//		mov.addObject("main_menu_url", "org");
//		mov.addObject("sub_menu_url", "menu");
//		
//		//메뉴 그리기
//		menuImport(mov, "menu");
//		
//		int menuChkDel_result = menuService.getMenuChkDelete(menu_id);
//		mov.addObject("menuChkDel_result", menuChkDel_result);
//		
//		return mov;
//	}
	
	//메뉴 수정
//	@RequestMapping(value = "/menuUpdate", method=RequestMethod.POST)
//	public ModelAndView MenuUpdate(HttpSession session, MenuVo menuVo, String main_menu_id){
//		
//		ModelAndView mov = new ModelAndView("menu");
//		mov.addObject("main_menu_url", "org");
//		mov.addObject("sub_menu_url", "menu");
//		
//		//수정자 ID 가져오기
//		String user_id = session.getAttribute("user").toString();
//		
//		//메뉴 그리기
//		menuImport(mov, "menu");
//		
//		List<MenuVo> menuLevCode = menuService.getMenuLevCode(); //메뉴레벨코드 리스트
//		mov.addObject("menuLevCode", menuLevCode);
//		
//		int menuMdf_result = menuService.getMenuUpdate(menuVo);
//		
//		mov.addObject("menuMdf_result", menuMdf_result);
//		mov.addObject("menu_id", menuVo.getMenu_id());
//		
//		return mov;
//	}
	
	// 메뉴 가져오기
	public void menuImport(ModelAndView mav, String url){
		String menu_id = menuService.getMenuUrlID(url);
		String user_id = session.getAttribute("user").toString();
			
		// 메뉴에 따른 권한 주기
		Map<String, String> menuAuthMap = new HashMap<String, String>();
		menuAuthMap.put("menu_url", url);
		menuAuthMap.put("user_id", user_id);
		menuAuthMap.put("menu_id", menu_id);
//		MenuVo menuAuth = loginDao.getMenuAuthInfo(menuAuthMap);
//		mav.addObject("menuAuth", menuAuth);
			
		//메뉴 그리기
		List<MenuVo> mainMenuList = menuService.getMainMenuList(user_id);
		List<MenuVo> subMenuList = menuService.getSubMenuList(menuAuthMap);
		mav.addObject("mainMenuList", mainMenuList);  //mainMenuList
		mav.addObject("subMenuList", subMenuList);    //subMenuList
	}
}
