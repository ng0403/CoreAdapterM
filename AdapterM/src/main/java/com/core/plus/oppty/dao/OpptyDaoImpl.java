package com.core.plus.oppty.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

@Repository
public class OpptyDaoImpl implements OpptyDao {
	
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<OpptyVO> opptyList() {
		// TODO Auto-generated method stub
		List<OpptyVO> vo = sqlSession.selectList("oppty.opptyList");
		
		return vo;
	}

	@Override
	public List<OpptyItemVO> opptyItemList() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public OpptyVO opptyDetail(String oppty_no) {
		// TODO Auto-generated method stub
		System.out.println("DAO : " + oppty_no);
		
		OpptyVO detail = sqlSession.selectOne("oppty.opptyDetail", oppty_no);
		
		return detail;
	}

	/* Code */
	@Override
	public List<OpptyVO> opptyStatusCD() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyStatusCode");
		
		return code;
	}

	@Override
	public List<OpptyVO> opptyStageCD() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyStageCode");
		
		return code;
	}

	@Override
	public List<OpptyVO> opptyDtypeCD() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyDtypeCode");
		
		return code;
	}

	@Override
	public List<OpptyVO> opptyPerchaseType() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyPurchaseType");
		
		return code;
	}

	@Override
	public List<OpptyVO> opptyPaymentCD() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyPaymentCode");
		
		return code;
	}

	@Override
	public List<OpptyVO> opptyRecPerCD() {
		// TODO Auto-generated method stub
		List<OpptyVO> code = sqlSession.selectList("oppty.opptyRecPerCode");
		
		return code;
	}

}
