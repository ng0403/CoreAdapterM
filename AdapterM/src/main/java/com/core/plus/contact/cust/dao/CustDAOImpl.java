package com.core.plus.contact.cust.dao;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
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
import com.core.plus.task.vo.TaskVO;

@Repository
public class CustDAOImpl implements CustDAO{
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<CustVO> custList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<CustVO> custList = sqlSession.selectList("cust.custList", map);
		
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

	@Override
	public int getCustListRow(Map<String, Object> custMap) {
		// TODO Auto-generated method stub
		int totalCount = 0;
		
		String phone = (String) custMap.get("phone_no");
		
		System.out.println("DAO : " + phone);
		
		try {
			totalCount = sqlSession.selectOne("cust.custListTotalRow", custMap);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return totalCount;
	}

	@Override
	public int custDelete(CustVO custVo) {
		// TODO Auto-generated method stub
		int result = sqlSession.update("cust.custDelete", custVo);
		return result;
	}

	@Override
	public int custUploadExcel(MultipartFile destFile) {
		// TODO Auto-generated method stub
		System.out.println("Excel Upload Dao");
		int result = 0;
		
		try {
			Workbook workBook = WorkbookFactory.create(destFile.getInputStream());
			Sheet sheet = workBook.getSheetAt(0);
			Row row = null;
			Cell cell = null;
			
			String cust_no = null;
			String cust_name = null;
			String visit_cd = null;
			String visit_dtl_cd = null;
			String rec_per = null;
			
			int rows = sheet.getPhysicalNumberOfRows();
//			int cells = row.getPhysicalNumberOfCells();
			
			for(int i=0; i<rows; i++)
			{
				row = sheet.getRow(i);
				
				cell = row.getCell(0);	// cust_no
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					cell.setCellType(Cell.CELL_TYPE_STRING);
					cust_no = cell.getStringCellValue().trim();
					
					System.out.println("cust_no : " + cust_no);
				}
				
				cell = row.getCell(1);	// cust_name
				cust_name = cell.getStringCellValue().trim();
				
				cell = row.getCell(2);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					visit_cd = String.format("%03d", tmp);
					
					System.out.println("visit : " + visit_cd);
					
				}
				
				cell = row.getCell(3);
				if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
				{
					int tmp = (int) cell.getNumericCellValue();
					visit_dtl_cd = String.format("%03d", tmp);
					
				}
				
				cell = row.getCell(4);	// cust_name
				rec_per = cell.getStringCellValue().trim();

				// VO
				CustVO custVo = new CustVO();
				custVo.setCust_no(cust_no);
				custVo.setCust_name(cust_name);
				custVo.setVisit_cd(visit_cd);
				custVo.setVisit_dtl_cd(visit_dtl_cd);
				custVo.setRec_per(rec_per);
				
				System.out.println("VO : " + custVo);
				
				if(cust_no != null)
				{
					// DB Insert
					result += sqlSession.insert("cust.custExcelInsert", custVo);
				}
					
			}
			
		} catch (InvalidFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}

	// 엑셀 출력
	@Override
	public List<CustVO> custExcelExport(Map<String, Object> custkMap) {
		
		List<CustVO> custExcelExport = null;
		try {
			custExcelExport = sqlSession.selectList("cust.custExcelExport", custkMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return custExcelExport;
	}

}
