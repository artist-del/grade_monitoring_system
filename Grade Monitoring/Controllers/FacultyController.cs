using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Grade_Monitoring.Models;
using Grade_Monitoring.ServiceLayer;
using System.Threading.Tasks;

namespace Grade_Monitoring.Controllers
{
    public class FacultyController : Controller
    {
        private readonly FacultyService _facultyService;
        public FacultyController()
        {
            this._facultyService = new FacultyService();
        }
        // GET: Faculty
        public ActionResult Index()
        {
            if (Session["userId"] != null)
            {
                return View();
            }
            else if (Session["AdminId"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
            
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(faculty_table ft)
        {
            var userId = this._facultyService.Login(ft.faculty_username, ft.faculty_password);

            Session["userId"] = userId;

            return Json(new
            {
                userId,
                result = userId
            });
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Register(faculty_table ft)
        {
            var result = await this._facultyService.Register(ft);

            return Json(new
            {
                result
            });
        }

        [HttpGet]
        public JsonResult ListOfBlocks()
        {

            var list = this._facultyService.ListOfBlocks();

            return Json(new
            {
                list
            },JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> InsertYearBlock(student_block sb)
        {
            var result = await _facultyService.InsertYearBlock(sb);

            return Json(new
            {
                result
            });
        }

        public async Task<JsonResult> RemoveStudent(int id)
        {
            var result = await _facultyService.RemoveStudent(id);
            return Json(new
            {
                result
            });
        }

        public ActionResult StudentInfo()
        {
            var db = new grade_monitoringEntities();

            var list = db.student_info.ToList();
            return View(list);
        }

        public ActionResult Logout()
        {
            Session.Clear();

            return RedirectToAction("Login");
        }

        public ActionResult Subject()
        {
            return View();
        }
    }
}