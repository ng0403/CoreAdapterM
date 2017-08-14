package com.core.plus.oppty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.stereotype.Repository;

import com.core.plus.common.PagerVO;
import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;

@Repository
public class OpptyDaoImpl implements OpptyDao {
	
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<OpptyVO> opptyList(Map<String, Object> opptyMap) {
		// TODO Auto-generated method stub
		List<OpptyVO> vo = sqlSession.selectList("oppty.opptyList", opptyMap);
		
		return vo;
	}
	
	@Override
	public List<OpptyVO> opptySchList(Map<String, Object> kwMap) {
		// TODO Auto-generated method stub
		List<OpptyVO> vo = sqlSession.selectList("oppty.opptyList", kwMap);
		
		System.out.println("vo : " + vo);
		
		return vo;
	}

	@Override
	public List<OpptyItemVO> opptyItemList(String oppty_no) {
		// TODO Auto-generated method stub
		List<OpptyItemVO> vo = sqlSession.selectList("oppty.opptyItemList", oppty_no);
		
		return vo;
	}
	
	@Override
	public OpptyVO opptyDetail(String oppty_no) {
		// TODO Auto-generated method stub
		System.out.println("DAO : " + oppty_no);
		
		OpptyVO detail = sqlSession.selectOne("oppty.opptyDetail", oppty_no);
		
		System.out.println("detail : " + detail);
		
		return detail;
	}
	
	/* CUD */
	@Override
	public int opptyInsert(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		int result = sqlSession.insert("oppty.oppty_single_insert", opptyVo);
		
		return result;
	}
	
	@Override
	public int opptyEdit(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		int result = sqlSession.update("oppty.opptyEdit", opptyVo);
		
		return result;
	}
	
	@Override
	public int opptyDelete(OpptyVO opptyVo) {
		// TODO Auto-generated method stub
		int result = sqlSession.delete("oppty.opptyDelete", opptyVo);
		
		return result;
	}
	
	/* OpptyItem */
	@Override
	public int opptyItemInsert(List<OpptyItemVO> itemList) {
		// TODO Auto-generated method stub
		int result = 0;
		System.out.println("DAO : " + itemList);
		for(int i=0; i<itemList.size(); i++)
		{
			result = sqlSession.insert("oppty.opptyItemInsert", itemList.get(i));
		}
		
		return result;
	}
	
	@Override
	public int opptyItemDelete(String oppty_no) {
		// TODO Auto-generated method stub
		int result = sqlSession.delete("oppty.opptyItemDelete", oppty_no);
		
		return result;
	}
	
	/* Index */
	@Override
	public OpptyVO opptyNoIndex() {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("oppty.opptyNoIndex");
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

	/* Popup */
	@Override
	public List<CustVO> custPopupList() {
		// TODO Auto-generated method stub
		List<CustVO> custPopList = sqlSession.selectList("oppty.custPopupList");
		
		return custPopList;
	}

	@Override
	public List<CustVO> custPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<CustVO> custPopList = sqlSession.selectList("oppty.custPopupList", map);
		
		return custPopList;
	}

	@Override
	public List<EmpVO> empPopupList() {
		// TODO Auto-generated method stub
		List<EmpVO> empPopList = sqlSession.selectList("oppty.empPopupList");
		
		return empPopList;
	}

	@Override
	public List<EmpVO> empPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<EmpVO> empPopList = sqlSession.selectList("oppty.empPopupList", map);
		
		return empPopList;
	}

	@Override
	public List<OpptyItemVO> mainCatPopupList() {
		// TODO Auto-generated method stub
		List<OpptyItemVO> mainCatePopList = sqlSession.selectList("oppty.mainCatePopupList");
		
		return mainCatePopList;
	}

	@Override
	public List<OpptyItemVO> mainCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		System.out.println(map);
		List<OpptyItemVO> mainCatePopList = sqlSession.selectList("oppty.mainCatePopupList", map);
		
		return mainCatePopList;
	}

	@Override
	public List<OpptyItemVO> midCatPopupList() {
		// TODO Auto-generated method stub
		List<OpptyItemVO> midCatePopList = sqlSession.selectList("oppty.midCatePopupList");
		
		return midCatePopList;
	}

	@Override
	public List<OpptyItemVO> midCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<OpptyItemVO> midCatePopList = sqlSession.selectList("oppty.midCatePopupList", map);
		
		return midCatePopList;
	}

	@Override
	public List<OpptyItemVO> smallCatPopupList() {
		// TODO Auto-generated method stub
		List<OpptyItemVO> smallCatePopupList = sqlSession.selectList("oppty.smallCatePopupList");
		
		return smallCatePopupList;
	}

	@Override
	public List<OpptyItemVO> smallCatPopupList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<OpptyItemVO> smallCatePopupList = sqlSession.selectList("oppty.smallCatePopupList", map);
		
		return smallCatePopupList;
	}

	@Override
	public int getOpptyListRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.opptyListTotalRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int getCustPopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.custPopupRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int getEmpPopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.empPopupRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int getMainCatePopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.mainCatePopupRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int getMidCatePopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.midCatePopupRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int getSmallPopupRow(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		try {
			totalCount = sqlSession.selectOne("oppty.smallCatePopupRow", map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

}
