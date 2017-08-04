package com.core.plus.common;

import java.math.BigDecimal;
import java.security.MessageDigest;

public class Commons {
	
	/**
	 * NULL 여부 체크 
	 * NULL -> true , NOT NULL -> false
	 * @param value NULL 체크 대상
	 * @return
	 */
	public static boolean isNull(String value) {
		if(value == null) 
			return true;
		if(value.trim().length() < 1) 
			return true;
		return false;
	}
	
	/**
	 * NOT NULL 여부를 체크한다.
	 * @param value NULL 체크 대상
	 * @return
	 */
	public static boolean isNotNull(String value) {
		if(value == null) 
			return false;
		if(value.trim().length() < 1) 
			return false;
		return true;
	}
	
	/**
	 * 널여부 체크 및 널인 경우 대체문자열을 지정
	 * @param value NULL 체크 대상
	 * @param defaultValue NULL 일 경우 대체문자열
	 * @return
	 */
	public static String ifNull(String value, String defaultValue) {
		if(isNull(value) == true) {
			return defaultValue;
		}
		return value;
	}
	
	/**
	 * 문자열 데이타형을 숫자형 데이타형으로 변환
	 * @param value
	 * @param altValue
	 * @return
	 */
	public static BigDecimal toNumber(String value, String altValue) {
		BigDecimal number = null;
		try {
			number = new BigDecimal(value);
		}catch(Exception e){
			number = new BigDecimal(altValue);
		}
		return number;
	}

	/**
	 * 문자열 지정사이즈로 Ellipsis
	 * @param value 
	 * @param size
	 * @return
	 */
	protected static String toEllipsis(String value, int size) {
		if(isNull(value) == true) return value;
		if(value.length() > size) {
			value = value.substring(0,size - 3) + " ..";
		}
		return value;
	}
	
	/**
	 * Convert string into camel case notation.
	 * @param name
	 * @return
	 */
	public static String toCamelCaseNotation(String name) {
		
		char[] chars = name.toCharArray();
		StringBuffer convertedName = new StringBuffer();
		int convertedNameLen = 0;
		for(int idx = 0; idx < chars.length; idx ++ ) {
			boolean isCamelCase = false;
			char previousChar = idx == 0 ? '\0' : chars[idx-1];
			char currentChar = chars[idx];			
			
			// Checks camel case.
			if(previousChar == ' ' 
			|| previousChar == '-'
			|| previousChar == '_'
			){
				isCamelCase = true;
			}
			
			// Checks skip chars.
			if(currentChar == ' '
			|| currentChar == '-'
			|| currentChar == '_'
			){
				continue;
			}
	
			// Checks already CamelCase.
			if(Character.isLowerCase(previousChar) == true
			&& Character.isUpperCase(currentChar) == true ){
				isCamelCase = true;
			}
			
			// Appends char into camelCase StringBuffer.
			if(convertedNameLen != 0 && isCamelCase == true) {
				convertedName.append(String.valueOf(currentChar).toUpperCase());
			}else{
				convertedName.append(String.valueOf(currentChar).toLowerCase());
			}
			
			// Increases count.
			convertedNameLen ++;
		}
		
		return convertedName.toString();
	}
	
	/**
	 * Convert string into Pascal Case notation.
	 * @param name
	 * @return
	 */
	public static String toPascalCaseNotation(String name) {
		
		char[] chars = name.toCharArray();
		StringBuffer convertedName = new StringBuffer();
		for(int idx = 0; idx < chars.length; idx ++ ) {
			boolean isPascalCase = false;
			char previousChar = idx == 0 ? '\0' : chars[idx-1];
			char currentChar = chars[idx];			
			
			// Checks camel case.
			if(previousChar == ' ' 
			|| previousChar == '-'
			|| previousChar == '_'
			){
				isPascalCase = true;
			}
			
			// Checks skip chars.
			if(currentChar == ' '
			|| currentChar == '-'
			|| currentChar == '_'
			){
				continue;
			}
	
			// Checks already CamelCase.
			if(Character.isLowerCase(previousChar) == true
			&& Character.isUpperCase(currentChar) == true ){
				isPascalCase = true;
			}
			
			// Appends char into camelCase StringBuffer.
			if(isPascalCase == true) {
				convertedName.append(String.valueOf(currentChar).toUpperCase());
			}else{
				convertedName.append(String.valueOf(currentChar).toLowerCase());
			}
		}
		
		return convertedName.toString();
	}
	
	/**
	 * MD5 암호화
	 * @param string 암호화할 문자열
	 * @return 암호화된 문자열
	 */
	public static String getCryptoMD5String(String str) throws Exception {
		String md5 = ""; 
		MessageDigest md = MessageDigest.getInstance("MD5"); 
		md.update(str.getBytes()); 
		byte byteData[] = md.digest();
		StringBuffer sb = new StringBuffer(); 
		for(int i = 0 ; i < byteData.length ; i++){
			sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
		}
		md5 = sb.toString();
		return md5;
	}

	/**
	 * 변환
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public static String replval(String value) throws Exception {
		if (value == null) {
	          return null;
	        }
	        StringBuffer result = new StringBuffer(value.length());
	        for (int i=0; i<value.length(); ++i) {
	          switch (value.charAt(i)) {
	          case '<':
	              	result.append("");
	              break;
	            case '>':
	            	 result.append("");
	              break;
	            case '"':
	            	 result.append("");
	              break;
	            case '%':
	            	 result.append("");
	              break;
	            case ';':
	            	 result.append("");
	              break;
	            case '(':
	            	 result.append("");
	              break;
	            case ')':
	            	 result.append("");
	              break;
	            case '&':
	            	 result.append("");
	              break;
	            case '+':
	            	 result.append("");
	              break;
	            default:
	              result.append(value.charAt(i));
	              break;
	          }
	        }
	        return result.toString(); 
	}
	
	/**
	* 날짜의yyyymmddhhmmss 형식을 yyyy-mm-dd hh:mm:ss형식으로 변환해서 리턴
	* @param date - yyyymmddhhmmss
	* @return yyyy-mm-dd hh:mm:ss
	*/
	public static String strToYMHS(String date) {
		String rvStr;
		if (date == null || date.trim().length() != 14) {
			rvStr = date;
		} else {
			date = date.trim();
			rvStr = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
		}
		return rvStr;
	 }
	
}
