using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class HistoricalSiteRepository : IHistoricalSiteRepository
    {
        private readonly string _connectionString;
        public HistoricalSiteRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<HistoricalSite> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT h.Id AS HistoricalSiteId, h.Name, h.ParkId, h.ImageUrl, h.Description, 
                            p.Name AS ParkName
                            FROM HistoricalSite h
                            LEFT JOIN Park p ON h.ParkId = p.id;";

                    var reader = cmd.ExecuteReader();

                    var historicalSite = new List<HistoricalSite>();
                    while (reader.Read())
                    {
                        historicalSite.Add(new HistoricalSite()
                        {
                            Id = DbUtils.GetInt(reader, "HistoricalSiteId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            }
                        });
                    }

                    reader.Close();

                    return historicalSite;
                }
            }
        }

        public HistoricalSite GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT h.Id AS HistoricalSiteId, h.Name, h.ParkId, h.ImageUrl, h.Description, 
                            p.Name AS ParkName
                            FROM HistoricalSite h
                            LEFT JOIN Park p ON h.ParkId = p.id
                           WHERE h.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    HistoricalSite historicalSite = null;
                    if (reader.Read())
                    {
                        historicalSite = new HistoricalSite()
                        {
                            Id = DbUtils.GetInt(reader, "HistoricalSiteId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            }
                        };
                    };

                    reader.Close();

                    return historicalSite;
                }
            }
        }
    }
}