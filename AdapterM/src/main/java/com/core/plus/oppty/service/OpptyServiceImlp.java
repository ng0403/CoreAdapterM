package com.core.plus.oppty.service;

import java.util.List;
import java.util.Map;

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
	public List<OpptyVO> opptySchList(Map<String, Object> kwMap) {
		// TODO Auto-generated method stub
		return opptyDao.opptySchList(kwMap);
	}

	@Override
	public List<OpptyItemVO> opptyItemList(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyItemList(oppty_no);
	}
	
	@Override
	public OpptyVO opptyDetail(String oppty_no) {
		// TODO Auto-generated method stub
		return opptyDao.opptyDetail(oppty_no);
	}
	
	/* CUD */
	@Override
	public int opptyInsert(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyInsert(opptyVo);
	}
	
	@Override
	public int opptyEdit(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyEdit(opptyVo);
	}
	
	@Override
	public int opptyDelete(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		return opptyDao.opptyDelete(opptyVo);
	}

	/* Index */
	@Override
	public OpptyVO opptyNoIndex() {
		// TODO Auto-generated method stub
		return opptyDao.opptyNoIndex();
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
