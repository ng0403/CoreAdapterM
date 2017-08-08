package com.core.plus.lead.dao;

import java.util.List;
import java.util.Map;

import com.core.plus.lead.vo.LeadVO;

public interface LeadDao {
	
	List<LeadVO> lead_list(); //가망고객 리스트 출력
	void lead_insert(LeadVO vo); //가망고객 추가
	void lead_update(LeadVO vo); // 가망고객 수정
	LeadVO lead_detail(String lead_no); // 가망 고객 상세정보
	void lead_delete(String lead_no); // 가망 고객 삭제
	
	public List<LeadVO> leadSearch(Map<String, Object> leadMap); // 가망 고객 조건 검색
}
