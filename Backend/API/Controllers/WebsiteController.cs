using Microsoft.AspNetCore.Mvc;

namespace OrderManagementApp.API.Controllers
{
    public class WebsiteController : Controller
    {
        public IActionResult Index()
        {
            // Your code logic here

            return PhysicalFile(System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/html");
        }
    }
}
