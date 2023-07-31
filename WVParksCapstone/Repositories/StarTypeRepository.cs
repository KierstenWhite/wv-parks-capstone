using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class StarTypeRepository : IStarTypeRepository
    {
        private readonly string _connectionString;
        public StarTypeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<StarType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, [Name], value
                            FROM StarType";

                    var reader = cmd.ExecuteReader();

                    var starType = new List<StarType>();
                    while (reader.Read())
                    {
                        starType.Add(new StarType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            value = DbUtils.GetInt(reader, "value"),
                        });
                    }

                    reader.Close();

                    return starType;
                }
            }
        }

        public StarType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, [Name], value
                            FROM StarType
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    StarType starType = null;
                    if (reader.Read())
                    {
                        starType = new StarType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            value = DbUtils.GetInt(reader, "value"),
                        };
                    }

                    reader.Close();

                    return starType;
                }
            }
        }
    }
}