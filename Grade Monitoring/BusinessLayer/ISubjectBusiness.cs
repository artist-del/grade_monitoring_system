using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.BusinessLayer
{
    public interface ISubjectBusiness
    {
        List<student_subject> SubjectList(string perSem);
        Task<bool> InsertUpdateSubject(student_subject subject);
        Task<bool> RemoveSubject(int id);

        Task<bool> AddGrade(int studentId, int subjectId, decimal? firstSem, decimal? secondSem, decimal? finalResult);

        IEnumerable<object> ShowStudentGrade(int id);

        tbl_student_grade SelectGradeById(int subjId);
    }
}
