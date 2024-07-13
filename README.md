# OrderManagementApp
A fullstack app to maintain customers and orders  
Uses graphql for data management  

#Data Migrations
Update dotnet tools
dotnet  tool update --global dotnet-ef

Entity framework migrations are update. Here is an example to create the intial migration.
On powershell command prompt, go to folder Backend and enter
dotnet ef migrations add InitialCreate -p .\Infrastructure\ -s .\API\

#Prepare publish in docker
Create folder Backend/API/wwwroot if not already exist
Delete the contents of Backend/API/wwwroot if already exist
Open powershell and go to folder Frontend/ordermanagement
For production, ensure Frontend/ordermanagement/env.production is set to http://localhost:8080/graphql
Note the line in package.json "postbuild": "shx rm -rf ../../Backend/API/wwwroot/* && shx cp -r build/* ../../Backend/API/wwwroot/"
npm run build
There should be folder wwwroot in Backend/API with the contents of the UI build
Go to the ordermanagement (top level) folder
Build the local docker image
docker build -t 151413121110/ordermanagementapp .

If the docker image already exists, from folder ordermanagementapp login to docker
docker login
follow the username and password prompts
Push the local image to the docker hub, enter the following
docker push 151413121110/ordermanagementapp:latest

#Run Docker
Open docker desktop
From a powershell command prompt (no specific folder), enter the following
docker run --rm -it -p 8080:8080 151413121110/ordermanagementapp
Go to docker desktop and containers menu
See the container status is Running
Browser address http://localhost:8080/ will run the app


