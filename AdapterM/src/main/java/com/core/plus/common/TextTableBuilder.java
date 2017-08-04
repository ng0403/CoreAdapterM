package com.core.plus.common;

import java.util.List;


public class TextTableBuilder {

	/**
	 * Return text based table.
	 * @param columnNames
	 * @param columnValues
	 * @return
	 */
	public static String createTextTable(String[] columnNames, String[] columnValues) {
		
		StringBuffer buffer = new StringBuffer();
		
		// Defines max / min length of value.
		int maxKeySize = 0;
		int maxValSize = 0;
		for(int i = 0, iSize = columnNames.length; i < iSize; i ++ ) {
			String columnName = columnNames[i];
			String columnValue = (columnValues[i] == null ? "null" : columnValues[i]);
			columnValue = columnValue.replaceAll("\t", " ");
			if(columnName.length() > maxKeySize) {
				maxKeySize = columnName.length();
			}
			// line separator
			String[] columnValueLines = columnValue.split("\n");
			if(columnValueLines.length > 0) {
				for(int ii = 0, iiSize = columnValueLines.length; ii < iiSize; ii ++ ) {
					if(columnValueLines[ii].length() > maxValSize) {
						maxValSize = columnValueLines[ii].length();
					}
				}
			}else{
				if(columnValue.length() > maxValSize) {
					maxValSize = columnValue.length();
				}
			}
		}
		
		// Prints Text Table
		for(int i = 0, iSize = columnNames.length; i < iSize; i ++ ) {
			if(i == 0) {
				buffer.append( String.format("\n+ %1$-" + maxKeySize + "s + %1$-" + (maxValSize + 20) + "s +", " ").replaceAll(" ", "-"));
				buffer.append( String.format("\n| %1$-" + maxKeySize + "s | %2$-" + (maxValSize + 20) + "s |", "KEY", "VALUE" ));
				buffer.append( String.format("\n+ %1$-" + maxKeySize + "s + %1$-" + (maxValSize + 20) + "s +", " ").replaceAll(" ", "-"));
			}
			String columnName = columnNames[i].replaceAll("\n", "");
			String columnValue = (columnValues[i] == null ? "null" : columnValues[i]);
			columnValue = columnValue.replaceAll("\t", " ");
			// line separator
			String[] columnValueLines = columnValue.split("\n");
			if(columnValueLines.length > 0) {
				for(int ii = 0, iiSize = columnValueLines.length; ii < iiSize; ii ++ ) {
					buffer.append( String.format("\n| %1$-" + maxKeySize + "s | %2$-" + (maxValSize + 20) + "s |", (ii == 0 ? columnName : ""), columnValueLines[ii]));
				}
			}else{
				buffer.append( String.format("\n| %1$-" + maxKeySize + "s | %2$-" + (maxValSize + 20) + "s |", columnName, columnValue));
			}
			buffer.append( String.format("\n+ %1$-" + maxKeySize + "s + %1$-" + (maxValSize + 20) + "s +", " ").replaceAll(" ", "-"));
		}
		
		// Returns
		return buffer.toString();
	}
	
	/**
	 * Returns text based table.
	 * @param headerNames
	 * @param cellValues
	 * @return
	 */
	public static String createTextTable(String[] headerNames, String[][] cellValues) {

		// DEFINES WIDTH
		int[] maxColumnLen = new int[headerNames.length];
		for(int i = 0, iSize = headerNames.length; i < iSize; i ++ ) {
			if(headerNames[i].length() > maxColumnLen[i])
				maxColumnLen[i] = headerNames[i].length();
		}
		for(int i = 0, iSize = cellValues.length; i < iSize; i ++ ) {
			for(int j = 0, iiSize = cellValues[i].length; j < iiSize; j ++ ){
				if((cellValues[i][j] == null ? 0 : cellValues[i][j].toString().length()) > maxColumnLen[j])	
					maxColumnLen[j] = cellValues[i][j].length();
			}
		}
		
		// CREATE TEXT TABLE
		StringBuffer textTable = new StringBuffer();
		for(int i = 0, iSize = cellValues.length; i < iSize; i ++ ){
			
			// HEADER
			if(i == 0) {
				StringBuffer head01 = new StringBuffer();
				StringBuffer head02 = new StringBuffer();
				StringBuffer head03 = new StringBuffer();
				for(int j = 0, jSize = headerNames.length; j < jSize; j ++ ) {
					String columnName = headerNames[j];
					head01.append( String.format(" %1$-" + maxColumnLen[j] + "s +", " ").replaceAll(" ", "-") );
					head02.append( String.format(" %1$-" + maxColumnLen[j] + "s |", columnName) );
					head03.append( String.format(" %1$-" + maxColumnLen[j] + "s +", " ").replaceAll(" ", "-") );
				}
				textTable.append("\n+" + head01.toString());
				textTable.append("\n|" + head02.toString());
				textTable.append("\n+" + head03.toString());
			}
			
			// RECORD
			StringBuffer cell01 = new StringBuffer();
			StringBuffer cell02 = new StringBuffer();
			for(int j = 0, iiSize = cellValues[i].length; j < iiSize; j ++ ){
				cell01.append( String.format(" %1$-" + maxColumnLen[j] + "s |", cellValues[i][j]) );
				cell02.append( String.format(" %1$-" + maxColumnLen[j] + "s +", " ").replaceAll(" ", "-") );
			}
	
			textTable.append("\n|" + cell01.toString());
			textTable.append("\n+" + cell02.toString());
		}
		
		return textTable.toString();
	}
	
	/**
	 * Return TextTable from ValueObject 
	 * @param valueObject
	 * @return
	 */
	public static String createTextTable(ValueObject valueObject) {
		StringBuffer buffer = new StringBuffer();
		
		// Checks empty
		if(valueObject == null || valueObject.isEmpty() == true) {
			buffer.append("\n-- EMPTY DATA --");
			return buffer.toString();
		}
		
		// data
		String[] columnNames = valueObject.getColumnNames();
		String[] columnValues = new String[columnNames.length];
		for(int i = 0, iSize = columnNames.length; i < iSize; i ++ ) {
			columnValues[i] = String.valueOf(valueObject.get(columnNames[i]));
		}
		buffer.append(createTextTable(columnNames, columnValues));
		return buffer.toString();
	}
	
	/**
	 * Return TextTable from ValueObject List
	 * @param list
	 * @return
	 */
	public static String createTextTable(List<ValueObject> list) {
		StringBuffer buffer = new StringBuffer();

		// Appends data
		if(list.size() < 1) {
			buffer.append("\n-- EMPTY DATA --");
			return buffer.toString();
		}
		
		// Defines header names
		int maxColumnLen = 0;
		int maxColumnLenRowIndex = 0;
		for(int idx = 0, size = list.size(); idx < size; idx ++) {
			ValueObject record = list.get(idx);
			if(record.getColumnNames().length > maxColumnLen) {
				maxColumnLen = record.getColumnNames().length;
				maxColumnLenRowIndex = idx;
			}
		}
		String[] headerNames = list.get(maxColumnLenRowIndex).getColumnNames();
		
		
		String[][] cellValues = new String[list.size()][];
		for(int i = 0, iSize = list.size(); i < iSize; i ++) {
			ValueObject record = list.get(i);
			//String[] columnNames = record.getColumnNames();
			cellValues[i] = new String[headerNames.length];
			for(int ii = 0, iiSize = headerNames.length; ii < iiSize; ii ++ ) {
				cellValues[i][ii] = String.valueOf(record.getColumn(headerNames[ii]));
			}
		}
		buffer.append(createTextTable(headerNames, cellValues));
		
		// return
		return buffer.toString();
	}
}
