using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class StayRepository : IStayRepository
    {
        private readonly string _connectionString;
        public StayRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Stay> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT s.Id AS StayId, s.Name, s.NumberOfSites, s.Description, s.ImageUrl, s.ParkId, s.StayTypeId,
                            p.Name AS ParkName,
                            st.Type AS StayTypeName
                            FROM Stay s
                            LEFT JOIN Park p ON s.ParkId = p.id
                            LEFT JOIN StayType st ON s.StayTypeId = st.id;";

                    var reader = cmd.ExecuteReader();

                    var stay = new List<Stay>();
                    while (reader.Read())
                    {
                        stay.Add(new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "StayId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            NumberOfSites = DbUtils.GetNullableInt(reader, "NumberOfSites"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StayTypeId = DbUtils.GetInt(reader, "StayTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            StayType = new StayType()
                            {
                                Id = DbUtils.GetInt(reader, "StayTypeId"),
                                Type = DbUtils.GetString(reader, "StayTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return stay;
                }
            }
        }

        public Stay GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT s.Id AS StayId, s.Name, s.NumberOfSites, s.Description, s.ImageUrl, s.ParkId, s.StayTypeId,
                            p.Name AS ParkName,
                            st.Type AS StayTypeName
                            FROM Stay s
                            LEFT JOIN Park p ON s.ParkId = p.id
                            LEFT JOIN StayType st ON s.StayTypeId = st.id
                           WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Stay stay = null;
                    if (reader.Read())
                    {
                        stay = new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "StayId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            NumberOfSites = DbUtils.GetNullableInt(reader, "NumberOfSites"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StayTypeId = DbUtils.GetInt(reader, "StayTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            StayType = new StayType()
                            {
                                Id = DbUtils.GetInt(reader, "StayTypeId"),
                                Type = DbUtils.GetString(reader, "StayTypeName"),
                            }
                        };
                    }

                    reader.Close();

                    return stay;
                }
            }
        }
    }
}