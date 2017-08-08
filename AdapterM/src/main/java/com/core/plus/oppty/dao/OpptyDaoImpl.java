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
	public List<OpptyVO> oppty_list() {
		// TODO Auto-generated method stub
		List<OpptyVO> vo = sqlSession.selectList("oppty.opptyList");
		
		return vo;
	}

	@Override
	public List<OpptyItemVO> opptyItem_list() {
		// TODO Auto-generated method stub
		return null;
	}

}
