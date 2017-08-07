package com.core.plus.info.menu.vo;

public class MenuVo {
	
	private String menu_id;		//메뉴id
	private String menu_nm;		//메뉴이름
	private String menu_url;	//메뉴url
	private String menu_lev;	//메뉴레벨
	private String menu_lev_cd_nm; //메뉴레벨이름
	private String up_menu_id;	//상위메뉴id
	private String act_yn;		//활성화여부
	private String crt_id;		//생성자id
	private String crt_dt;		//생성일시
	private String mdfy_id;		//수정자id
	private String mdfy_dt;		//수정일시
	
	private String rtrv_yn;     //조회권한여부
	private String crt_yn;		//생성권한여부
	private String mdfy_yn;		//수정권한여부
	private String del_yn;		//삭제권한여부
	
	private String auth_id;     //권한id
	private String up_id;       //상위메뉴id로 출력
	
	private String user_id;     //사용자id
	private int seq_no;     //사용자id
	
	private String mi;
	
	public int getSeq_no() {
		return seq_no;
	}

	public void setSeq_no(int seq_no) {
		this.seq_no = seq_no;
	}

	public String getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}

	public String getMenu_nm() {
		return menu_nm;
	}

	public void setMenu_nm(String menu_nm) {
		this.menu_nm = menu_nm;
	}

	public String getMenu_url() {
		return menu_url;
	}

	public void setMenu_url(String menu_url) {
		this.menu_url = menu_url;
	}

	public String getMenu_lev() {
		return menu_lev;
	}

	public void setMenu_lev(String menu_lev) {
		this.menu_lev = menu_lev;
	}

	public String getUp_menu_id() {
		return up_menu_id;
	}

	public void setUp_menu_id(String up_menu_id) {
		this.up_menu_id = up_menu_id;
	}

	public String getAct_yn() {
		return act_yn;
	}

	public void setAct_yn(String act_yn) {
		this.act_yn = act_yn;
	}

	public String getCrt_id() {
		return crt_id;
	}

	public void setCrt_id(String crt_id) {
		this.crt_id = crt_id;
	}

	public String getCrt_dt() {
		return crt_dt;
	}

	public void setCrt_dt(String crt_dt) {
		this.crt_dt = crt_dt;
	}

	public String getMdfy_id() {
		return mdfy_id;
	}

	public void setMdfy_id(String mdfy_id) {
		this.mdfy_id = mdfy_id;
	}

	public String getMdfy_dt() {
		return mdfy_dt;
	}

	public void setMdfy_dt(String mdfy_dt) {
		this.mdfy_dt = mdfy_dt;
	}

	public String getRtrv_yn() {
		return rtrv_yn;
	}

	public void setRtrv_yn(String rtrv_yn) {
		this.rtrv_yn = rtrv_yn;
	}

	public String getCrt_yn() {
		return crt_yn;
	}

	public void setCrt_yn(String crt_yn) {
		this.crt_yn = crt_yn;
	}

	public String getMdfy_yn() {
		return mdfy_yn;
	}

	public void setMdfy_yn(String mdfy_yn) {
		this.mdfy_yn = mdfy_yn;
	}

	public String getDel_yn() {
		return del_yn;
	}

	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}

	public String getAuth_id() {
		return auth_id;
	}

	public void setAuth_id(String auth_id) {
		this.auth_id = auth_id;
	}

	public String getUp_id() {
		return up_id;
	}

	public void setUp_id(String up_id) {
		this.up_id = up_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getMenu_lev_cd_nm() {
		return menu_lev_cd_nm;
	}

	public void setMenu_lev_cd_nm(String menu_lev_cd_nm) {
		this.menu_lev_cd_nm = menu_lev_cd_nm;
	}

	public String getMi() {
		return mi;
	}

	public void setMi(String mi) {
		this.mi = mi;
	}
}
	
	