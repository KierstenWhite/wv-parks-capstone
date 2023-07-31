using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class TrailDifficultyRepository : ITrailDifficultyRepository
    {
        private readonly string _connectionString;
        public TrailDifficultyRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<TrailDifficulty> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, [Name]
                            FROM TrailDifficulty";

                    var reader = cmd.ExecuteReader();

                    var trailDifficulty = new List<TrailDifficulty>();
                    while (reader.Read())
                    {
                        trailDifficulty.Add(new TrailDifficulty()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return trailDifficulty;
                }
            }
        }

        public TrailDifficulty GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT Id, [Name]
                            FROM TrailDifficulty
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    TrailDifficulty trailDifficulty = null;
                    if (reader.Read())
                    {
                        trailDifficulty = new TrailDifficulty()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }

                    reader.Close();

                    return trailDifficulty;
                }
            }
        }
    }
}