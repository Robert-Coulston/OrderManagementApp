Start-Process dotnet run
Start-Sleep -s 8
Start-Process "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "http://localhost:5133/graphql"
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:5133/graphql"