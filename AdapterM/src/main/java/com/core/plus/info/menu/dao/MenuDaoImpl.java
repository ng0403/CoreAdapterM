package com.core.plus.info.menu.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.core.plus.info.menu.vo.MenuVo;

@Repository
public class MenuDaoImpl implements MenuDao {

	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	
	public void setSqlSessionTemplate(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	//상위메뉴 리스트
	@Override
	public List<MenuVo> getMenuList(Map<String, Object> map) {
		List<MenuVo> menu = null;
		try{
			menu = sqlSession.selectList("menuList", map); //"" 안은 mapper select id 이름
		} catch(Exception e){
			e.printStackTrace();
		}
		return menu;
	}
	
	//하위메뉴 리스트
	@Override
	public List<MenuVo> getMenuDownList(Map<String, Object> map) {
		List<MenuVo> menu = null;
		try{
			menu = sqlSession.selectList("menuDownList", map); //"" 안은 mapper select id 이름
		} catch(Exception e){
			e.printStackTrace();
		}
		return menu;
	}

	//메뉴 상세정보
	@Override
	public MenuVo getMenuDetail(String menu_id) {
		MenuVo vo = null;
		try {
			vo = sqlSession.selectOne("menuDetail", menu_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return vo;
	}

	//메뉴 추가
	@Override
	public int getMenuInsert(MenuVo menuVo) {
		int result = 0;
//		String menu_id; //menu_id 값 가져오기위함 (시퀀스로 DB에서 증가해서)
//		String auth_id; //auth_id 값 가져오기위함 (시퀀스로 DB에서 증가해서)
		try {
			result += sqlSession.insert("menuInsert" , menuVo); //메뉴 추가
			
//			menu_id = sqlSession.selectOne("Select_menu_id");  //메뉴id 
//			auth_id = sqlSession.selectOne("Select_auth_id");  //권한id
			
//			menuVo.setMenu_id(menu_id);  //vo에 셋팅!
//			menuVo.setAuth_id(auth_id);  //vo에 셋팅!
			
//			result += sqlSession.insert("menuInsert1", menuVo); //메뉴권한 추가
			
//			System.out.println("메뉴 dao의 menu_id : " + menu_id);
//			System.out.println("메뉴 dao의 auth_id : " + auth_id);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	//현재 menu_id호출
	@Override
	public String getMenuId(){
		String menu_id = sqlSession.selectOne("Select_menu_id");
		return menu_id;
	}

	//메뉴 추가의 상위메뉴 버튼 검색 리스트
	@Override
	public List<MenuVo> getUpMenuList() {
		List<MenuVo> upMenuList = null;
		try{
			upMenuList = sqlSession.selectList("upMenuList"); //"" 안은 mapper id 이름
		} catch(Exception e){
			e.printStackTrace();
		}
		return upMenuList;
	}

	//메뉴 삭제
	@Override
	public int getMenuDelete(MenuVo menuVo) {
		int menuDel_result = 0;
		try {
//			menuDel_result = sqlSession.update("menuDelete1", menuVo); //"" 안은 mapper id 이름
			menuDel_result = sqlSession.update("menuDelete", menuVo); 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menuDel_result;
	}

	//메뉴 수정
	@Override
	public int getMenuUpdate(MenuVo menuVo) {
		int menuMdf_result = 0;
		int menuMdf = 0;
		String menu_id;
		String seq_no;
		try {
			menu_id = sqlSession.selectOne("SelectMenuId", menuVo.getMenu_id()); //선택한 id의 상위메뉴 id
			System.out.println("과연 : " +menu_id);
			seq_no = sqlSession.selectOne("SelectSeqNo", menuVo.getMenu_id()); //선택한 id의 seq_no
			System.out.println("두둥 : " +seq_no);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("menu_id", menu_id);
			map.put("seq_no", seq_no);
			menuMdf += sqlSession.update("menuSeqUpdate", map);
			
			menuMdf_result += sqlSession.update("menuUpdate", menuVo); //"" 안은 mapper id 이름
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menuMdf_result;
	}

	//메뉴권한 리스트
	@Override
	public List<MenuVo> getAuthMenuList(Map<String, Object> map) {
		List<MenuVo> authmenuList = null;
		try {
			authmenuList = sqlSession.selectList("authmenuList", map); //"" 안은 mapper select id 이름
		} catch (Exception e) {
			e.printStackTrace();
		}
		return authmenuList;
	}
	
	//메뉴권한 추가
	@Override
	public int getAuthMenuInsert1(String menu_id, String auth_id, String crt_yn, String mdfy_yn, String del_yn, String rtrv_yn, MenuVo menuVo) {
		int authmenu_result1 = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("menu_id", menu_id);
		map.put("auth_id", auth_id);
		map.put("rtrv_yn", rtrv_yn);
		map.put("crt_yn", crt_yn);
		map.put("mdfy_yn", mdfy_yn);
		map.put("del_yn", del_yn);
		map.put("crt_id", menuVo.getCrt_id());map.put("crt_dt", menuVo.getCrt_dt());
		map.put("mdfy_id", menuVo.getMdfy_id());map.put("mdfy_dt", menuVo.getMdfy_dt());
		try {
			authmenu_result1 += sqlSession.insert("authmenuInsert1" , map); //메뉴권한 추가
			System.out.println("메뉴 dao의 menu_id : " + menu_id + " , " + crt_yn+ " , " + mdfy_yn + " , " + del_yn + " , " + rtrv_yn);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return authmenu_result1;
	}
	
	//메뉴레벨 코드
	@Override
	public List<MenuVo> getMenuLevCode() {
		List<MenuVo> menulevCode = null;
		try {
			menulevCode = sqlSession.selectList("menuLevCode");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menulevCode;
	}

	//메뉴 체크 삭제 (여러개 삭제)
	@Override
	public int getMenuChkDelete(String[] menu_id) {
		int menuChkDel_result = 0;
		int resultTemp = 0;
		try {
			for(int i=0; i<menu_id.length; i++){
				resultTemp += sqlSession.update("menuChkDelete1", menu_id[i]);
				resultTemp += sqlSession.update("menuChkDelete", menu_id[i]);
				menuChkDel_result += resultTemp;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menuChkDel_result;
	}

	//권한 메뉴 체크 삭제 (여러개 삭제)
	@Override
	public int getAuthMenuChkDelete(String[] menu_id, String auth_id) {
		int authChkDel_result = 0;
		int resultTemp = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("menu_id", menu_id);
		map.put("auth_id", auth_id);
		
		menu_id = (String[]) map.get("menu_id"); //map으로 넣은 menu_id 배열로 선언
		try {
			for(int i=0; i<menu_id.length; i++){
				map.put("menu_id", menu_id[i]);
				resultTemp += sqlSession.delete("authmenuChkDelete1", map);
				authChkDel_result += resultTemp;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return authChkDel_result;
	}

	//메뉴 modal 리스트
	@Override
	public List<MenuVo> getMenuModalList(Map<String, Object> map) {
		List<MenuVo> menumodalList = null;
		try {
			menumodalList = sqlSession.selectList("menuModalList", map); //"" 안은 mapper select id 이름
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menumodalList;
	}

	//트리구조
	@Override
	public List<MenuVo> getMenuTree(Map<String, Object> map) {
		List<MenuVo> menuTree = null;
		try{
			menuTree = sqlSession.selectList("menuTree", map); //"" 안은 mapper select id 이름
		} catch(Exception e){
			e.printStackTrace();
		}
		return menuTree;
	}

	//메인메뉴 그리기
	@Override
	public List<MenuVo> getMainMenuList(String user_id) {
		List<MenuVo> getMainMenuList = null;
		try{
			getMainMenuList = sqlSession.selectList("selectMainMenuList",user_id);
		} catch(Exception e){
			e.printStackTrace();
		}
		return getMainMenuList;
	}
	
	//메인메뉴 그리기
	@Override
	public List<MenuVo> getMainMenuList() {
		List<MenuVo> getMainMenuList = null;
		try{
			getMainMenuList = sqlSession.selectList("selectMainMenuList");
		} catch(Exception e){
			e.printStackTrace();
		}
		return getMainMenuList;
	}
	
	//서브메뉴 그리기
	@Override
	public List<MenuVo> getSubMenuList(Map<String, String> menuAuthMap) {
		List<MenuVo> getSubMenuList = null;
		try{
			getSubMenuList = sqlSession.selectList("selectSubMenuList", menuAuthMap); 
		} catch(Exception e){
			e.printStackTrace();
		}
		return getSubMenuList;
	}

	// 메뉴 주소 가져올 메뉴 아이디 가져오기
	@Override
	public String getMenuUrlID(String url) {
		String menu_id = "";
		try {
			menu_id = sqlSession.selectOne("getMenuUrlID", url);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menu_id;
	}

	//상위메뉴 편집 저장
	@Override
	public int getMenuUpdateSave(Map<String, Object> map) {
		int menuUpdateSave = 0;
		try {
			menuUpdateSave = sqlSession.update("menuUpdateSave", map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menuUpdateSave;
	}

	//하위메뉴 편집 저장
	@Override
	public int getMenudownUpdateSave(Map<String, Object> map) {
		int menudownUpdateSave = 0;
		try {
			menudownUpdateSave = sqlSession.update("menuUpdateSave", map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return menudownUpdateSave;
	}

}
