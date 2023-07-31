using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class StayTypeRepository : IStayTypeRepository
    {
        private readonly string _connectionString;
        public StayTypeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<StayType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Type
                            FROM StayType";

                    var reader = cmd.ExecuteReader();

                    var stayType = new List<StayType>();
                    while (reader.Read())
                    {
                        stayType.Add(new StayType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                        });
                    }

                    reader.Close();

                    return stayType;
                }
            }
        }

        public StayType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, Type
                            FROM StayType
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    StayType stayType = null;
                    if (reader.Read())
                    {
                        stayType = new StayType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                        };
                    }

                    reader.Close();

                    return stayType;
                }
            }
        }
    }
}