using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.BusinessLayer
{
    public interface IStudentBusiness
    {
        Task<bool> Login(string username, string password);

        Task<bool> InsertStudentInfo(string firstName, string middleName, string lastName, string location, string emailAdd, string phoneNumber, string studentBlock, string studentUsername, string studentPassword, string studentYear);

        List<student_info> showStudentList(string yr_lvl, string block);

        Task<bool> UpdateStudentInfo(student_info info);

        Task<bool> AddSubjectToStudent(tbl_student_subject ss);

        List<student_subject> ShowStudentSubjectList(int studId);

        Task<bool> RemoveEnrollSubject(int studId, int subjId);
    }
}
