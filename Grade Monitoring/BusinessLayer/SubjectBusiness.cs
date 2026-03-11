using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.Models;
using System.Threading.Tasks;

namespace Grade_Monitoring.BusinessLayer
{
    public class SubjectBusiness
    {
        private readonly ISubjectBusiness _iSubjectBusiness;
        public SubjectBusiness(ISubjectBusiness iSubjectBusiness)
        {
            _iSubjectBusiness = iSubjectBusiness;
        }

        public List<student_subject> SubjectList(string perSem)
        {
            return _iSubjectBusiness.SubjectList(perSem);
        }

        public async Task<bool> InsertUpdateSubject(student_subject subject)
        {
            if(subject.subject_code == "" || subject.subject_name == "" || subject.year_level == "" || subject.subject_unit == 0|| subject.per_sem == "")
            {
                return false;
            }
            else
            {
                return await _iSubjectBusiness.InsertUpdateSubject(subject);
            }
            
        }

        public async Task<bool> RemoveSubject(int id)
        {
            return await _iSubjectBusiness.RemoveSubject(id);
        }

        public async Task<bool> AddGrade(int studentId, int subjectId, decimal? firstSem, decimal? secondSem, decimal? finalResult)
        {
            return await _iSubjectBusiness.AddGrade(studentId, subjectId, firstSem, secondSem, finalResult);
        }

        public IEnumerable<object> ShowStudentGrade(int id)
        {
            return _iSubjectBusiness.ShowStudentGrade(id);
        }

        public tbl_student_grade SelectGradeById(int subjId)
        {
            return _iSubjectBusiness.SelectGradeById(subjId);
        }
    }
}