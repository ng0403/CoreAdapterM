package com.core.plus.lead.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.lead.dao.LeadDao;
import com.core.plus.lead.vo.LeadVO;

@Service
public class LeadServiceImpl implements LeadService {
	
	@Resource LeadDao leadDao;

	@Override
	public List<LeadVO> lead_list() {
		
		List<LeadVO> vo = leadDao.lead_list();
		
		return vo;
	}

	@Override
	public void lead_insert(LeadVO vo) {
		
		leadDao.lead_insert(vo);
		
	}

	@Override
	public void lead_update(LeadVO vo) {
		
		leadDao.lead_update(vo);
		
	}

	@Override
	public LeadVO lead_detail(String lead_no) {
		
		return leadDao.lead_detail(lead_no);
		
	}

	@Override
	public void lead_delete(String lead_no) {
		
		leadDao.lead_delete(lead_no);
		
	}

	@Override
	public List<LeadVO> leadSearch(Map<String, Object> leadMap) {
	 
 	  return leadDao.leadSearch(leadMap);
	 
	}

	@Override
	public List<CustVO> custPopupList() {
		// TODO Auto-generated method stub
		return leadDao.custPopupList();
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return leadDao.custPopupList(map);
	}

	@Override
	public List<EmpVO> empPopupList() {
		// TODO Auto-generated method stub
		return leadDao.empPopupList();
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return leadDao.empPopupList(map);
	}

}
