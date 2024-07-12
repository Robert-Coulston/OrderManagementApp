# OrderManagementApp
A fullstack app to maintain customers and orders  
Uses graphql for data management  

#Data Migrations
Update dotnet tools
dotnet  tool update --global dotnet-ef

Go to folder Backend
dotnet ef migrations add InitialCreate -p .\Infrastructure\ -s .\API\

#Prepare publish
Delete wwwroot folder from Backend/API
Open powershell and go to folder Frontend/ordermanagement
Note the line in package.json "postbuild": "move build ../../Backend/API/wwwroot", then run
npm run build
There should be folder wwwroot in Backend/API

Build the docker image
docker build -t 151413121110/ordermanagementapp .

If the docker image already exists, from folder ordermanagementapp login to docker
docker login
follow the username and password prompts
then run the command
docker push 151413121110/ordermanagementapp:latest


#Docker
Dockerfile contains the commands to build a docker container
open Docker Desktop and sign in with user name 151413121110

For a first time create image,
from the ordermanagementapp directory, in a terminal window type "docker build -t 151413121110/ordermanagementapp ."
This will build the container. The first time will take a while (5 minutes or more)
To run, ensure env.production is set to http://localhost:8080/graphql, then run the command
docker run --rm -it -p 8080:80 151413121110/ordermanagementapp


