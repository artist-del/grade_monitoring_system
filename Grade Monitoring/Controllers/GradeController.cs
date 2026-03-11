using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.Controllers
{
    public class GradeController : Controller
    {
        grade_monitoringEntities db = new grade_monitoringEntities();
        // GET: Grade
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult StudentGrade()
        {
            try
            {
                var username = Session["username"].ToString();
                var entity = db.student_info.Where(x => x.stud_username==username).FirstOrDefault();

                var studId = entity.id;
                Session["fullName"] = entity.first_name.ToString() + " " + entity.middle_name.ToString() + " " + entity.last_name.ToString();
                Session["studentBlock"] = entity.student_block.ToString();
                Session["yearLvl"] = entity.year_lvl.ToString();

                var query = db.tbl_student_grade.Where(x => x.student_id.Equals(studId)).Select(s => new
                {
                    subjectCode = s.student_subject.subject_code,
                    subjectName = s.student_subject.subject_name,
                    firstSem = s.first_sem,
                    secondSem = s.second_sem,
                    finalResult = s.final_result,
                    status = s.final_result == null ? "Not Graded" : s.final_result >= 75 ? "Passed" : "Failed"
                }).ToList();

                return Json(new
                {
                    query
                }, JsonRequestBehavior.AllowGet);
            }
            catch (System.Exception)
            {

                return Json(new
                {
                    result = false
                });
            }
        }

        [HttpPost]
        public JsonResult StudentSubject()
        {
            try
            {
                var username = Session["username"].ToString();
                var entity = db.student_info.Where(x => x.stud_username == username).FirstOrDefault();

                var studId = entity.id;

                var query = db.tbl_student_grade.Where(x => x.student_id.Equals(studId)).Select(s => new
                {
                    subjectCode = s.student_subject.subject_code,
                    subjectName = s.student_subject.subject_name,
                    subjectUnit = s.student_subject.subject_unit,
                    subjectYear = s.student_subject.year_level,
                    subjectSem = s.student_subject.per_sem
                }).ToList();

                return Json(new
                {
                    list = query
                }, JsonRequestBehavior.AllowGet);
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