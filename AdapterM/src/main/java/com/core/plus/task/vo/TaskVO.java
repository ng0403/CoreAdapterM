package com.core.plus.task.vo;

public class TaskVO {

	private String task_no;					// task 번호
	private String create_date;				// 등록일시
	private String update_date;				// 수정일시
	private String subject;					// 제목
	private String cust_no;					// 고객번호
	private String cust_name;				// 고객이름
	private String lead_no;					// lead번호
	private String lead_name;				// lead이름
	private String oppty_no;				// 영업기회번호
	private String oppty_name;				// 영업기회이름
	private String location;				// 진행장소
	private String next_day;				// 다음 일자
	private String emp_no;					// 담당자 번호
	private String emp_name;				// 담당자 이름
	private String dtype_cd;				// 분류코드
	private String score_cd;				// 상대 가치 점수
	private String remark_cn;				// 특이사항
	private String phone_no;				// 전화번호

	// 공통코드에서 불러오기 위한 변수
	private String code_no;
	private String code;
	private String code_name;
	private String dtype_name;
	private String score_name;
	public String getTask_no() {
		return task_no;
	}
	public void setTask_no(String task_no) {
		this.task_no = task_no;
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
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
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
	public String getLead_no() {
		return lead_no;
	}
	public void setLead_no(String lead_no) {
		this.lead_no = lead_no;
	}
	public String getLead_name() {
		return lead_name;
	}
	public void setLead_name(String lead_name) {
		this.lead_name = lead_name;
	}
	public String getOppty_no() {
		return oppty_no;
	}
	public void setOppty_no(String oppty_no) {
		this.oppty_no = oppty_no;
	}
	public String getOppty_name() {
		return oppty_name;
	}
	public void setOppty_name(String oppty_name) {
		this.oppty_name = oppty_name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getNext_day() {
		return next_day;
	}
	public void setNext_day(String next_day) {
		this.next_day = next_day;
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
	public String getDtype_cd() {
		return dtype_cd;
	}
	public void setDtype_cd(String dtype_cd) {
		this.dtype_cd = dtype_cd;
	}
	public String getScore_cd() {
		return score_cd;
	}
	public void setScore_cd(String score_cd) {
		this.score_cd = score_cd;
	}
	public String getRemark_cn() {
		return remark_cn;
	}
	public void setRemark_cn(String remark_cn) {
		this.remark_cn = remark_cn;
	}
	public String getPhone_no() {
		return phone_no;
	}
	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
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
	public String getDtype_name() {
		return dtype_name;
	}
	public void setDtype_name(String dtype_name) {
		this.dtype_name = dtype_name;
	}
	public String getScore_name() {
		return score_name;
	}
	public void setScore_name(String score_name) {
		this.score_name = score_name;
	}
	
	@Override
	public String toString() {
		return "TaskVO [task_no=" + task_no + ", create_date=" + create_date + ", update_date=" + update_date
				+ ", subject=" + subject + ", cust_no=" + cust_no + ", cust_name=" + cust_name + ", lead_no=" + lead_no
				+ ", lead_name=" + lead_name + ", oppty_no=" + oppty_no + ", oppty_name=" + oppty_name + ", location="
				+ location + ", next_day=" + next_day + ", emp_no=" + emp_no + ", emp_name=" + emp_name + ", dtype_cd="
				+ dtype_cd + ", score_cd=" + score_cd + ", remark_cn=" + remark_cn + ", phone_no=" + phone_no
				+ ", code_no=" + code_no + ", code=" + code + ", code_name=" + code_name + ", dtype_name=" + dtype_name
				+ ", score_name=" + score_name + "]";
	}
}
