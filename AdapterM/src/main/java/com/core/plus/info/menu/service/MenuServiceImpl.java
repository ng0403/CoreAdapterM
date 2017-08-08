package com.core.plus.info.menu.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.core.plus.info.menu.dao.MenuDao;
import com.core.plus.info.menu.vo.MenuVo;

@Service("MenuService")
public class MenuServiceImpl implements MenuService {

	@Autowired
	MenuDao dao;
	
	//상위메뉴 리스트
	@Override
	public List<MenuVo> getMenuList(Map<String, Object> map) {
		List<MenuVo> menu = dao.getMenuList(map);
		return menu;
	}
	
	//하위메뉴 리스트
	@Override
	public List<MenuVo> getMenuDownList(Map<String, Object> map) {
		List<MenuVo> menu = dao.getMenuDownList(map);
		return menu;
	}

	//메뉴 상세정보
	@Override
	public MenuVo getMenuDetail(String menu_id) {
		MenuVo vo = dao.getMenuDetail(menu_id);
		return vo;
	}

	//메뉴 추가
	@Override
	public int getMenuInsert(MenuVo menuVo) {
		int result = dao.getMenuInsert(menuVo);
		return result;
	}
	
	//메뉴ID조회
	@Override
	public String getMenuId() {
		String result = dao.getMenuId();
		return result;
	}
	
	//메뉴 추가의 상위메뉴 버튼 검색 리스트
	@Override
	public List<MenuVo> getUpMenuList() {
		List<MenuVo> upMenuList = dao.getUpMenuList();
		return upMenuList;
	}

	//메뉴 삭제
	@Override
	public int getMenuDelete(MenuVo menuVo) {
		int menuDel_result = dao.getMenuDelete(menuVo);
		return menuDel_result;
	}

	//메뉴 수정
	@Override
	public int getMenuUpdate(MenuVo menuVo) {
		int result = dao.getMenuUpdate(menuVo);
		return result;
	}

	//메뉴권한 리스트
	@Override
	public List<MenuVo> getAuthMenuList(Map<String, Object> map) {
		List<MenuVo> authmenuList = dao.getAuthMenuList(map);
		return authmenuList;
	}
	
	//메뉴권한 추가
	@Override
	public int getAuthMenuInsert1(String menu_id, String auth_id, String rtrv_yn, String crt_yn, String mdfy_yn, String del_yn, MenuVo menuVo) {
		int authmenu_result1 = dao.getAuthMenuInsert1(menu_id, auth_id, rtrv_yn, crt_yn, mdfy_yn, del_yn, menuVo);
		return authmenu_result1;
	}
	
	//메뉴레벨 코드
	@Override
	public List<MenuVo> getMenuLevCode() {
		List<MenuVo> menulevCode = dao.getMenuLevCode();
		return menulevCode;
	}

	//메뉴 체크 삭제 (여러개 삭제)
	@Override
	public int getMenuChkDelete(String[] menu_id) {
		int menuChkDel_result = dao.getMenuChkDelete(menu_id);
		return menuChkDel_result;
	}

	//권한 메뉴 체크 삭제 (여러개 삭제)
	@Override
	public int getAuthMenuChkDelete(String[] menu_id, String auth_id) {
		int authChkDel_result = dao.getAuthMenuChkDelete(menu_id, auth_id);
		return authChkDel_result;
	}

	//메뉴 modal 리스트
	@Override
	public List<MenuVo> getMenuModalList(Map<String, Object> map) {
		List<MenuVo> menumodalList = dao.getMenuModalList(map);
		return menumodalList;
	}
	
	//트리구조
	@Override
	public List<MenuVo> getMenuTree(Map<String, Object> map) {
		List<MenuVo> menuTree = dao.getMenuTree(map);
		return menuTree;
	}
	
	//메인메뉴 그리기
	@Override
	public List<MenuVo> getMainMenuList(String user_id) {
		List<MenuVo> getMainMenuList = dao.getMainMenuList(user_id);
		return getMainMenuList;
	}
	
	//메인메뉴 그리기
	@Override
	public List<MenuVo> getMainMenuList() {
		List<MenuVo> getMainMenuList = dao.getMainMenuList();
		return getMainMenuList;
	}
	
	//서브메뉴 그리기
	@Override
	public List<MenuVo> getSubMenuList(Map<String, String> menuAuthMap) {
		List<MenuVo> getSubMenuList = dao.getSubMenuList(menuAuthMap);
		return getSubMenuList;
	}
	
	// 메뉴 주소 가져올 메뉴 아이디 가져오기
	@Override
	public String getMenuUrlID(String url) {
		String menu_id = dao.getMenuUrlID(url);
		return menu_id;
	}

	//상위메뉴 편집 저장
	@Override
	public int menuUpdateSave(Map<String, Object> map) {
		int menuUpdateSave = dao.getMenuUpdateSave(map);
		return menuUpdateSave;
	}

	//하위메뉴 편집 저장
	@Override
	public int menudownUpdateSave(Map<String, Object> map) {
		int menudownUpdateSave = dao.getMenudownUpdateSave(map);
		return menudownUpdateSave;
	}

}
