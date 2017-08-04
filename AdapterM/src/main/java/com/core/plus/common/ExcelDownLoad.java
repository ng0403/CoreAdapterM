package com.core.plus.common;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ExcelDownLoad {

	@RequestMapping(value = "/ExcelDownLoad", method = RequestMethod.POST)
	public void ExcelDo(String title, String[] header,  int lRowlength, String[] listContent, int dRowlength, String[] detailContent
			, String flag, HttpServletResponse response) {
		System.out.println(flag);
		try {
			HSSFRow row = null;
			HSSFCell cell = null;
			HSSFWorkbook wb = new HSSFWorkbook();

			HSSFSheet sheet = wb.createSheet();
			wb.setSheetName(0, title);
			if(flag == null){
				row = detailCellSetting(sheet, wb, row, cell, dRowlength, detailContent);
				listCellSetting(sheet, wb, row, cell, lRowlength, header, listContent);
			} else if(flag.equals("list")){ // 리스트 타입의 테이블
				listCellSetting(sheet, wb, row, cell, lRowlength, header, listContent);
			} else	if(flag.equals("detail")){ // 디테일 타입의 테이블
				detailCellSetting(sheet, wb, row, cell, dRowlength, detailContent);
			}
			
			Date dateNow = Calendar.getInstance(new SimpleTimeZone(0x1ee6280, "KST")).getTime();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddhhmmss", Locale.getDefault());
			String nowTime = formatter.format(dateNow);
			
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			// 엑셀 파일 제목
			response.setHeader("Content-Disposition", "attachment;filename=" + new String((title).getBytes("KSC5601"), "8859_1") + "_" +nowTime + ".xls");
			wb.write(response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// cell 디자인
	public HSSFCellStyle cellStyler(String type, HSSFWorkbook wb){
		if(type.equals("title")){
			// 제목 라인 구성
			HSSFCellStyle titleCellStyle = wb.createCellStyle();
			titleCellStyle.setBorderBottom(HSSFCellStyle.BORDER_THICK);
			titleCellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
			titleCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			titleCellStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
			titleCellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			
			return titleCellStyle;
		} 
		if (type.equals("content")) {
			// 내용 라인 구성
			HSSFCellStyle contentCellStyle = wb.createCellStyle();
			contentCellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			contentCellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			contentCellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
			contentCellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
			contentCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			contentCellStyle.setFillForegroundColor(HSSFColor.WHITE.index);
			contentCellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			
			return contentCellStyle;
		}
		return null;
	}
	
	// 리스트 셀 세팅
	public HSSFRow listCellSetting(HSSFSheet sheet, HSSFWorkbook wb, HSSFRow row,
				HSSFCell cell, int rowlength, String[] header, String[] content){
		HSSFCellStyle titleCellStyle = cellStyler("title", wb);
		HSSFCellStyle contentCellStyle = cellStyler("content", wb);
		int cellCount = header.length;
		
		if(row == null){
			row = sheet.createRow((short) 0);
		} else {
			row = sheet.createRow(row.getRowNum()+2);
		}
		// 제목들
		for (int i = 0; i < cellCount; i++) {
			cell = row.createCell(i);
			cell.setCellValue(header[i]);
			cell.setCellStyle(titleCellStyle);
		}
		
		// 내용들
		if (rowlength > 0) {
			for (int i = 0; i < rowlength; i++) {
				row = sheet.createRow(row.getRowNum()+1);
				String contCell = content[i];
				String[] contArr = contCell.split("@@");
				for (int j = 0; j < contArr.length; j++) {
					cell = row.createCell(j);
					String cont = "";
					cont = contArr[j];
					if ("null".equals(cont)) {
						cell.setCellValue("9900");
					} else {
						cell.setCellValue(cont);
					}
					cell.setCellStyle(contentCellStyle);
				}
			}
		}
		
		for (int i = 0; i < cellCount; i++) {
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, (sheet.getColumnWidth(i)) + 512);
		}
		return row;
	}
	
	// 디테일 셀 세팅
	public HSSFRow detailCellSetting(HSSFSheet sheet, HSSFWorkbook wb, HSSFRow row,
				HSSFCell cell, int rowlength, String[] content){
		HSSFCellStyle titleCellStyle = cellStyler("title", wb);
		HSSFCellStyle contentCellStyle = cellStyler("content", wb);
		if(row == null){
			row = sheet.createRow((short) 0);
		} 
		// 내용들
		if (rowlength > 0) {
			for (int i = 0; i < rowlength; i++) {
				row = sheet.createRow(row.getRowNum()+1);
				String contCell = content[i];
				String[] contArr = contCell.split("@@");
				for (int j = 0; j < contArr.length; j++) {
					cell = row.createCell(j);
					String cont = "";
					cont = contArr[j];
					if ("null".equals(cont)) {
						cell.setCellValue("9900");
						cell.setCellStyle(contentCellStyle);
					} else {
						if(j%2 == 0){
							cell.setCellValue(cont);
							cell.setCellStyle(titleCellStyle);
						}else {
							cell.setCellValue(cont);
							cell.setCellStyle(contentCellStyle);
						}
					}
				}
			}
		}	
		return row;
	}
}
