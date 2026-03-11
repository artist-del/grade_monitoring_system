using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Grade_Monitoring.Models;
using System.Threading.Tasks;

namespace Grade_Monitoring.Controllers
{
    public class AdminController : Controller
    {
        grade_monitoringEntities db = new grade_monitoringEntities();
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FacultyList()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(tbl_Admin admin)
        {
            try
            {
                var entity = db.tbl_Admin.Where(x => x.admin_username.Equals(admin.admin_username) && x.admin_password.Equals(admin.admin_password)).FirstOrDefault();

                if(entity != null)
                {
                    Session["AdminId"] = entity.id.ToString();

                    return Json(new
                    {
                        result = true
                    });
                }else
                {
                    return Json(new
                    {
                        result = false
                    });
                }
            }
            catch (System.Exception)
            {
                return Json(new
                {
                    result = false
                });
            }
        }

       
    }
}