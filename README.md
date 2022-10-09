# Frontend & Backend

## Index
- [SVinternShip](#SVinternShip)
  - [About The Project](#about-the-project) 
    * [Project Title](#project-title) 
    * [Project Overview](#project-overview) 
  - [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites) 
    * [Installing](#installing) 
  - [File Manifest](#file-manifest)
  - [Copyrights / End User Licesnse](#copyrights--end-user-licesnse)
  - [Contact Information](#contact-information)

## About The Project

### Project Title
**AssiCT**
Click the image below to watch service introduction video
[![Video Label](https://user-images.githubusercontent.com/53938323/181439639-f135e458-9447-41eb-b4a1-e71714b44773.png)](https://youtu.be/nOihtuVtIlU)

### Project Overview
![image](https://user-images.githubusercontent.com/53938323/180675735-6d46cd47-6844-4174-a281-dcec6f71dba5.png)


<details>
  <summary>Frontend</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">React</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
  </ul>
</details>


<details>
  <summary>Frontend</summary>
  <ul>
    <li><a href="https://chakra-ui.com/">Chakra</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>
</details>


<details>
  <summary>Backend</summary>
  <ul>
    <li><a href="https://certbot.eff.org/">Certbot</a></li>
    <li><a href="https://github.com/django/daphne">Daphne</a></li>
    <li><a href="https://www.nginx.com/">Nginx</a></li>
    <li><a href="https://www.djangoproject.com/">Django</a></li>
    <li><a href="https://cloud.google.com/storage">Google Cloud Storage</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
    <li><a href="https://redis.io/">Redis</a></li>
    <li><a href="https://flask.palletsprojects.com/en/2.2.x/">Flask</a></li>
    <li><a href="https://www.rabbitmq.com/">RabbitMQ</a></li>
    <li><a href="https://github.com/celery/celery">Celery</a></li>
  </ul>
</details>


<details>
  <summary>Devops</summary>
  <ul>
    <li><a href="https://grafana.com/">Grafana</a></li>
    <li><a href="https://prometheus.io/">Prometheus</a></li>
    <li><a href="https://github.com/google/cadvisor">cadvisor</a></li>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://flower.readthedocs.io/en/latest/">Flower</a></li>
  </ul>
</details>


## Getting Started

### Prerequisites

Our service was created through the AI Application Development by Silicon Valley Engineering program organized by Headstart Silicon Valley.
http://www.learnflagly.com/courses/347/

#### *DATABASE*

We didn't support any database on Dockerfile.
So, if you want to test this project you need to declare 2 DB first.

1. Google Cloud Storage Bucket
2. Postgresql

On *Google Cloud Storage Bucket*, you need access key json file. 

On *Postgresql*, you need Host address, User name/password, Database name. 

#### *Two DB Declarations* 
  
##### Postgres DB & Bucket Name

    Set DB NAME to DB PORT to your environment in the .env_server, .env_local file.
    
    DB_NAME=AssiCT
    DB_USER=dbmasteruser
    DB_HOST=ls-be2b7899bb8e4a14b10c9b048a594941c00a2e35.cd0wtijqfgih.ap-northeast-2.rds.amazonaws.com
    DB_PASSWORD=svproject22
    DB_PORT=5432
    BUCKET_NAME=#Google storage Bucket Name
    
##### Google Storage

    Get the gc_connect.json file and save it with the same name
    
    
### Installing

```
$ git clone https://github.com/SVinternShip/Frontend-Backend.git
```

- If you are running in your own server, modify domain.

#### *Running Local for DEV*
(Optional) After setting DB properly, you need to declare ML server. 
If you wont, file upload and predict service may not work.

    Set ML_SERVER to your environment in the .env_local file.
    
    ML_SERVER=15.164.65.34:5000
  
  
Then, build docker-compose-dev.yml
```
$ docker-compose -f docker-compose-dev.yml up --build -d
```


Running on Local environment only for check Django & React.

That means Nginx, Grafana, Promethus.. may not working.


#### *Issuing SSL Certificates for HTTPS*

    You must first obtain ssl authentication to run https.
    
    Frontend-Backend/ssl-certification/init-letsencrypt.sh << Enter your domain at init-lensencrypt.sh
    
![image](https://user-images.githubusercontent.com/53938323/180370292-8915ef02-16bf-490a-b995-07582c8a186d.png)

    Then just run init-lensencrypt.sh with sudo. 
    
    When docker composed, a data folder is generated and an ssl certificate is automatically issued.
    
    
#### Alert Manager

    Modify the recipient email information and auth password in config.yml.
    For your information. The auth password is a Google application password, which you want to set according to your settings.

#### Modify Target domain

    In the .env.production file, modify target to your domain.
    
    
#### *Final*

Finally, go to the top-level folder and type the command below in the terminal.
    
    docker-compose up --build -d


## File Manifest

```
├─alertmanager
│  └─templates
├─backend
│  └─assiCT_api_server
│      ├─alarm
│      │  └─migrations
│      ├─config
│      ├─ct
│      │  ├─api
│      │  ├─migrations
│      │  ├─models
│      │  └─serializer
│      └─doctor
│          ├─migrations
│          ├─models
│          └─serializer
├─frontend
│  └─assict_front
│      ├─public
│      └─src
│          ├─assets
│          │  └─img
│          ├─components
│          │  ├─Card
│          │  ├─Configurator
│          │  ├─FileUpload
│          │  ├─Footer
│          │  ├─GradientBorder
│          │  ├─Icons
│          │  ├─Layout
│          │  ├─Navbars
│          │  ├─Result
│          │  ├─Separator
│          │  ├─Sidebar
│          │  ├─Sign
│          │  └─Tables
│          ├─theme
│          │  ├─additions
│          │  │  ├─card
│          │  │  └─layout
│          │  ├─components
│          │  └─foundations
│          └─views
│              ├─Dashboard
│              └─pages
├─grafana
│  └─provisioning
│      ├─dashboards
│      └─datasources
├─nginx
├─prometheus
└─ssl-certification
```    
    
### *Pages by port*

#### prometheus  - (host):9090
![image](https://user-images.githubusercontent.com/53938323/181163124-12b7092c-5b3c-4793-addd-18baad36bd08.png)
#### grafana - (host):3000
![image](https://user-images.githubusercontent.com/53938323/181163151-de6c168f-a266-4792-b28b-618a9d5afb6b.png)
#### web - (host)
![image](https://user-images.githubusercontent.com/53938323/181163082-98fbd1e5-5176-4e93-a55e-b7551aced112.png)
#### swagger - (host)/api/swagger
![image](https://user-images.githubusercontent.com/53938323/181163058-0baff6e9-f2d9-41b2-b610-68975d097917.png)
--------------------------------------------------
#### celery - (host):5555
![image](https://user-images.githubusercontent.com/53938323/181163021-a398b9c9-e742-4b8d-9e33-30521a89fd48.png)

## Copyrights / End User Licesnse
```
MIT License

Copyright (c) 2020 always0ne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contact Information
| Name    | 전준형                                        |김민지                               | 김성윤                                        | 김정원                                    | 전경희                               |
| ------- | --------------------------------------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------- | --------------------------------------------- |
| Profile | <img width="200px" src="https://user-images.githubusercontent.com/53938323/181186519-97376af4-dec2-4266-b481-84476a7b08cf.png" />|<img width="200px" src="https://user-images.githubusercontent.com/53938323/181186658-5fa337ab-1073-40c1-ba1f-821eca61a241.png" />| <img width="200px" src="https://user-images.githubusercontent.com/53938323/181186805-e25768c2-b5b3-4af1-9ebe-f4ab31eba8f0.png" />| <img width="200px" src="https://user-images.githubusercontent.com/53938323/181186873-68715eac-5ba7-4084-aed6-613461addf37.png" />| <img width="200px" src="https://user-images.githubusercontent.com/53938323/181186909-add7aa9e-40ba-4822-98dc-994f21c2c455.png" />|
| role    | Team ㅣLeader, <br>Backend , <br>Frontend                  | Frontend,<br>Backend Django                       | ML                                | Frontend | Backend |
| Github  | [@Joon_Hyoung](https://github.com/Gitko97) | [@Minji Kim](https://github.com/minji1289) | [@sykim1106](https://github.com/hanueluni1106) | [@grdnr13](https://github.com/grdnr13) |  [@kjeon0901](https://github.com/kjeon0901) |
