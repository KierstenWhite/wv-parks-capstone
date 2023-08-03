using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class TripRepository
    {
        private readonly string _connectionString;
        public TripRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Trip> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, UserId, TripName, ParkId, StayId, TrailId, HistoricalSiteId, ActivityId, WaterfallId
                            FROM Trip";

                    var reader = cmd.ExecuteReader();

                    var trip = new List<Trip>();
                    while (reader.Read())
                    {
                        trip.Add(new Trip()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Username = DbUtils.GetString(reader, "Username"),
                            UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
                            IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        });
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Email, Username, UserPhoto, IsAdmin, Bio, DateCreated
                            FROM [User]
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Username = DbUtils.GetString(reader, "Username"),
                            UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
                            IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        //public User GetByEmail(string email)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                 SELECT Id, Email, Username, UserPhoto, IsAdmin, Bio, DateCreated
        //                  FROM [User]
        //                 WHERE Email = @email";

        //            DbUtils.AddParameter(cmd, "@email", email);

        //            User user = null;

        //            var reader = cmd.ExecuteReader();
        //            if (reader.Read())
        //            {
        //                user = new User()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    Email = DbUtils.GetString(reader, "Email"),
        //                    Username = DbUtils.GetString(reader, "Username"),
        //                    UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
        //                    IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
        //                    Bio = DbUtils.GetString(reader, "Bio"),
        //                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
        //                };
        //            }
        //            reader.Close();

        //            return user;
        //        }
        //    }
        //}

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (Email, Username, UserPhoto, IsAdmin, Bio, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@Email, @Username, @UserPhoto, @IsAdmin, @Bio, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Username", user.Username);
                    DbUtils.AddParameter(cmd, "@UserPhoto", user.UserPhoto);
                    DbUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET Email = @Email,
                               Username = @Username,
                               UserPhoto = @UserPhoto,
                               IsAdmin = @IsAdmin,
                               Bio = @Bio,
                               DateCreated = @DateCreated
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Username", user.Username);
                    DbUtils.AddParameter(cmd, "@UserPhoto", user.UserPhoto);
                    DbUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}