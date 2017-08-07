package com.core.plus.lead.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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

}
