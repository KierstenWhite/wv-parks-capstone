using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class WaterfallRepository : IWaterfallRepository
    {
        private readonly string _connectionString;
        public WaterfallRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Waterfall> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT w.Id AS WaterfallId, w.Name, w.Description, w.RegionId, w.ImageUrl,
                            r.Name AS RegionName
                            FROM Waterfall w
                            LEFT JOIN Region r ON w.RegionId = r.id;";

                    var reader = cmd.ExecuteReader();

                    var waterfall = new List<Waterfall>();
                    while (reader.Read())
                    {
                        waterfall.Add(new Waterfall()
                        {
                            Id = DbUtils.GetInt(reader, "WaterfallId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            RegionId = DbUtils.GetInt(reader, "RegionId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Region = new Region()
                            {
                                Id = DbUtils.GetInt(reader, "RegionId"),
                                Name = DbUtils.GetString(reader, "RegionName"),
                            },
                        });
                    }

                    reader.Close();

                    return waterfall;
                }
            }
        }

        public Waterfall GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT w.Id AS WaterfallId, w.Name, w.Description, w.RegionId, w.ImageUrl,
                            r.Name AS RegionName
                            FROM Waterfall w
                            LEFT JOIN Region r ON w.RegionId = r.id
                           WHERE w.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Waterfall waterfall = null;
                    if (reader.Read())
                    {
                        waterfall = new Waterfall()
                        {
                            Id = DbUtils.GetInt(reader, "WaterfallId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            RegionId = DbUtils.GetInt(reader, "RegionId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Region = new Region()
                            {
                                Id = DbUtils.GetInt(reader, "RegionId"),
                                Name = DbUtils.GetString(reader, "RegionName"),
                            },
                        };
                    }

                    reader.Close();

                    return waterfall;
                }
            }
        }

        public List<Waterfall> GetWaterfallByRegionId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT w.Id AS WaterfallId, w.Name, w.Description, w.RegionId, w.ImageUrl,
                            r.Name AS RegionName
                            FROM Waterfall w
                            LEFT JOIN Region r ON w.RegionId = r.id
                           WHERE w.RegionId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var waterfall = new List<Waterfall>();
                    while (reader.Read())
                    {
                        waterfall.Add(new Waterfall()
                        {
                            Id = DbUtils.GetInt(reader, "WaterfallId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            RegionId = DbUtils.GetInt(reader, "RegionId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Region = new Region()
                            {
                                Id = DbUtils.GetInt(reader, "RegionId"),
                                Name = DbUtils.GetString(reader, "RegionName"),
                            },
                        });
                    }

                    reader.Close();

                    return waterfall;
                }
            }
        }
    }
}