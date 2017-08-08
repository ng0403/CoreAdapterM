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
	public List<OpptyVO> opptyList() {
		// TODO Auto-generated method stub
		return opptyDao.opptyList();
	}

	@Override
	public List<OpptyItemVO> opptyItemList() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public OpptyVO opptyDetail(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyDetail(oppty_no);
	}

	/* code */
	@Override
	public List<OpptyVO> opptyStatusCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyStatusCD();
	}

	@Override
	public List<OpptyVO> opptyStageCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyStageCD();
	}

	@Override
	public List<OpptyVO> opptyDtypeCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyDtypeCD();
	}

	@Override
	public List<OpptyVO> opptyPerchaseType() {
		// TODO Auto-generated method stub
		return opptyDao.opptyPerchaseType();
	}

	@Override
	public List<OpptyVO> opptyPaymentCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyPaymentCD();
	}

	@Override
	public List<OpptyVO> opptyRecPerCD() {
		// TODO Auto-generated method stub
		return opptyDao.opptyRecPerCD();
	}

}
