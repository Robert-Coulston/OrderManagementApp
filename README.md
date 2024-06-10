# OrderManagementApp
A fullstack app to maintain customers and orders  
Uses graphql for data management  

#Data Migrations
Update dotnet tools
dotnet  tool update --global dotnet-ef

Go to folder Backend
dotnet ef migrations add InitialCreate -p .\Infrastructure\ -s .\API\