package com.core.plus.lead.vo;

import java.util.Date;

public class LeadVO {
	
	private String lead_no;
	private String lead_name;
	private String cust_no;
	private String emp_no;
	private String contact_day;
	private String rank_cd;
	private String reason_cd;
	private String remark_cn;
	private Date create_date;
	private Date update_date;
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
	public String getCust_no() {
		return cust_no;
	}
	public void setCust_no(String cust_no) {
		this.cust_no = cust_no;
	}
	public String getEmp_no() {
		return emp_no;
	}
	public void setEmp_no(String emp_no) {
		this.emp_no = emp_no;
	}
	public String getContact_day() {
		return contact_day;
	}
	public void setContact_day(String contact_day) {
		this.contact_day = contact_day;
	}
	public String getRank_cd() {
		return rank_cd;
	}
	public void setRank_cd(String rank_cd) {
		this.rank_cd = rank_cd;
	}
	public String getReason_cd() {
		return reason_cd;
	}
	public void setReason_cd(String reason_cd) {
		this.reason_cd = reason_cd;
	}
	public String getRemark_cn() {
		return remark_cn;
	}
	public void setRemark_cn(String remark_cn) {
		this.remark_cn = remark_cn;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	
	
	@Override
	public String toString() {
		return "LeadVO [lead_no=" + lead_no + ", lead_name=" + lead_name + ", cust_no=" + cust_no + ", emp_no=" + emp_no
				+ ", contact_day=" + contact_day + ", rank_cd=" + rank_cd + ", reason_cd=" + reason_cd + ", remark_cn="
				+ remark_cn + ", create_date=" + create_date + ", update_date=" + update_date + "]";
	}
	
	
	
	

}
