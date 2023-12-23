# MITMSanProj
MITMSanProj One-Stop DATA Sniffing Tool implemented with Frida and MITM

--------------------------------------------------------------------------

# Tools

+++ Two devices that are compatible with frida configuration and are also connected in same natwork. For this project we will use;

      --An android device(serving as server and client)
      
      N.B: You can use two different devices. 


+++ Software;

     --Python 3.8.10 version installed in Host OS

     --ADB connection between host OS and Client(VphoneGaGa)
     
     --Frida installed in host OS
     
     --Frida server hosted in VphoneGaGa Software which is serving as client in virtual environment

    N.B: Consult the internet for proper installation tutorials



----------------------------# Tools-----------------


# Description

A python project implemented with Frida and MITM to monitor traffic from an app and reveal Secret and IV keys at a predefined request.




-------------------------------# Description--------



# Usage
  
  For each traffic flow a request URL as an input argument is required! , this is going to be the link to the request you intend to reveal keys used therein. 
  
  Command:   

	mitmproxy --listen-port 5669 -s MITMSanProj.py

	  


---------------------------------# Usage------------



# Links

