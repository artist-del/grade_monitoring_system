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
    public class FacultyService
    {
        public int Login(string username, string password)
        {
            return new FacultyBusinessLayer(new DLFacultyAccessLayer()).Login(username, password);
        }

        public async Task<bool> Register(faculty_table ft)
        {
            return await new FacultyBusinessLayer(new DLFacultyAccessLayer()).Register(ft);
        }

        public List<student_block> ListOfBlocks()
        {
            return new FacultyBusinessLayer(new DLFacultyAccessLayer()).ListOfBlocks();
        }

        public async Task<bool> InsertYearBlock(student_block sb)
        {
            return await new FacultyBusinessLayer(new DLFacultyAccessLayer()).InsertYearBlock(sb);
        }

        public async Task<bool> RemoveStudent(int id)
        {
            return await new FacultyBusinessLayer(new DLFacultyAccessLayer()).RemoveStudent(id);
        }
    }
}