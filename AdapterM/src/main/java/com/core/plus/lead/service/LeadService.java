package com.core.plus.lead.service;

import java.util.List;

import com.core.plus.lead.vo.LeadVO;

public interface LeadService {
	
	List<LeadVO> lead_list(); //가망 고객 리스트
	void lead_insert(LeadVO vo); //가망 고객 추가
	void lead_update(LeadVO vo); // 가망 고객 수정
	LeadVO lead_detail(String lead_no); // 가망 고객 디테일
	
 
}
