using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.Models;
using Grade_Monitoring.BusinessLayer;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity;

namespace Grade_Monitoring.DataAccessLayer
{
    public class DLSubjectAccess: ISubjectBusiness
    {
        private grade_monitoringEntities _dbContext;
        public DLSubjectAccess()
        {
            _dbContext = new grade_monitoringEntities();
        }

        public List<student_subject> SubjectList(string perSem)
        {
            _dbContext.Configuration.ProxyCreationEnabled = false;
            if (perSem == "")
            {
                return _dbContext.student_subject.ToList();
            }
            else
            {
                return  _dbContext.student_subject.Where(x => x.per_sem == perSem).ToList();
            }
        }

        public async Task<bool> InsertUpdateSubject(student_subject item)
        {
            try
            {
                var entity = this._dbContext.student_subject.FirstOrDefault(x => x.id == item.id);

                if (entity != null)
                {
                    entity.subject_code = item.subject_code;
                    entity.subject_name = item.subject_name;
                    entity.year_level = item.year_level;
                    entity.subject_unit = item.subject_unit;
                    entity.per_sem = item.per_sem;
                }
                else
                {
                    _dbContext.student_subject.Add(item);
                }
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }

        public async Task<bool> RemoveSubject(int id)
        {
            try
            {
                var entity = _dbContext.student_subject.Where(x => x.id == id).FirstOrDefault();
                if (entity != null)
                {
                    _dbContext.student_subject.Remove(entity);
                    await _dbContext.SaveChangesAsync();

                    return true;
                }else
                {
                    return false;
                }
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<bool> AddGrade(int studentId, int subjectId, decimal? firstSem, decimal? secondSem, decimal? finalResult)
        {
            try
            {
                var _studentId = new SqlParameter("@studentId", SqlDbType.Int) { Value = studentId };
                var _subjectId = new SqlParameter("@subjectId", SqlDbType.Int) { Value = subjectId };
                var _firstSem = new SqlParameter("@firstSem", SqlDbType.Decimal); _firstSem.Value = (object)firstSem ?? DBNull.Value;
                var _secondSem = new SqlParameter("@secondSem", SqlDbType.Decimal); _secondSem.Value = (object)secondSem ?? DBNull.Value;
                var _finalResult = new SqlParameter("@finalResult", SqlDbType.Decimal); _finalResult.Value = (object)finalResult ?? DBNull.Value;

                await _dbContext.Database.ExecuteSqlCommandAsync("EXEC pr_InsertGrade @studentId, @subjectId, @firstSem, @secondSem, @finalResult", _studentId, _subjectId, _firstSem, _secondSem, _finalResult);

                return true;
            }
            catch (System.Exception)
            {

                return false;
            }
        }

        public IEnumerable<object> ShowStudentGrade(int id)
        {
            var list = _dbContext.tbl_student_grade.Where(x => x.student_id == id).Select(s => new
            {
                subjectCode = s.student_subject.subject_code,
                subjectName = s.student_subject.subject_name,
                firstSem = s.first_sem,
                secondSem = s.second_sem,
                finalResult = s.final_result,
                status = s.final_result == null? "Not Graded" : s.final_result >= 75 ? "Passed" : "Failed"
            }).ToList();

            return list;
        }

        public tbl_student_grade SelectGradeById(int subjId)
        {
            _dbContext.Configuration.ProxyCreationEnabled = false;
            var result = _dbContext.tbl_student_grade.Where(x => x.subject_id == subjId).FirstOrDefault();

            return result;
        }
    }
}