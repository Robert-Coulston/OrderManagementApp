# Use the .NET SDK 8 as the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy the project files to the working directory
COPY "Backend/OrderManagementBackend.sln" "Backend/OrderManagementBackend.sln"
COPY "Backend/API/API.csproj" "Backend/API/API.csproj"
COPY "Backend/Core/Core.csproj" "Backend/Core/Core.csproj"
COPY "Backend/Infrastructure/Infrastructure.csproj" "Backend/Infrastructure/Infrastructure.csproj"


# Build the application
RUN dotnet restore "Backend/OrderManagementBackend.sln"

COPY . .

# Publish the application
RUN dotnet publish "Backend/OrderManagementBackend.sln" -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
COPY --from=build-env /app/out .

ENTRYPOINT [ "dotnet", "API.dll" ]

