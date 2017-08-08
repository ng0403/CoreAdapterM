package com.core.plus.contact.cust.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CustVO;

@Repository
public class CustAddrDAOImpl implements CustAddrDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<CustVO> custAddrDetailList(String cust_no) {
		// TODO Auto-generated method stub
		List<CustVO> custAdList = sqlSession.selectList("custAddr.custAdDetailList", cust_no);
		
		return custAdList;
	}

	@Override
	public int custAddrDelete(String cust_no) {
		// TODO Auto-generated method stub
		int result = sqlSession.delete("custAddr.custAdDelete", cust_no);
		return result;
	}

	@Override
	public int custAddrAdd(CustVO custVO) {
		// TODO Auto-generated method stub
		int result = sqlSession.insert("custAddr.custAdInsert", custVO);
		return result;
	}

}
