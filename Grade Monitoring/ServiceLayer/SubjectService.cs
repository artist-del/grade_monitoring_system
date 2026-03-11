using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.Models;
using Grade_Monitoring.BusinessLayer;
using Grade_Monitoring.DataAccessLayer;
using System.Threading.Tasks;

namespace Grade_Monitoring.ServiceLayer
{
    public class SubjectService
    {
        public List<student_subject> SubjectList(string perSem)
        {
            return new SubjectBusiness(new DLSubjectAccess()).SubjectList(perSem);
        }

        public async Task<bool> InsertUpdateSubject(student_subject subject)
        {
            return await new SubjectBusiness(new DLSubjectAccess()).InsertUpdateSubject(subject);
        }

        public async Task<bool> RemoveSubject(int id)
        {
            return await new SubjectBusiness(new DLSubjectAccess()).RemoveSubject(id);
        }

        public async Task<bool> AddGrade(int studentId, int subjectId, decimal? firstSem, decimal? secondSem, decimal? finalResult)
        {
            return await new SubjectBusiness(new DLSubjectAccess()).AddGrade(studentId, subjectId, firstSem, secondSem, finalResult);
        }

        public IEnumerable<object> ShowStudentGrade(int id)
        {
            return new SubjectBusiness(new DLSubjectAccess()).ShowStudentGrade(id);
        }

        public tbl_student_grade SelectGradeById(int subjId)
        {
            return new SubjectBusiness(new DLSubjectAccess()).SelectGradeById(subjId);
        }
    }
}