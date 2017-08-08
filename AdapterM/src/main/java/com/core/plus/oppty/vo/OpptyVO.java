package com.core.plus.oppty.vo;

public class OpptyVO {
	
	private String oppty_no; 		// 기회번호
	private String create_date; 	// 등록일시
	private String update_date; 	// 수정일시
	private String oppty_name; 		// 기회명
	private String cust_no; 		// 고객번호
	private String cust_name;		// 고객이름
	private String emp_no; 			// 담당자번호
	private String emp_name;		// 담당자이름
	private String oppty_status_cd; // 기회상태구분
	private String oppty_stage_cd; 	// 기회단계구분
	private String exp_close_day; 	// 예상종료일자
	private String dtype_cd; 		// 분류코드
	private String sur_plan_cn; 	// 시/수술계획
	private String purchase_type; 	// 구매형태구분
	private String payment_cd; 		// 결제처구분
	private String rec_per_cd; 		// 소개자코드
	private String remark_cn; 		// 특이사항
	private int score; 				// 점수

	// 공통코드에서 불러오기 위한 변수
	private String code_no;
	private String code;
	private String code_name;

	public String getOppty_no() {
		return oppty_no;
	}

	public void setOppty_no(String oppty_no) {
		this.oppty_no = oppty_no;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}

	public String getUpdate_date() {
		return update_date;
	}

	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}

	public String getOppty_name() {
		return oppty_name;
	}

	public void setOppty_name(String oppty_name) {
		this.oppty_name = oppty_name;
	}

	public String getCust_no() {
		return cust_no;
	}

	public void setCust_no(String cust_no) {
		this.cust_no = cust_no;
	}

	public String getCust_name() {
		return cust_name;
	}

	public void setCust_name(String cust_name) {
		this.cust_name = cust_name;
	}

	public String getEmp_no() {
		return emp_no;
	}

	public void setEmp_no(String emp_no) {
		this.emp_no = emp_no;
	}
	
	public String getEmp_name() {
		return emp_name;
	}

	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	public String getOppty_status_cd() {
		return oppty_status_cd;
	}

	public void setOppty_status_cd(String oppty_status_cd) {
		this.oppty_status_cd = oppty_status_cd;
	}

	public String getOppty_stage_cd() {
		return oppty_stage_cd;
	}

	public void setOppty_stage_cd(String oppty_stage_cd) {
		this.oppty_stage_cd = oppty_stage_cd;
	}

	public String getExp_close_day() {
		return exp_close_day;
	}

	public void setExp_close_day(String exp_close_day) {
		this.exp_close_day = exp_close_day;
	}

	public String getDtype_cd() {
		return dtype_cd;
	}

	public void setDtype_cd(String dtype_cd) {
		this.dtype_cd = dtype_cd;
	}

	public String getSur_plan_cn() {
		return sur_plan_cn;
	}

	public void setSur_plan_cn(String sur_plan_cn) {
		this.sur_plan_cn = sur_plan_cn;
	}

	public String getPurchase_type() {
		return purchase_type;
	}

	public void setPurchase_type(String purchase_type) {
		this.purchase_type = purchase_type;
	}

	public String getPayment_cd() {
		return payment_cd;
	}

	public void setPayment_cd(String payment_cd) {
		this.payment_cd = payment_cd;
	}

	public String getRec_per_cd() {
		return rec_per_cd;
	}

	public void setRec_per_cd(String rec_per_cd) {
		this.rec_per_cd = rec_per_cd;
	}

	public String getRemark_cn() {
		return remark_cn;
	}

	public void setRemark_cn(String remark_cn) {
		this.remark_cn = remark_cn;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
	
	public String getCode_no() {
		return code_no;
	}

	public void setCode_no(String code_no) {
		this.code_no = code_no;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCode_name() {
		return code_name;
	}

	public void setCode_name(String code_name) {
		this.code_name = code_name;
	}

	@Override
	public String toString() {
		return "OpptyVO [oppty_no=" + oppty_no + ", create_date=" + create_date + ", update_date=" + update_date
				+ ", oppty_name=" + oppty_name + ", cust_no=" + cust_no + ", cust_name=" + cust_name + ", emp_no="
				+ emp_no + ", emp_name=" + emp_name + ", oppty_status_cd=" + oppty_status_cd + ", oppty_stage_cd="
				+ oppty_stage_cd + ", exp_close_day=" + exp_close_day + ", dtype_cd=" + dtype_cd + ", sur_plan_cn="
				+ sur_plan_cn + ", purchase_type=" + purchase_type + ", payment_cd=" + payment_cd + ", rec_per_cd="
				+ rec_per_cd + ", remark_cn=" + remark_cn + ", score=" + score + ", code_no=" + code_no + ", code="
				+ code + ", code_name=" + code_name + "]";
	}
	
}
