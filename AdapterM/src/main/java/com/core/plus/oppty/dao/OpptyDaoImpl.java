package com.core.plus.oppty.dao;

import java.io.IOException;
import java.util.List;
import java.util.Map;


import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.core.plus.contact.cust.vo.CustVO;
import com.core.plus.emp.vo.EmpVO;
import com.core.plus.oppty.vo.OpptyItemVO;
import com.core.plus.oppty.vo.OpptyVO;
import com.core.plus.task.vo.TaskVO;

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

	@Override
	public int opptyUploadExcel(MultipartFile excelFile) {
		// TODO Auto-generated method stub
		System.out.println("Excel Upload Dao");
		int result = 0;
		
		try {
			Workbook workBook = WorkbookFactory.create(excelFile.getInputStream());
			Sheet sheet = workBook.getSheetAt(0);
			Row row = null;
			Cell cell = null;
			
			String oppty_no   = null;
			String oppty_name = null;
			String cust_no = null;
			String emp_no  = null;
			String oppty_status_cd = null;
			String oppty_stage_cd  = null;
			String exp_close_day = null;
			String dtype_cd = null;
			String sur_plan_cn = null;
			String purchase_type = null;
			String payment_cd = null;
			String rec_per_cd = null;
			String remark_cn  = null;
			int  score = 0;
			
			int rows = sheet.getPhysicalNumberOfRows();
			System.out.println(rows);
			
			for(int i=0; i<rows; i++) {
				row = sheet.getRow(i);
				
				cell = row.getCell(0);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					oppty_no = cell.getStringCellValue();
					
					System.out.println("oppty_no");
				}
				
				cell = row.getCell(1);
				oppty_name = cell.getStringCellValue().trim();
				
				System.out.println("oppty_name");

				cell = row.getCell(2);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					cust_no = cell.getStringCellValue();
					
					System.out.println("cust_no");
				}
				
				cell = row.getCell(3);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					emp_no = cell.getStringCellValue();
					
					System.out.println("emp_no");
				}
				
				cell = row.getCell(4);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					oppty_status_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(5);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					oppty_stage_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(6);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					score = (int) cell.getNumericCellValue();
				}
				
				cell = row.getCell(7);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					exp_close_day = String.valueOf(tmp);
				}
				
				cell = row.getCell(8);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					dtype_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(9);
				sur_plan_cn = cell.getStringCellValue();
				
				cell = row.getCell(10);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					purchase_type = String.format("%03d", tmp);
				}
				
				cell = row.getCell(11);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					payment_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(12);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					rec_per_cd = String.format("%03d", tmp);
				}
				
				cell = row.getCell(13);
				remark_cn = cell.getStringCellValue();
				
				OpptyVO opptyVo = new OpptyVO();
				opptyVo.setOppty_no(oppty_no);
				opptyVo.setOppty_name(oppty_name);
				opptyVo.setCust_no(cust_no);
				opptyVo.setEmp_no(emp_no);
				opptyVo.setOppty_status_cd(oppty_status_cd);
				opptyVo.setOppty_stage_cd(oppty_stage_cd);
				opptyVo.setScore(score);
				opptyVo.setExp_close_day(exp_close_day);
				opptyVo.setDtype_cd(dtype_cd);
				opptyVo.setSur_plan_cn(sur_plan_cn);
				opptyVo.setPurchase_type(purchase_type);
				opptyVo.setPayment_cd(payment_cd);
				opptyVo.setRec_per_cd(rec_per_cd);
				opptyVo.setRemark_cn(remark_cn);
				
				System.out.println("VO : " + opptyVo);
				
				if(oppty_no != null || opptyVo.getOppty_no() != null)
				{
					result += sqlSession.insert("oppty.oppty_multi_insert", opptyVo);
				}
			}
			
		} catch (InvalidFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(result);
		
		return result;
	}

	@Override
	public List<OpptyVO> opptyExcelExport(Map<String, Object> opptykMap) {
		
		List<OpptyVO> opptyExcelExport = null;
		try {
			opptyExcelExport = sqlSession.selectList("oppty.opptyExcelExport", opptykMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return opptyExcelExport;
	}
	
}
