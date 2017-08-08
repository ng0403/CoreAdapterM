package com.core.plus.oppty.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.core.plus.oppty.dao.OpptyDao;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

@Service
public class OpptyServiceImlp implements OpptyService {

	@Resource
	OpptyDao opptyDao;
	
	@Override
	public List<OpptyVO> oppty_list() {
		// TODO Auto-generated method stub
		
		return opptyDao.oppty_list();
	}

	@Override
	public List<OpptyItemVO> opptyItem_list() {
		// TODO Auto-generated method stub
		return null;
	}

}
