package com.core.plus.contact.cust.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CustVO;

@Repository
public class CustPhoneDAOImpl implements CustPhoneDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<CustVO> custPhoneDetailList(String cust_no) {
		// TODO Auto-generated method stub
		List<CustVO> custPhList = sqlSession.selectList("custPhone.custPhDetailList", cust_no);
		
		return custPhList;
	}

	@Override
	public int custPhoneDelete(String cust_no) {
		// TODO Auto-generated method stub
		int result = sqlSession.delete("custPhone.custPhDelete", cust_no);
		return result;
	}

	@Override
	public int custPhoneAdd(CustVO custVO) {
		// TODO Auto-generated method stub
		int result = sqlSession.insert("custPhone.custPhInsert", custVO);
		return result;
	}

}
