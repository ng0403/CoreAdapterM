package com.core.plus.common;

import org.springframework.web.servlet.ModelAndView;

public class Constants {
	
	public static final String STRING_NULL = "";
	public static final String STRING_ZERO = "0";
	public static final String STRING_TRUE = "true";
	public static final String STRING_FALSE = "false";
	public static final String STRING_LF = "\n";
	public static final String STRING_CR = "\r";
	public static final String STRING_QUESTION = "?";
	public static final String STRING_EQUAL = "=";

	/**
	 * 세션 관련 문자열
	 */
	// 사용자 ID
	public static final String SESSION_USER_ID = "user";
	// 사용자명
	public static final String SESSION_USER_NM = "VAN_PROJ_USER_NM";
	// 접근권한코드
	public static final String SESSION_ACS_AUTH_CD = "VAN_PROJ_ACS_AUTH_CD";
	// 메뉴ID
	public static final String SESSION_SUB_MENU_ID = "subMenuId";
	
	/**
	 * 사용자 테이블(TB_COM_USER)
	 */
	// 사용자ID
	public static final String TABLE_COM_USER_USER_ID = "user_id";
	// 사용자명
	public static final String TABLE_COM_USER_USER_NM = "user_nm";
	// 사용자 비밀번호
	public static final String TABLE_COM_USER_PWD_NO = "pwd_no";
	// 사용자 비밀번호 오류 횟수
	public static final String TABLE_COM_USER_PWD_ERNM_YN = "pwd_ernm_yn";
	// 접근권한코드
	public static final String TABLE_COM_USER_ACS_AUTH_CD = "acs_auth_cd";
	
	/**
	 * 페이지 정보 (JSP)
	 */
	// 로그인 페이지
	public static final String LOGIN_PAGE = "/login/login";
				
	/**
	 * 페이지 정보 (Controller)
	 */
	// 로그인 페이지 리다이렉트
	public static final ModelAndView REDIRECT_LOGIN_ACTION = new ModelAndView("redirect:/sessionExpire");

	/**
	 * 접근권한코드
	 */
	// 관리자
	public static final String ACS_AUTH_CD_MANAGER = "M";
	// 운영자
	public static final String ACS_AUTH_CD_OPERATOR = "O";
		
	/**
	 * LOCATION 정보
	 */
	// LoginAction 패키지 정보
	public static final String PACKAGE_LOGIN_ACTION = "ibs.mid.bon.manager.login.controller.LoginController";

	/**
	 * 사용자 비밀번호 오류횟수 제한
	 */
	public static final int MAX_PWD_ERNM = 3;
	
	/**
	 * 로그인 결과 메세지
	 */
	// 로그인 성공
	public static final String LOGIN_SUCCESS = "LOGIN_SUCCESS";
	// 로그인 실패
	public static final String LOGIN_FAIL = "LOGIN_FAIL";
	// 로그인 비밀번호 입력 3회 오류 
	public static final String LOGIN_DENINED = "LOGIN_DENINED";
}
