using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly string _connectionString;
        public ActivityRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Activity> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT a.Id AS ActivityId, a.Name, a.ParkId, a.ImageUrl, a.Description, a.ActivityTypeId,
                            p.Name AS ParkName,
                            at.Name AS ActivityTypeName
                            FROM Activity a
                            LEFT JOIN Park p ON a.ParkId = p.id
                            LEFT JOIN ActivityType at ON a.ActivityTypeId = at.id;";

                    var reader = cmd.ExecuteReader();

                    var activity = new List<Activity>();
                    while (reader.Read())
                    {
                        activity.Add(new Activity()
                        {
                            Id = DbUtils.GetInt(reader, "ActivityId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            ActivityType = new ActivityType()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityTypeId"),
                                Name = DbUtils.GetString(reader, "ActivityTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return activity;
                }
            }
        }

        public Activity GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT a.Id AS ActivityId, a.Name, a.ParkId, a.ImageUrl, a.Description, a.ActivityTypeId,
                            p.Name AS ParkName,
                            at.Name AS ActivityTypeName
                            FROM Activity a
                            LEFT JOIN Park p ON a.ParkId = p.id
                            LEFT JOIN ActivityType at ON a.ActivityTypeId = at.id
                           WHERE a.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Activity activity = null;
                    if (reader.Read())
                    {
                        activity = new Activity()
                        {
                            Id = DbUtils.GetInt(reader, "ActivityId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            ActivityType = new ActivityType()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityTypeId"),
                                Name = DbUtils.GetString(reader, "ActivityTypeName"),
                            }
                        };
                    }

                    reader.Close();

                    return activity;
                }
            }
        }

        public List<Activity> GetActivityByParkId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT a.Id AS ActivityId, a.Name, a.ParkId, a.ImageUrl, a.Description, a.ActivityTypeId,
                            p.Name AS ParkName,
                            at.Name AS ActivityTypeName
                            FROM Activity a
                            LEFT JOIN Park p ON a.ParkId = p.id
                            LEFT JOIN ActivityType at ON a.ActivityTypeId = at.id
                           WHERE a.ParkId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var activity = new List<Activity>();
                    while (reader.Read())
                    {
                        activity.Add(new Activity()
                        {
                            Id = DbUtils.GetInt(reader, "ActivityId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            ActivityType = new ActivityType()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityTypeId"),
                                Name = DbUtils.GetString(reader, "ActivityTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return activity;
                }
            }
        }

        public List<Activity> GetActivityByActivityTypeId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT a.Id AS ActivityId, a.Name, a.ParkId, a.ImageUrl, a.Description, a.ActivityTypeId,
                            p.Name AS ParkName,
                            at.Name AS ActivityTypeName
                            FROM Activity a
                            LEFT JOIN Park p ON a.ParkId = p.id
                            LEFT JOIN ActivityType at ON a.ActivityTypeId = at.id
                           WHERE a.ActivityTypeId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var activity = new List<Activity>();
                    while (reader.Read())
                    {
                        activity.Add(new Activity()
                        {
                            Id = DbUtils.GetInt(reader, "ActivityId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            ActivityType = new ActivityType()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityTypeId"),
                                Name = DbUtils.GetString(reader, "ActivityTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return activity;
                }
            }
        }
    }
}