![image](https://user-images.githubusercontent.com/53938323/180675735-6d46cd47-6844-4174-a281-dcec6f71dba5.png)



# Frontend & Backend


### *Issuing SSL Certificates for HTTPS*

    You must first obtain ssl authentication to run https.
    
    Frontend-Backend/ssl-certification/init-letsencrypt.sh << Enter your domain at init-lensencrypt.sh
    
![image](https://user-images.githubusercontent.com/53938323/180370292-8915ef02-16bf-490a-b995-07582c8a186d.png)

    Then just run init-lensencrypt.sh with sudo. 
    
    When docker composed, a data folde is generated and an ssl certificate is automatically issued.
  
  
### *Two DB Declarations* 

  And two DBs should be declared.
  1. Postgres SQL DataBase
  2. Google Storage
  
#### Postgres DB 

    Set DB NAME to DB PORT to your environment in the .env_server file.
    
    DB_NAME=AssiCT
    DB_USER=dbmasteruser
    DB_HOST=ls-be2b7899bb8e4a14b10c9b048a594941c00a2e35.cd0wtijqfgih.ap-northeast-2.rds.amazonaws.com
    DB_PASSWORD=svproject22
    DB_PORT=5432
    
#### Google Storage

    Get the gc_connect.json file and save it with the same name
    
    
#### Alert Manager

    Modify the recipient email information and auth password in config.yml.
    For your information. The auth password is a Google application password, which you want to set according to your settings.
    
    
   

### *FrontEnd*

#### Modify Target domain

    In the setupProxy.js file, modify target to your domain.
    
    
### *Finale*

Finally, go to the top-level folder and type the command below in the terminal.
    
    docker-compose up --build -d

