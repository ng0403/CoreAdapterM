package com.core.plus.common;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.sun.org.apache.xml.internal.serialize.OutputFormat;
import com.sun.org.apache.xml.internal.serialize.XMLSerializer;

public class ConfigureFactory {
	
	static Logger logger = Logger.getLogger(ConfigureFactory.class);
	static Configure instance = null;
	static Document document = null;

	/**
	 * @return the document
	 */
	public synchronized static Document getDocument() {
		return document;
	}

	/**
	 * 프로토콜 컨텍스트 반환
	 * @param protocolId
	 * @return
	 * @throws Exception
	 */
	public static synchronized Configure getConfigure() throws Exception {
		if(instance == null) {
			instance = createConfigure();
		}
		return instance;
	}
	
	
	private static void checkEnv(Configure configure) throws Exception {
		//---------------------------------------------------------------
		// 환경변수 설정내용 로드
		//---------------------------------------------------------------
//		configure.setVanillaHome(System.getenv("VANILLA_HOME"));
//		configure.setVanillaNode(System.getenv("VANILLA_NODE"));
//		configure.setConfigPath(System.getenv("VANILLA_CONFIG"));
//		
//		// 환경변수 결과 체크
//		if(Commons.isNull(configure.getVanillaHome()) == true) {
//			String message = "시스템변수.홈디렉토리설정[VANILLA_HOME] 설정값 없음:" + configure.getVanillaHome();
//			logger.error(message);
//			throw new Exception(message);
//		}
//		if(Commons.isNull(configure.getConfigPath()) == true) {
//			String message = "시스템변수.설정화일 경로[VANILLA_CONFIG] 설정값 없음:" + configure.getConfigPath();
//			logger.error(message);
//			throw new Exception(message);
//		}
//		if(Commons.isNull(configure.getVanillaNode()) == true) {
//			String message = "시스템변수.노드Alias설정[VANILLA_NODE] 설정값 없음:" + configure.getVanillaHome();
//			logger.error(message);
//			throw new Exception(message);
//		}
		
		
		configure.setVanillaHome(System.getenv("NEW_VANILLA_HOME"));
		configure.setVanillaNode(System.getenv("NEW_VANILLA_NODE"));
		configure.setConfigPath(System.getenv("NEW_VANILLA_CONFIG"));
		
		// 환경변수 결과 체크
		if(Commons.isNull(configure.getVanillaHome()) == true) {
			String message = "시스템변수.홈디렉토리설정[NEW_VANILLA_HOME] 설정값 없음:" + configure.getVanillaHome();
			logger.error(message);
			throw new Exception(message);
		}
		if(Commons.isNull(configure.getConfigPath()) == true) {
			String message = "시스템변수.설정화일 경로[NEW_VANILLA_CONFIG] 설정값 없음:" + configure.getConfigPath();
			logger.error(message);
			throw new Exception(message);
		}
		if(Commons.isNull(configure.getVanillaNode()) == true) {
			String message = "시스템변수.노드Alias설정[NEW_VANILLA_NODE] 설정값 없음:" + configure.getVanillaHome();
			logger.error(message);
			throw new Exception(message);
		}
	}
	

	/**
	 * 프로토콜 컨텍스트 객체 생성
	 * @param protocolId
	 * @return
	 * @throws Exception
	 */
	static private synchronized Configure createConfigure() throws Exception {
		
		Configure configure = new Configure();
		
		logger.warn("== VANILLA("+configure.getConfigPath()+") Configuration XML Loading");

		checkEnv(configure);
		
		//---------------------------------------------------------------
		// 설정XML파일 로드
		//---------------------------------------------------------------
		File vanillaXml = new File(configure.getConfigPath());
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		document = documentBuilder.parse(vanillaXml);
		
		//---------------------------------------------------------------
		// 서버설정부 로드
		//---------------------------------------------------------------
		// NO-DATABASE 모드여부
		String nodbMode = document.getElementsByTagName("NodbMode").item(0).getTextContent().trim();
		logger.warn(" + nodbMode: " + nodbMode);
		configure.setNodbMode(Boolean.parseBoolean(nodbMode));
		
		// 승인유형
		String approvalType = document.getElementsByTagName("ApprovalType").item(0).getTextContent().trim();
		logger.info(" + approvalType: " + approvalType);
		configure.setApprovalType(approvalType);
		
		// 암호화알고리즘
		String securityAlgorithm = document.getElementsByTagName("SecurityAlgorithm").item(0).getTextContent().trim();
		logger.info(" + securityAlgorithm: " + securityAlgorithm);
		configure.setSecurityAlgorithm(securityAlgorithm);
		
		// 암호화공개키
		String securityKey = document.getElementsByTagName("SecurityKey").item(0).getTextContent().trim();
		logger.info(" + securityKey: " + securityKey.getBytes().length + " bytes");
		configure.setSecurityKey(securityKey);
		
		//SEED 암호화 키값 설정
		configure.setSeedCryptKey(new byte[] {(byte)0x88, (byte)0xE3, (byte)0x4F, (byte)0x8F, (byte)0x08, (byte)0x17, (byte)0x79, (byte)0xF1, (byte)0xE9, (byte)0xF3, (byte)0x94, (byte)0x37, (byte)0x0A, (byte)0xD4, (byte)0x05, (byte)0x89});
		configure.setRequestIV("2307132151126537".getBytes());
//		configure.setResponseIV("5415034551235615".getBytes());
		configure.setResponseIV("2307132151126537".getBytes());

		//---------------------------------------------------------------
		// 추가업무영역에서 사용할 설정
		//---------------------------------------------------------------
		NodeList propertiesNodeList = document.getElementsByTagName("Properties").item(0).getChildNodes();
		for(int idx = 0, size = propertiesNodeList.getLength(); idx < size; idx ++ ) {
			Node propertyNode = propertiesNodeList.item(idx);
			if(propertyNode.getNodeType() != Node.ELEMENT_NODE) continue;
			String key = propertyNode.getNodeName();
			String value = propertyNode.getTextContent().trim();
			logger.debug("key/value:" + key + "/" + value);
			configure.properties.setString(key, value);
		}
		
		//---------------------------------------------------------------
		// VanServers
		//---------------------------------------------------------------
		Node vanServersNode = document.getElementsByTagName("VanServers").item(0);
		NodeList vanServersChildNodes = vanServersNode.getChildNodes();
		for(int idx = 0, size = vanServersChildNodes.getLength(); idx < size; idx ++ ) {
			Node serverNode = vanServersChildNodes.item(idx);
			if(serverNode.getNodeType() != Node.ELEMENT_NODE) continue;
			NamedNodeMap attributes = serverNode.getAttributes();
			ValueObject servers = new ValueObject();
			servers.setString("name", attributes.getNamedItem("name").getTextContent());
			servers.setString("id", attributes.getNamedItem("id").getTextContent());
			servers.setString("type", attributes.getNamedItem("type").getTextContent());
			servers.setString("ipaddress", attributes.getNamedItem("ipaddress").getTextContent());
			servers.setString("rmi", attributes.getNamedItem("rmi").getTextContent());
			servers.setString("registry", attributes.getNamedItem("registry").getTextContent());
			servers.setString("concurrent", attributes.getNamedItem("concurrent").getTextContent());
			servers.setString("active", attributes.getNamedItem("active").getTextContent());
			servers.setString("proxy", attributes.getNamedItem("proxy").getTextContent());
			configure.getVanServers().add(servers);
		}

		return configure;
	}


	/**
	 * 현재 설정정보를 설정파일에 저장처리한다.
	 * @param configure
	 * @throws Exception
	 */
	public static synchronized void saveConfigure(Configure configure) throws Exception {
		
		logger.warn("== VANILLA("+configure.getConfigPath()+") Configuration XML Saving");

		checkEnv(configure);
		
		//---------------------------------------------------------------
		// 설정XML파일 저장
		//---------------------------------------------------------------
		File vanillaXml = new File(configure.getConfigPath());
		document = getDocument();
		
		document.getElementsByTagName("NodbMode").item(0).setTextContent(""+configure.isNodbMode());					// NO-DATABASE 모드여부
		document.getElementsByTagName("ApprovalType").item(0).setTextContent(configure.getApprovalType());				// 승인유형
		document.getElementsByTagName("SecurityAlgorithm").item(0).setTextContent(configure.getSecurityAlgorithm());	// 암호화알고리즘
		document.getElementsByTagName("SecurityKey").item(0).setTextContent(configure.getSecurityKey());				// 암호화공개키

		//---------------------------------------------------------------
		// 추가업무영역에서 사용할 설정
		//---------------------------------------------------------------
		NodeList propertiesNodeList = document.getElementsByTagName("Properties").item(0).getChildNodes();
		for(int idx = 0, size = propertiesNodeList.getLength(); idx < size; idx ++ ) {
			Node propertyNode = propertiesNodeList.item(idx);
			if(propertyNode.getNodeType() != Node.ELEMENT_NODE) continue;
			String key = propertyNode.getNodeName();
			String value = configure.properties.getString(key);
			propertyNode.setTextContent(value);
		}
		
		//---------------------------------------------------------------
		// VanServers
		//---------------------------------------------------------------
		Node vanServersNode = document.getElementsByTagName("VanServers").item(0);
		Node nextNode = null;
		for(Node serverNode = vanServersNode.getFirstChild(); serverNode!=null; serverNode = nextNode) {
			nextNode = serverNode.getNextSibling();
			if(serverNode.getNodeType() != Node.ELEMENT_NODE) continue;
			vanServersNode.removeChild(serverNode);
		}
			
		List<ValueObject> vanServers = configure.getVanServers();
		for(ValueObject vanServer : vanServers) {
			Element serverNode = document.createElement("Server");
			
			serverNode.setAttribute("name", vanServer.getString("name"));
			serverNode.setAttribute("id", vanServer.getString("id"));
			serverNode.setAttribute("type", vanServer.getString("type"));
			serverNode.setAttribute("ipaddress", vanServer.getString("ipaddress"));
			serverNode.setAttribute("rmi", vanServer.getString("rmi"));
			serverNode.setAttribute("registry", vanServer.getString("registry"));
			serverNode.setAttribute("concurrent", vanServer.getString("concurrent"));
			serverNode.setAttribute("active", vanServer.getString("active"));
			serverNode.setAttribute("proxy", vanServer.getString("proxy"));

			vanServersNode.appendChild(serverNode);
		}
		
        // Get root of template document
        Element root = document.getDocumentElement();
        FileOutputStream fileoutputstream = null;
		
        try
        {
			fileoutputstream = new FileOutputStream(vanillaXml);
			OutputFormat outputformat = new OutputFormat();
			outputformat.setEncoding(document.getXmlEncoding());
			outputformat.setIndent(4);
			outputformat.setIndenting(true);
			outputformat.setPreserveSpace(false);
			
			XMLSerializer serializer = new XMLSerializer();
			serializer.setOutputFormat(outputformat);
			serializer.setOutputByteStream(fileoutputstream);
			serializer.asDOMSerializer();
			if (root != null)
				serializer.serialize(root);
        }
        catch (Exception e)
        {
            logger.error(e);
        } finally {
        	if(fileoutputstream!=null)
        		fileoutputstream.close();
        }

	}


}
