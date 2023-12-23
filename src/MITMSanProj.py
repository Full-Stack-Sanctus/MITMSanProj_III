import time
import frida
import json

from urllib.parse import quote, unquote
from mitmproxy import http
import sys


from base64 import b64encode


from pathlib import Path


enc_cipher_hashcodes = [] #cipher objects with Cipher.ENCRYPT_MODE will be stored here
dec_cipher_hashcodes = [] #cipher objects with Cipher.ENCRYPT_MODE will be stored here


class AdjustBody:
	
	
    
	post_body = "" 
	
	X = False
	
	U = "" 
	
	SK = "" 
	
	IV = "" 
	
	details_folder = Path("details")
	

class Input:
	

	
	if ((len(sys.argv) < 2) or (len(sys.argv) > 2)):
		
		url = input('Please input just one request URL: ')
		print(url) 
		AdjustBody.U = url
		

	else:
		
		AdjustBody.U = sys.argv[1]
		
		


def my_message_handler(message, payload):
    #mainly printing the data sent from the js code, and managing the cipher objects according to their operation mode
    
    
    
    if message["type"] == "send":
        # print message["payload"]
        payload = message["payload"]
        
        
        
        eData = payload["eData"]
        dData = payload["dData"]
        
       
        args = payload["args"]
        keys = payload["keys"]
        
        
        
        
        
        
        
        
        
        
        
        eDatalist = [eData]
        eData = AdjustBody.details_folder/'eData' 
        with open(eData, 'w') as f:
        	for lists in eDatalist:
        	     for items in lists:
        	          f.write('%s:%s\n\n\n' % (items["name"], items["value"].encode("utf-8")))
        
        
        dDatalist = [dData] 
        dData = AdjustBody.details_folder/'dData' 
        with open(dData, 'w') as f:
        	for lists in dDatalist:
        	     for items in lists:
        	          f.write('%s:%s\n\n\n' % (items["name"], items["value"].encode("utf-8")))
             	     
             
        list = [args] 
        more = AdjustBody.details_folder/'more' 
        with open(more, 'w') as f:
        	for lists in list:
        	     for items in lists:
        	          f.write('%s:%s\n\n\n' % (items["name"], items["value"]))
               
               
        keylist = [keys]
        keys = AdjustBody.details_folder/'keys'         
        with open(keys, 'w') as f:        	
        	for lists in keylist:
        	     for items in lists:
        	          f.write('%s:%s\n\n\n' % (items["name"], b64encode(bytes(items["value"], "utf-8") ) ))
                	
        
        
        
    else:
        print (message) 
        print ('*' * 16) 
        




    
def request(flow: http.HTTPFlow) -> None:
	
	
	
	if flow.request.pretty_url == AdjustBody.U:
		
		
		
		req_body = (flow.request.text)
		
		
		
		to_decrypt = unquote(req_body.split(":")[1]).split(",")[0].replace("\n","")
		
		
		AdjustBody.post_body = to_decrypt
		
		
		
		AdjustBody.X = True
	
		while AdjustBody.X > 0:
			
			app = "OPay"
			device = frida.get_usb_device()
			session = device.attach(app)
			time.sleep(1)
			
			
			
			with open("aes-hook.js") as f:
				script = session.create_script(f.read())
			
			script.on("message", my_message_handler)
			script.load()
			AdjustBody.X = False
			
		
		     
	else:
		return