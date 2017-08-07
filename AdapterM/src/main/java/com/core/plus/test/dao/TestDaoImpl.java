package com.core.plus.test.dao;

import java.util.List;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.core.plus.test.vo.TestVO;

@Repository
public class TestDaoImpl implements TestDao{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<TestVO> testList() {
		// TODO Auto-generated method stub
		List<TestVO> tlist = null;
		tlist = sqlSession.selectList("test.testList");
		return tlist;
	}

}
