using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Grade_Monitoring.ServiceLayer;
using Grade_Monitoring.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Grade_Monitoring.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentService _studentService;
        private readonly SubjectService _subjectService;
        public StudentController()
        {
            this._studentService = new StudentService();
            this._subjectService = new SubjectService();
        }
        // GET: Student
        public ActionResult Index()
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login");
            }
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Login(student_info stud)
        {
            var result = await this._studentService.Login(stud.stud_username, stud.stud_password);

            Session["username"] = stud.stud_username;
            return Json(new
            {
                result
            });
        }

        [HttpPost]
        public async Task<JsonResult> InsertStudentInfo(student_info stud)
        {
            var result = await this._studentService.InsertStudentInfo(stud.first_name, stud.middle_name, stud.last_name, stud.location, stud.email_address, stud.phone_number, stud.student_block, stud.stud_username, stud.stud_password, stud.year_lvl);

            return Json(new
            {
                result
            });
        }

        public ActionResult Grade()
        {
            return View();
        }

        public ActionResult Subject()
        {
            return View();
        }

        [HttpGet]
        public JsonResult showStudentList(string yr_lvl, string block)
        {
            var list = this._studentService.showStudentList(yr_lvl, block);

            // Serialize the list to JSON

            // Return the JSON data using JsonResult
            return Json(new
            {
                list
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UpdateStudentInfo(student_info info)
        {
            var result = await this._studentService.UpdateStudentInfo(info);

            return Json(new
            {
                result
            });
        }

        public ActionResult Logout()
        {
            Session.Clear();

            return RedirectToAction("Login");
        }

        public async Task<JsonResult> AddSubjectToStudent(tbl_student_subject ss)
        {
            var result = await this._studentService.AddSubjectToStudent(ss);
            return Json(new
            {
                result
            });
        }

        [HttpGet]
        public JsonResult ShowStudentSubjectList(int studId)
        {
            try
            {
                var list = this._studentService.ShowStudentSubjectList(studId);

                //var list = JsonConvert.SerializeObject(model,
                //Formatting.None,
                //new JsonSerializerSettings()
                //{
                //    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                //});

                return Json(new
                {
                    list
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Log the exception
                // You can also return an error response to the client
                // For example, return a JsonResult with an error message
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<JsonResult> RemoveEnrollSubject(int studId, int subjId)
        {
            var result = await _studentService.RemoveEnrollSubject(studId, subjId);

            return Json(new
            {
                result
            });
        }

    }
}