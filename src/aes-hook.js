
'use strict;'

console.log("Script loaded successfully ..... ");





function bytesToString(arr) {
    var str = '';
    arr = new Uint8Array(arr);
    for (var i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
}



function bytesToHex(arr) {
    var str = '';
    var k, j;
    for (var i = 0; i < arr.length; i++) {
        k = arr[i];
        j = k;
        if (k < 0) {
            j = k + 256;
        }
        if (j < 16) {
            str += "0";
        }
        str += j.toString(16);
    }
    return str;
}

var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    base64DecodeChars = new Array((-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 62, (-1), (-1), (-1), 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, (-1), (-1), (-1), (-1), (-1), (-1), (-1), 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, (-1), (-1), (-1), (-1), (-1), (-1), 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, (-1), (-1), (-1), (-1), (-1));

function bytesToBase64(e) {
    var r, a, c, h, o, t;
    for (c = e.length, a = 0, r = ''; a < c;) {
        if (h = 255 & e[a++], a == c) {
            r += base64EncodeChars.charAt(h >> 2),
                r += base64EncodeChars.charAt((3 & h) << 4),
                r += '==';
            break
        }
        if (o = e[a++], a == c) {
            r += base64EncodeChars.charAt(h >> 2),
                r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
                r += base64EncodeChars.charAt((15 & o) << 2),
                r += '=';
            break
        }
        t = e[a++],
            r += base64EncodeChars.charAt(h >> 2),
            r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
            r += base64EncodeChars.charAt((15 & o) << 2 | (192 & t) >> 6),
            r += base64EncodeChars.charAt(63 & t)
    }
    return r
}





if (Java.available) {
  Java.perform(function() {
  	
  	var keys = [];
   	
  	var args = [];
  
  	var dData = [];
  
  	var eData = [];
          	
          	
  	
  	
  
  	var secretkeyClassName
  	var ivClassName
  
  	var opmodeString
  	
  	var hashcode_dec
  	
  	var hashcode_enc
  	
  
  	var initIVKey
  	
  
  	var initSecKey
  
  	
  
  
  	var seckey;  
  	var ivkey;
   
      
  
  
  
  	var dataBeforeCipher;
  	var dataAfterCipher
  
  
  
      
  	var secretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
  	secretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function (x, y) {
  	          
          
          var result = this.$init(x, y);
          
          
          seckey = bytesToBase64(x);
                       	
      	return result;
      	   
       
        } 
  	
  	
      
	
      const ivParameterSpec = Java.use('javax.crypto.spec.IvParameterSpec');
      ivParameterSpec.$init.overload('[B').implementation = function (x) {
      	
      	var result = this.$init(x);
          
      	ivkey = bytesToBase64(x);
          
      
          
              
  
          return result;
      } 
    
    
    
      //Cipher stuff
      
      const Cipher = Java.use('javax.crypto.Cipher');
      Cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (opmode, secretkey, iv) {
      	
      	
      
      	opmodeString = this.getOpmodeString(opmode);
          args.push({'name': 'opmode', 'value': opmodeString});
          
          
          
          
          
  
  
  	    if (opmode == 1) // 1 means Cipher.MODE_ENCRYPT
         {
              hashcode_enc  = + this.hashCode().toString();
             
             args.push({'name': 'hashcode_enc', 'value': hashcode_enc});
          } 
                         
             
          else // In this android app it is either 1 (Cipher.MODE_ENCRYPT) or 2 (Cipher.MODE_DECRYPT)
          {
             hashcode_dec = + this.hashCode().toString();
             
             args.push({'name': 'hashcode_dec', 'value': hashcode_dec});
          } 
          
          
  
          secretkeyClassName = secretkey.$className
          ivClassName = iv.$className
          
          args.push({'name': 'secretkeyClassName', 'value': secretkeyClassName});  	
    	  args.push({'name': 'IVclassName', 'value': ivClassName});
    
    
           //keys from SecretKeySpec and IvParameterSpec 
          args.push({'name': 'SecretSpecKey', 'value': seckey});
          args.push({'name': 'IvSpecKey', 'value': ivkey});

            
   
        //We will have two lists in the python code, which keep track of the Cipher objects and their modes.

          
             //Also we can obtain the key,iv from the args passed to init call
          
          initSecKey = secretkey.getEncoded();
          
          args.push({'name': 'Key from call to cipher init', 'value': bytesToBase64(initSecKey)});
          
          keys.push({'name': 'Key from call to cipher init', 'value': bytesToString(initSecKey) });
          
          
          //arg z is of type AlgorithmParameterSpec, we need to cast it to IvParameterSpec first to be able to call getIV function
          
          initIVKey = Java.cast(iv, ivParameterSpec).getIV();
          
          args.push({'name': 'IV from call to cipher init', 'value': bytesToBase64(initIVKey)});
          
          keys.push({'name': 'IV from call to cipher init', 'value': bytesToString(initIVKey) });
          
          //init must be called this way to work properly
          
          
          
          
      	
      
      
    	  var algo = this.getAlgorithm();
    
    
      	// call original init method
          this.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').call(this, opmode, secretkey, iv);
          
        }    
          
          //now hooking the doFinal method to intercept the enc/dec process
    //the mode specified in the previous init call specifies whether this Cipher object will decrypt or encrypt, there is no functions like cipher.getopmode() that we can use to get the operation mode of the object (enc or dec)
    //so we will send the data before and after the call to the python code, where we will decide which one of them is cleartext data
    //if the object will encrypt, so the cleartext data is availabe in the argument before the call, else if the object will decrypt, we need to send the data returned from the doFinal call and discard the data sent before the call
          
          Cipher.doFinal.overload("[B").implementation = function (x) {
          	dataBeforeCipher = bytesToString(x);
              
              var ret = Cipher.doFinal.overload("[B").call(this, x);
              
              dataAfterCipher = bytesToString(ret);
          
              eData.push({'name': 'DataBeforeCipher', 'value': dataBeforeCipher});
        
              dData.push({'name': 'DataAfterCipher', 'value': dataAfterCipher});
              
              
              var send_message = {
              	
              
              	
              	'args' : args,
              
                  'keys' : keys, 
                       
              	'eData': eData,
              
              	'dData': dData,
  
                         
         
             };
             
             send(send_message);        
              
              return ret;
          }
          
          
          
          



             
            	
      
     }
  
)}
    	

     