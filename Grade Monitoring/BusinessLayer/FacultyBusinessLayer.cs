using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Grade_Monitoring.Models;

namespace Grade_Monitoring.BusinessLayer
{
    public class FacultyBusinessLayer
    {
        public readonly IFacultyBusinessLayer _iFaculty;
        public FacultyBusinessLayer(IFacultyBusinessLayer iFaculty)
        {
            this._iFaculty = iFaculty;
        }

        public int Login(string username, string password)
        {
            return this._iFaculty.Login(username, password);
        }

        public async Task<bool> Register(faculty_table ft)
        {
            if (ft.first_name != null && ft.middle_name != null && ft.last_name != null && ft.faculty_username != null && ft.faculty_password != null)
            {
                return await this._iFaculty.Register(ft);
            }
            else
            {
                return false;
            }

        }

        public List<student_block> ListOfBlocks()
        {
            return this._iFaculty.ListOfBlocks();
        }

        public async Task<bool> InsertYearBlock(student_block sb)
        {
            return await this._iFaculty.InsertYearBlock(sb);
        }

        public async Task<bool> RemoveStudent(int id)
        {
            return await this._iFaculty.RemoveStudent(id);
        }
    }
}