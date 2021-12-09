using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace OrchardBlog.ReactClient.Controllers
{
    public class AuthorizationController : Controller
    {
        [HttpGet]
        [HttpPost]
        public ActionResult Index ()
        {
            return View();
        }
    }
}
