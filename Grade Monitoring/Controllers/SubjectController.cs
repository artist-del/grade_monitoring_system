using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Grade_Monitoring.Models;
using Grade_Monitoring.ServiceLayer;
using System.Threading.Tasks;
using System.Configuration;

namespace Grade_Monitoring.Controllers
{
    public class SubjectController : Controller
    {
        private SubjectService _subjectService;
        public SubjectController()
        {
            this._subjectService = new SubjectService();
        }
        // GET: Subject
        public ActionResult Index(string perSem)
        {
            return View();
        }
        
        public async Task<JsonResult> SendSms(string message, int studentId, int subjectId, decimal? firstSem, decimal? secondSem, decimal? finalResult)
        {
            try
            {
                var accountSid = ConfigurationManager.AppSettings["TiwlioAccountSid"];
                var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
                TwilioClient.Init(accountSid, authToken);

                var messageOptions = new CreateMessageOptions(
                  new PhoneNumber("any phone number to send"));
                messageOptions.From = new PhoneNumber(ConfigurationManager.AppSettings["TwilioPhoneNumber"]);
                messageOptions.Body = message;
                MessageResource.Create(messageOptions);

                var result = await _subjectService.AddGrade(studentId, subjectId, firstSem, secondSem, finalResult);

                return Json(new
                {
                    result
                });

            }
            catch (System.Exception)
            {

                return Json(new
                {
                    result = false
                });
            }
        }

        //show student grade
        public JsonResult ShowStudentGrade(int studId)
        {
            var list = _subjectService.ShowStudentGrade(studId);
            return Json(new
            {
                list
            }, JsonRequestBehavior.AllowGet);
        }

        //subjectList
        public JsonResult SubjectList(string perSem)
        {
            var list = this._subjectService.SubjectList(perSem);

            return Json(new
            {
                list
            }, JsonRequestBehavior.AllowGet);
        }

        //select grade by suject id
        public JsonResult SelectGradeById(int subjId)
        {
            var result = this._subjectService.SelectGradeById(subjId);

            return Json(new
            {
                result
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> InsertUpdateSubject(student_subject subject)
        {

            var result = await this._subjectService.InsertUpdateSubject(subject);

            return Json(new
            {
                result
            });
        }

        public async Task<JsonResult> RemoveSubject(int id)
        {
            var result = await this._subjectService.RemoveSubject(id);

            return Json(new
            {
                result
            });
        }
    }
}