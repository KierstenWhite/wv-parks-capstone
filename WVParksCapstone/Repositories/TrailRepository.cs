using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class TrailRepository : ITrailRepository
    {
        private readonly string _connectionString;
        public TrailRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Trail> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT t.Id AS TrailId, t.Name, t.ParkId, t.DifficultyId, t.ImageUrl, t.Distance, t.Description,
                            p.Name AS ParkName,
                            td.Name AS TrailDifficultyName
                            FROM Trail t
                            LEFT JOIN Park p ON t.ParkId = p.id
                            LEFT JOIN TrailDifficulty td ON t.DifficultyId = td.id;";

                    var reader = cmd.ExecuteReader();

                    var trail = new List<Trail>();
                    while (reader.Read())
                    {
                        trail.Add(new Trail()
                        {
                            Id = DbUtils.GetInt(reader, "TrailId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Distance = DbUtils.GetNullableInt(reader, "Distance"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            TrailDifficulty = new TrailDifficulty()
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyId"),
                                Name = DbUtils.GetString(reader, "TrailDifficultyName"),
                            }
                        });
                    }

                    reader.Close();

                    return trail;
                }
            }
        }

        public Trail GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT t.Id AS TrailId, t.Name, t.ParkId, t.DifficultyId, t.ImageUrl, t.Distance, t.Description,
                            p.Name AS ParkName,
                            td.Name AS TrailDifficultyName
                            FROM Trail t
                            LEFT JOIN Park p ON t.ParkId = p.id
                            LEFT JOIN TrailDifficulty td ON t.DifficultyId = td.id
                           WHERE t.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Trail trail = null;
                    if (reader.Read())
                    {
                        trail = new Trail()
                        {
                            Id = DbUtils.GetInt(reader, "TrailId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Distance = DbUtils.GetNullableInt(reader, "Distance"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            TrailDifficulty = new TrailDifficulty()
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyId"),
                                Name = DbUtils.GetString(reader, "TrailDifficultyName"),
                            }
                        };
                    }

                    reader.Close();

                    return trail;
                }
            }
        }

        public List<Trail> GetTrailByParkId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT t.Id AS TrailId, t.Name, t.ParkId, t.DifficultyId, t.ImageUrl, t.Distance, t.Description,
                            p.Name AS ParkName,
                            td.Name AS TrailDifficultyName
                            FROM Trail t
                            LEFT JOIN Park p ON t.ParkId = p.id
                            LEFT JOIN TrailDifficulty td ON t.DifficultyId = td.id
                           WHERE t.ParkId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var trail = new List<Trail>();
                    while (reader.Read())
                    {
                        trail.Add(new Trail()
                        {
                            Id = DbUtils.GetInt(reader, "TrailId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Distance = DbUtils.GetNullableInt(reader, "Distance"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            TrailDifficulty = new TrailDifficulty()
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyId"),
                                Name = DbUtils.GetString(reader, "TrailDifficultyName"),
                            }
                        });
                    }

                    reader.Close();

                    return trail;
                }
            }
        }

        public List<Trail> GetTrailByTrailDifficultyId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT t.Id AS TrailId, t.Name, t.ParkId, t.DifficultyId, t.ImageUrl, t.Distance, t.Description,
                            p.Name AS ParkName,
                            td.Name AS TrailDifficultyName
                            FROM Trail t
                            LEFT JOIN Park p ON t.ParkId = p.id
                            LEFT JOIN TrailDifficulty td ON t.DifficultyId = td.id
                           WHERE t.DifficultyId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var trail = new List<Trail>();
                    while (reader.Read())
                    {
                        trail.Add(new Trail()
                        {
                            Id = DbUtils.GetInt(reader, "TrailId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Distance = DbUtils.GetNullableInt(reader, "Distance"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            TrailDifficulty = new TrailDifficulty()
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyId"),
                                Name = DbUtils.GetString(reader, "TrailDifficultyName"),
                            }
                        });
                    }

                    reader.Close();

                    return trail;
                }
            }
        }
    }
}