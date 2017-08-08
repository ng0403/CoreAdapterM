package com.core.plus.info.menu.service;

import java.util.List;
import java.util.Map;

import com.core.plus.info.menu.vo.MenuVo;

public interface MenuService {

	//상위메뉴 리스트
	List<MenuVo> getMenuList(Map<String, Object> map);
	
	//하위메뉴 리스트
	List<MenuVo> getMenuDownList(Map<String, Object> map);

	//메뉴 상세정보
	MenuVo getMenuDetail(String menu_id);

	//메뉴 추가
	int getMenuInsert(MenuVo menuVo);
	
	//메뉴ID조회
	public String getMenuId();
	
	//메뉴 추가의 상위메뉴 버튼 검색 리스트
	List<MenuVo> getUpMenuList();

	//메뉴 삭제
	int getMenuDelete(MenuVo menuVo);

	//메뉴 수정
	int getMenuUpdate(MenuVo menuVo);

	//메뉴권한 리스트
	List<MenuVo> getAuthMenuList(Map<String, Object> map);
	
	//메뉴권한 추가
	int getAuthMenuInsert1(String menu_id, String auth_id, String rtrv_yn, String crt_yn, String mdfy_yn, String del_yn, MenuVo menuVo);
	
	//메뉴레벨 코드
	List<MenuVo> getMenuLevCode();

	//메뉴 체크 삭제 (여러개 삭제)
	int getMenuChkDelete(String[] menu_id);

	//권한 메뉴 체크 삭제 (여러개 삭제)
	int getAuthMenuChkDelete(String[] menu_id, String auth_id);

	//메뉴 modal 리스트
	List<MenuVo> getMenuModalList(Map<String, Object> map);

	//트리구조
	List<MenuVo> getMenuTree(Map<String, Object> map);

	//메인메뉴 그리기
	List<MenuVo> getMainMenuList(String user_id);
	
	List<MenuVo> getMainMenuList();
	
	//서브메뉴 그리기
	List<MenuVo> getSubMenuList(Map<String, String> menuAuthMap);

	// 메뉴 주소 가져올 메뉴 아이디 가져오기
	String getMenuUrlID(String url);

	//상위메뉴 편집 저장
	int menuUpdateSave(Map<String, Object> map);

	//하위메뉴 편집 저장
	int menudownUpdateSave(Map<String, Object> map);


}
