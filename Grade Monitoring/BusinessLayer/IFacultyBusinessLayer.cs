using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.BusinessLayer
{
    public interface IFacultyBusinessLayer
    {
        int Login(string username, string password);

        Task<bool> Register(faculty_table ft);

        List<student_block> ListOfBlocks();

        Task<bool> InsertYearBlock(student_block sb);

        Task<bool> RemoveStudent(int id);
        
        
    }
}
