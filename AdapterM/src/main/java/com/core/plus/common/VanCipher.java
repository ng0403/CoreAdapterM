package com.core.plus.common;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.spec.KeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
//import java.util.ResourceBundle;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;

/**
	Algorithm Maximum Keysize 
	DES		64 
	DESede	* 
	RC2		128 
	RC4		128 
	RC5		128 
	RSA		* 
**/

public class VanCipher {

	private String algorithm = null;
	private Key key = null;
	private Cipher cipher = null;

	public VanCipher() 
		throws Exception {
		/*Configure configure = ConfigureFactory.getConfigure();*/
		
		this.algorithm = "DESede";
		/*this.algorithm = configure.getSecurityAlgorithm();*/
		this.cipher = Cipher.getInstance(this.algorithm);
		
		String skey = "80d0cdb049b6a489b5fbea34158c92674ca78f9b8abad089";
		/*String skey = configure.getSecurityKey();*/
		if (skey != null && skey.length() > 0)
			setCipherKey(skey);
	}

	public String encrypt(String input) 
		throws InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
		return encryptCipher(input);
	}

	public byte[] encrypt(byte[] bytes) 
		throws InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
		this.cipher.init(Cipher.ENCRYPT_MODE, key);
		return this.cipher.doFinal(bytes);
	}

	public String decrypt(String encryption)
		throws InvalidKeyException, 
		       BadPaddingException,
		       IllegalBlockSizeException {
		return decryptCipher(encryption);
	}
	
	public byte[] decrypt(byte[] bytes)
		throws InvalidKeyException, 
		       BadPaddingException,
		       IllegalBlockSizeException {
		this.cipher.init(Cipher.DECRYPT_MODE, key);
		return this.cipher.doFinal(bytes);
	}

	public void createKey() 
		throws NoSuchAlgorithmException {
		createCipherKey();
	}
	
	public String getKey() {
		return getCipherKey();
	}
	
	public void setKey(String keyString) 
		throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException {
		setCipherKey(keyString);
	}
		
	public String getAlgorithm() {
		return this.algorithm;
	}

	public void setAlgorithm(String algorithm) throws NoSuchAlgorithmException, NoSuchPaddingException {
		this.algorithm = algorithm;
		this.cipher = Cipher.getInstance(algorithm);
	}
	
	private String encryptCipher(String input)
		 throws InvalidKeyException, 
		        BadPaddingException,
		        IllegalBlockSizeException {
		this.cipher.init(Cipher.ENCRYPT_MODE, key);
		 byte[] inputBytes = input.getBytes();
		 byte[] encryptedBytes = cipher.doFinal(inputBytes);
		 String encrypted = bytesToHex(encryptedBytes);
		 return encrypted;
	}

	private String decryptCipher(String encryption)
		 throws InvalidKeyException, 
		        BadPaddingException,
		        IllegalBlockSizeException {
		this.cipher.init(Cipher.DECRYPT_MODE, key);
 		byte[] bytes = hexToBytes(encryption);
		 byte[] recoveredBytes = this.cipher.doFinal(bytes);
		 String recovered = null;
		 try{
			 recovered = new String(recoveredBytes, "UTF-8");
		 } catch(Exception e) {}
		 return recovered;
	}

	private void createCipherKey() throws NoSuchAlgorithmException {
		this.key = KeyGenerator.getInstance(this.algorithm).generateKey();
	}
	 
	private String getCipherKey() {
		 return bytesToHex(this.key.getEncoded());
	}

	private void setCipherKey(String keyString) 
	 	throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException {
		 byte[] bytes= hexToBytes(keyString);
		 KeySpec keySpec = null;
		 if (this.algorithm.equalsIgnoreCase("DES"))
			 keySpec = new DESKeySpec(bytes);
		 else if (this.algorithm.equalsIgnoreCase("DESede"))
			 keySpec = new DESedeKeySpec(bytes);
		 SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(this.algorithm);
		 this.key = keyFactory.generateSecret(keySpec);
	}
  	
  	// ����Ʈ �迭�� 16���� ��Ʈ������ �ٲ۴�.
	public static final String bytesToHex(byte[] a) {
  	
  		StringBuffer s = new StringBuffer();
  		for(int i=0;i<a.length;++i) {
  			s.append(Character.forDigit((a[i]>>4) & 0x0f, 16));
  			s.append(Character.forDigit(a[i] & 0x0f, 16));
  		}
  		return s.toString();
  	}
 	
 	// ����Ʈ �迭�� 16���� ��Ʈ������ �ٲ۴�.
  	public static final byte[] hexToBytes(String a) {
 	
 		byte[] b = a.getBytes();
 		byte[] c = new byte[b.length/2];
 		int digit= 0;
 		byte h = 0;
 		final byte alpha = 'a';
 		final byte number= '0';
 		for(int i=0;i<c.length;++i) {
 			h = b[i*2];
 			digit = (h < alpha)? h-number : h-alpha+10;
 			digit *= 16;
 			
 			h = b[i*2+1];
 			digit += (h < alpha)? h-number : h-alpha+10;
 			
 			c[i] = (byte) digit;
 		}
 		return c;
 	}

  	/**
	public static void main(String[] args) 
	   throws Exception {
		if (args.length < 2) {
		    System.out.println("USAGE: java VanCipherTest Command(Create/Encrypt/Decrypt) { CipherText }");
		    System.exit(1);
		}
		String command = args[0];
		
		VanCipher vc= new VanCipher();

		if (command.equalsIgnoreCase("Create")) {
			vc.createKey();
		    
		    String lcKey= vc.getKey();
		    System.out.println("key("+lcKey.length()+"): " + lcKey);
		    return;
		}
		
		if (!command.equalsIgnoreCase("Encrypt") && !command.equalsIgnoreCase("Decrypt")) {
		    System.out.println("Invalid command("+command+")!");
		    System.exit(1);
		}

		String input = args[1];
		
		if (command.equalsIgnoreCase("Encrypt")) {
			String encryption = vc.encrypt(input);
		    System.out.println("encrypted("+encryption.length()+"): " + encryption);
		    //input= encryption;
		}

		if (command.equalsIgnoreCase("Decrypt")) {
		    System.out.println("encrypted("+input.length()+"): " + input);
			byte[] b = VanCipher.hexToBytes(input);
			byte[] decryption = vc.decrypt(b);
			String text = new String(decryption);
			System.out.println("decrypted("+text.length()+"): " + text);
		}
	}
	**/
}
