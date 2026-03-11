using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.Models;
using System.Data.SqlClient;
using System.Data;
using Grade_Monitoring.BusinessLayer;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Grade_Monitoring.DataAccessLayer
{
    public class DLStudentAccess : IStudentBusiness
    {
        private grade_monitoringEntities _dbContext;

        public DLStudentAccess()
        {
            _dbContext = new grade_monitoringEntities();
        }

        //all crud of student
        public async Task<bool> Login(string username, string password)
        {
            var _username = new SqlParameter("@username", SqlDbType.VarChar) { Value = username };
            var _password = new SqlParameter("@password", SqlDbType.VarChar) { Value = password };
            var loginResultParam = new SqlParameter("@loginResult", SqlDbType.Bit) { Direction = ParameterDirection.Output };

            await _dbContext.Database.ExecuteSqlCommandAsync("EXEC pr_StudentLogin @username, @password, @loginResult OUTPUT", _username, _password, loginResultParam);

            bool isLogin = (bool)loginResultParam.Value;

            return isLogin;
        }

        public async Task<bool> InsertStudentInfo(string _firstName, string _middleName, string _lastName, string _location, string _emailAdd, string _phoneNumber, string _studentBlock, string _studentUsername, string _studentPassword, string _studentYear)
        {
            try
            {
                var firstName = new SqlParameter("@firstName", SqlDbType.VarChar) { Value = _firstName };
                var middleName = new SqlParameter("@middleName", SqlDbType.VarChar) { Value = _middleName };
                var lastName = new SqlParameter("@lastName", SqlDbType.VarChar) { Value = _lastName };
                var location = new SqlParameter("@location", SqlDbType.VarChar) { Value = _location };
                var emailAdd = new SqlParameter("@emailAddress", SqlDbType.VarChar) { Value = _emailAdd };
                var phoneNumber = new SqlParameter("@phoneNumber", SqlDbType.VarChar) { Value = _phoneNumber };
                var studentBlock = new SqlParameter("@studentBlock", SqlDbType.VarChar) { Value = _studentBlock };
                var studentUsername = new SqlParameter("@studentUsername", SqlDbType.VarChar) { Value = _studentUsername };
                var studentPassword = new SqlParameter("@studentPassword", SqlDbType.VarChar) { Value = _studentPassword };
                var studentYear = new SqlParameter("@studentYear", SqlDbType.VarChar) { Value = _studentYear };
                var registrationResultParam = new SqlParameter("@usernameExist", SqlDbType.Bit) { Direction = ParameterDirection.Output };

                await _dbContext.Database.ExecuteSqlCommandAsync("EXEC pr_StudentRegister @firstName, @middleName, @lastName, @location, @emailAddress, @phoneNumber, @studentBlock, @studentUsername, @studentPassword, @studentYear, @usernameExist OUTPUT", firstName, middleName, lastName, location, emailAdd, phoneNumber, studentBlock, studentUsername, studentPassword, studentYear, registrationResultParam);


                bool registrationResult = (bool)registrationResultParam.Value;

                return registrationResult;

            }
            catch (System.Exception)
            {
                return false;
            }
        }

        //show student list
        public List<student_info> showStudentList(string yr_lvl, string block)
        {
            _dbContext.Configuration.ProxyCreationEnabled = false;
            if (yr_lvl == "" && block == "")
            {
                var list = _dbContext.student_info.ToList();
                return list;
            }
            else
            {
                var list = _dbContext.student_info.Where(x => x.year_lvl == yr_lvl && x.student_block == block).ToList();
                return list;
            }

        }

        //update student info
        public async Task<bool> UpdateStudentInfo(student_info info)
        {
            try
            {
                var entity = _dbContext.student_info.Where(x => x.id == info.id).FirstOrDefault();

                entity.first_name = info.first_name;
                entity.middle_name = info.middle_name;
                entity.last_name = info.last_name;
                entity.location = info.location;
                entity.email_address = info.email_address;
                entity.phone_number = info.phone_number;
                entity.student_block = info.student_block;
                entity.stud_username = info.stud_username;
                entity.year_lvl = info.year_lvl;

                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }

        //add a subject to student
        public async Task<bool> AddSubjectToStudent(tbl_student_subject ss)
        {
            try
            {
                var check = _dbContext.tbl_student_subject.Where(x => x.student_id == ss.student_id && x.subject_id == ss.subject_id).FirstOrDefault();
                if (check == null)
                {
                    _dbContext.tbl_student_subject.Add(ss);
                    await _dbContext.SaveChangesAsync();

                    return true;
                }
                else
                {
                    return false;
                }
                
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public List<student_subject> ShowStudentSubjectList(int studId)
        {
            _dbContext.Configuration.ProxyCreationEnabled = false;
            var list = _dbContext.tbl_student_subject.Where(x => x.student_id == studId).Select(x => x.student_subject).ToList();

            return list;
        }

        public async Task<bool> RemoveEnrollSubject(int studId, int subjId)
        {
            try
            {
                var entity = _dbContext.tbl_student_subject.Where(x => x.subject_id == subjId && x.student_id == studId).FirstOrDefault();
                var entity1 = _dbContext.tbl_student_grade.Where(x => x.subject_id == subjId && x.student_id == studId).FirstOrDefault();

                if (entity != null)
                {
                    _dbContext.tbl_student_grade.Remove(entity1);
                    _dbContext.tbl_student_subject.Remove(entity);
                    await _dbContext.SaveChangesAsync();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (System.Exception)
            {

                return false;
            }

        }

    }
}