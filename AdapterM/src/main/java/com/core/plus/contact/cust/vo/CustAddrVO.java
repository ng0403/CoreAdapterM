package com.core.plus.contact.cust.vo;

public class CustAddrVO {
	private String cust_no;
	private String addr_type_cd;
	private String create_date;
	private String road_yn;
	private String zip_no;
	private String address;
	private String main_address;
	private String detail_address;
	private String primary_yn;
	public String getCust_no() {
		return cust_no;
	}
	public void setCust_no(String cust_no) {
		this.cust_no = cust_no;
	}
	public String getAddr_type_cd() {
		return addr_type_cd;
	}
	public void setAddr_type_cd(String addr_type_cd) {
		this.addr_type_cd = addr_type_cd;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getRoad_yn() {
		return road_yn;
	}
	public void setRoad_yn(String road_yn) {
		this.road_yn = road_yn;
	}
	public String getZip_no() {
		return zip_no;
	}
	public void setZip_no(String zip_no) {
		this.zip_no = zip_no;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMain_address() {
		return main_address;
	}
	public void setMain_address(String main_address) {
		this.main_address = main_address;
	}
	public String getDetail_address() {
		return detail_address;
	}
	public void setDetail_address(String detail_address) {
		this.detail_address = detail_address;
	}
	public String getPrimary_yn() {
		return primary_yn;
	}
	public void setPrimary_yn(String primary_yn) {
		this.primary_yn = primary_yn;
	}
	@Override
	public String toString() {
		return "CustAddrVO [cust_no=" + cust_no + ", addr_type_cd=" + addr_type_cd + ", create_date=" + create_date
				+ ", road_yn=" + road_yn + ", zip_no=" + zip_no + ", address=" + address + ", main_address="
				+ main_address + ", detail_address=" + detail_address + ", primary_yn=" + primary_yn + "]";
	}
}
