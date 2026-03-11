using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.BusinessLayer
{
    public class StudentBusiness
    {
        private readonly IStudentBusiness _iStudentBusiness;
        public StudentBusiness(IStudentBusiness iStudentBusiness)
        {
            this._iStudentBusiness = iStudentBusiness;
        }

        public async Task<bool> Login(string username, string password)
        {
            if(username ==null && password == null)
            {
                return false;
            }
            else
            {
                return await this._iStudentBusiness.Login(username, password);
            }
            
        }
        public async Task<bool> InsertStudentInfo(string firstName, string middleName, string lastName, string location, string emailAdd, string phoneNumber, string studentBlock, string studentUsername, string studentPassword, string studentYear)
        {
            if(firstName == null && middleName == null && location == null && studentUsername == null && studentPassword == null)
            {
                return false;
            }
            else
            {
                return await this._iStudentBusiness.InsertStudentInfo(firstName, middleName, lastName, location, emailAdd, phoneNumber, studentBlock, studentUsername, studentPassword, studentYear);
            }
        }

        public List<student_info> showStudentList(string yr_lvl, string block)
        {
            return this._iStudentBusiness.showStudentList(yr_lvl, block);
        }

        public async Task<bool> UpdateStudentInfo(student_info info)
        {
            return await this._iStudentBusiness.UpdateStudentInfo(info);
        }

        public async Task<bool> AddSubjectToStudent(tbl_student_subject ss)
        {
            return await this._iStudentBusiness.AddSubjectToStudent(ss);
        }

        public List<student_subject> ShowStudentSubjectList(int studId)
        {
            return _iStudentBusiness.ShowStudentSubjectList(studId);
        }

        public async Task<bool> RemoveEnrollSubject(int studId, int subjId)
        {
            return await _iStudentBusiness.RemoveEnrollSubject(studId, subjId);
        }
    }
}