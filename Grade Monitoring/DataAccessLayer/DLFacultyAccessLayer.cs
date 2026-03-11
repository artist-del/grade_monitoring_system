using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Grade_Monitoring.Models;
using System.Threading.Tasks;
using Grade_Monitoring.BusinessLayer;

namespace Grade_Monitoring.DataAccessLayer
{
    public class DLFacultyAccessLayer: IFacultyBusinessLayer
    {
        private grade_monitoringEntities _dbContext;
        public DLFacultyAccessLayer()
        {
            _dbContext = new grade_monitoringEntities();
        }

        public int Login(string username, string password)
        {
            var entity = _dbContext.faculty_table.Where(x => x.faculty_username == username && x.faculty_password == password).FirstOrDefault();

            if(entity != null)
            {
                return entity.id;
            }
            else
            {
                return 0;
            }
            
            
        }

        public async Task<bool> Register(faculty_table ft)
        {
            try
            {
                var entity = _dbContext.faculty_table.Where(x => x.faculty_username.Equals(ft.faculty_username)).FirstOrDefault();
                if(entity == null)
                {
                    _dbContext.faculty_table.Add(ft);
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

        public async Task<bool> InsertYearBlock(student_block sb)
        {
            try
            {
                _dbContext.student_block.Add(sb);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public List<student_block> ListOfBlocks()
        {
            var list = _dbContext.student_block.ToList();
            return list;
        }

        public async Task<bool> RemoveStudent(int id)
        {
            try
            {
                var entity = _dbContext.student_info.Where(x => x.id == id).SingleOrDefault();

                _dbContext.student_info.Remove(entity);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

    }
}