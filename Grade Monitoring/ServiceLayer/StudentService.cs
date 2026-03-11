using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.BusinessLayer;
using Grade_Monitoring.DataAccessLayer;
using System.Threading.Tasks;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.ServiceLayer
{
    public class StudentService
    {
        public async Task<bool> Login(string username, string password)
        {
            return await new StudentBusiness(new DLStudentAccess()).Login(username, password);
        }

        public async Task<bool> InsertStudentInfo(string firstName, string middleName, string lastName, string location, string emailAdd, string phoneNumber, string studentBlock, string studentUsername, string studentPassword, string studentYear)
        {
            return await new StudentBusiness(new DLStudentAccess()).InsertStudentInfo(firstName, middleName, lastName, location, emailAdd, phoneNumber, studentBlock, studentUsername, studentPassword, studentYear);
        }

        public List<student_info> showStudentList(string yr_lvl, string block)
        {
            return new StudentBusiness(new DLStudentAccess()).showStudentList(yr_lvl, block);
        }

        public async Task<bool> UpdateStudentInfo(student_info info)
        {
            return await new StudentBusiness(new DLStudentAccess()).UpdateStudentInfo(info);
        }

        public async Task<bool> AddSubjectToStudent(tbl_student_subject ss)
        {
            return await new StudentBusiness(new DLStudentAccess()).AddSubjectToStudent(ss);
        }

        public List<student_subject> ShowStudentSubjectList(int studId)
        {
            return new StudentBusiness(new DLStudentAccess()).ShowStudentSubjectList(studId);
        }

        public async Task<bool> RemoveEnrollSubject(int studId, int subjId)
        {
            return await new StudentBusiness(new DLStudentAccess()).RemoveEnrollSubject(studId, subjId);
        }
    }
}