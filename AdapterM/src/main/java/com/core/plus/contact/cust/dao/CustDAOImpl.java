package com.core.plus.contact.cust.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CustVO;

@Repository
public class CustDAOImpl implements CustDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<CustVO> custList() {
		// TODO Auto-generated method stub
		List<CustVO> custList = sqlSession.selectList("cust.custList");
		
		return custList;
	}

	@Override
	public CustVO custDetailList(String cust_no) {
		// TODO Auto-generated method stub
		CustVO custDList = sqlSession.selectOne("cust.custDetailList", cust_no);
		
		return custDList;
	}

	@Override
	public int custAdd(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = sqlSession.insert("cust.custInsert", cvo);
		return result;
	}

	@Override
	public int custMdfy(CustVO cvo) {
		// TODO Auto-generated method stub
		int result = sqlSession.update("cust.custUpdate", cvo);
		return result;
	}

}
