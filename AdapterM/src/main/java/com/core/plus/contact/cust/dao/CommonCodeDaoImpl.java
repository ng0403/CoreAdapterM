package com.core.plus.contact.cust.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.contact.cust.vo.CommonCodeVO;

@Repository
public class CommonCodeDaoImpl implements CommonCodeDao{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<CommonCodeVO> vititCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> vititCdList = sqlSession.selectList("commonCode.vititCdList");
		
		return vititCdList;
	}

	@Override
	public List<CommonCodeVO> vititDtlCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> vititDtlCdList = sqlSession.selectList("commonCode.vititDtlCdList");
		
		return vititDtlCdList;
	}

	@Override
	public List<CommonCodeVO> phoneTypeCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> phoneTypeCdList = sqlSession.selectList("commonCode.phoneTypeCdList");
		
		return phoneTypeCdList;
	}

	@Override
	public List<CommonCodeVO> phoneCountryCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> phoneCountryCdList = sqlSession.selectList("commonCode.phoneCountryCdList");
		
		return phoneCountryCdList;
	}

	@Override
	public List<CommonCodeVO> addrTypeCdList() {
		// TODO Auto-generated method stub
		List<CommonCodeVO> addrTypeCdList = sqlSession.selectList("commonCode.addrTypeCdList");
		
		return addrTypeCdList;
	}

}
