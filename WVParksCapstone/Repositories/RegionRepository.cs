using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class RegionRepository : IRegionRepository
    {
        private readonly string _connectionString;
        public RegionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Region> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, [Name]
                            FROM Region";

                    var reader = cmd.ExecuteReader();

                    var region = new List<Region>();
                    while (reader.Read())
                    {
                        region.Add(new Region()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return region;
                }
            }
        }

        public Region GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, [Name]
                            FROM Region
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Region region = null;
                    if (reader.Read())
                    {
                        region = new Region()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }

                    reader.Close();

                    return region;
                }
            }
        }
    }
}