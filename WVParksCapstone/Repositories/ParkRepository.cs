using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class ParkRepository : IParkRepository
    {
        private readonly string _connectionString;
        public ParkRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Park> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT p.Id AS ParkId, p.Name, p.Address, p.City, p.State, p.Zipcode, p.ImageUrl, p.RegionId,

                            r.Name AS RegionName
                            FROM Park p
                            LEFT JOIN Region r ON p.RegionId = r.id";

                    var reader = cmd.ExecuteReader();

                    var park = new List<Park>();
                    while (reader.Read())
                    {
                        park.Add(new Park()
                        {
                            Id = DbUtils.GetInt(reader, "ParkId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Address = DbUtils.GetString(reader, "Address"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            Zipcode = DbUtils.GetString(reader, "Zipcode"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            RegionId = DbUtils.GetInt(reader, "RegionId"),
                            Region = new Region()
                            {
                                Id = DbUtils.GetInt(reader, "RegionId"),
                                Name = DbUtils.GetString(reader, "RegionName"),
                            }
                        });
                    }

                    reader.Close();

                    return park;
                }
            }
        }

        public Park GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT p.Id AS ParkId, p.Name, p.Address, p.City, p.State, p.Zipcode, p.ImageUrl, p.RegionId,

                            r.Name AS RegionName
                            FROM Park p
                            LEFT JOIN Region r ON p.RegionId = r.id
                           WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Park park = null;
                    if (reader.Read())
                    {
                        park = new Park()
                        {
                            Id = DbUtils.GetInt(reader, "ParkId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Address = DbUtils.GetString(reader, "Address"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            Zipcode = DbUtils.GetString(reader, "Zipcode"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            RegionId = DbUtils.GetInt(reader, "RegionId"),
                            Region = new Region()
                            {
                                Id = DbUtils.GetInt(reader, "RegionId"),
                                Name = DbUtils.GetString(reader, "RegionName"),
                            }
                        };
                    }

                    reader.Close();

                    return park;
                }
            }
        }
    }
}