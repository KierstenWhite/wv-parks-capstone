//using System;
//using System.Collections.Generic;
//using Microsoft.Data.SqlClient;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Hosting;
//using WVParksCapstone.Models;
//using WVParksCapstone.Utils;

//namespace WVParksCapstone.Repositories
//{
//    public class TripRepository
//    {
//        private readonly string _connectionString;
//        public TripRepository(IConfiguration configuration)
//        {
//            _connectionString = configuration.GetConnectionString("DefaultConnection");
//        }

//        private SqlConnection Connection
//        {
//            get { return new SqlConnection(_connectionString); }
//        }

//        public List<Trip> GetAll()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                          SELECT t.Id, t.UserId, t.TripName, t.ParkId, t.StayId, t.TrailId, t.HistoricalSiteId, t.ActivityId, t.WaterfallId,
//                           u.Email, u.Username, u.UserPhoto, u.IsAdmin, u.Bio, u.DateCreated,
//                           p.Name AS ParkName, p.Address, p.City, p.State, p.Zipcode, p.ImageUrl AS ParkImage, p.RegionId,
//                           r.Name AS RegionName,
//                           s.Name AS StayName, s.NumberOfSites, s.Description AS StayDescription, s.ImageUrl AS StayImage, s.ParkId AS StayParkId, s.StayTypeId,
//                           tl.Name AS TrailName, tl.ParkId AS TrailParkId, tl.DifficultyId, tl.ImageUrl AS TrailImage, tl.Distance, tl.Description as TrailDescription,
//                           h.Name AS HistoricalSiteName, h.ParkId AS HistoricalSiteParkId, h.ImageUrl AS HistoricalSiteImage, h.Description AS HistoricalSiteDescription,
//                           a.Name AS ActivityName, a.ParkId AS ActivityParkId, a.ImageUrl AS ActivityImage, a.Description AS ActivityDescription, a.ActivityTypeId,
//                           w.Name AS WaterfallName, w.Description AS WaterfallDescription, w.RegionId, w.ImageUrl AS WaterfallImage
//                            FROM Trip t
//                            LEFT JOIN [User] u ON t.UserId = u.Id
//                            LEFT JOIN Park p ON t.ParkId = p.Id
//                            LEFT JOIN Region r ON p.RegionId = r.Id
//                            LEFT JOIN Stay s ON t.StayId = s.Id
//                            LEFT JOIN Trail tl ON t.TrailId = tl.Id
//                            LEFT JOIN HistoricalSite h ON t.HistoricalSiteId = h.Id
//                            LEFT JOIN Activity a ON t.ActivityId = a.Id
//                            LEFT JOIN Waterfall w ON t.WaterfallId = w.Id;";

//                    var reader = cmd.ExecuteReader();

//                    var trip = new List<Trip>();
//                    while (reader.Read())
//                    {
//                        trip.Add(new Trip()
//                        {
//                            Id = DbUtils.GetInt(reader, "Id"),
//                            Email = DbUtils.GetString(reader, "Email"),
//                            Username = DbUtils.GetString(reader, "Username"),
//                            UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
//                            IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
//                            Bio = DbUtils.GetString(reader, "Bio"),
//                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
//                        });
//                    }

//                    reader.Close();

//                    return user;
//                }
//            }
//        }

//        public User GetById(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                          SELECT Id, Email, Username, UserPhoto, IsAdmin, Bio, DateCreated
//                            FROM [User]
//                           WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@Id", id);

//                    var reader = cmd.ExecuteReader();

//                    User user = null;
//                    if (reader.Read())
//                    {
//                        user = new User()
//                        {
//                            Id = DbUtils.GetInt(reader, "Id"),
//                            Email = DbUtils.GetString(reader, "Email"),
//                            Username = DbUtils.GetString(reader, "Username"),
//                            UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
//                            IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
//                            Bio = DbUtils.GetString(reader, "Bio"),
//                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
//                        };
//                    }

//                    reader.Close();

//                    return user;
//                }
//            }
//        }

//        //public User GetByEmail(string email)
//        //{
//        //    using (var conn = Connection)
//        //    {
//        //        conn.Open();
//        //        using (var cmd = conn.CreateCommand())
//        //        {
//        //            cmd.CommandText = @"
//        //                 SELECT Id, Email, Username, UserPhoto, IsAdmin, Bio, DateCreated
//        //                  FROM [User]
//        //                 WHERE Email = @email";

//        //            DbUtils.AddParameter(cmd, "@email", email);

//        //            User user = null;

//        //            var reader = cmd.ExecuteReader();
//        //            if (reader.Read())
//        //            {
//        //                user = new User()
//        //                {
//        //                    Id = DbUtils.GetInt(reader, "Id"),
//        //                    Email = DbUtils.GetString(reader, "Email"),
//        //                    Username = DbUtils.GetString(reader, "Username"),
//        //                    UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
//        //                    IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
//        //                    Bio = DbUtils.GetString(reader, "Bio"),
//        //                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
//        //                };
//        //            }
//        //            reader.Close();

//        //            return user;
//        //        }
//        //    }
//        //}

//        public void Add(User user)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        INSERT INTO [User] (Email, Username, UserPhoto, IsAdmin, Bio, DateCreated)
//                        OUTPUT INSERTED.ID
//                        VALUES (@Email, @Username, @UserPhoto, @IsAdmin, @Bio, @DateCreated)";

//                    DbUtils.AddParameter(cmd, "@Email", user.Email);
//                    DbUtils.AddParameter(cmd, "@Username", user.Username);
//                    DbUtils.AddParameter(cmd, "@UserPhoto", user.UserPhoto);
//                    DbUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);
//                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
//                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);

//                    user.Id = (int)cmd.ExecuteScalar();
//                }
//            }
//        }

//        public void Update(User user)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        UPDATE [User]
//                           SET Email = @Email,
//                               Username = @Username,
//                               UserPhoto = @UserPhoto,
//                               IsAdmin = @IsAdmin,
//                               Bio = @Bio,
//                               DateCreated = @DateCreated
//                         WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@Email", user.Email);
//                    DbUtils.AddParameter(cmd, "@Username", user.Username);
//                    DbUtils.AddParameter(cmd, "@UserPhoto", user.UserPhoto);
//                    DbUtils.AddParameter(cmd, "IsAdmin", user.IsAdmin);
//                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
//                    DbUtils.AddParameter(cmd, "@DateCreated", DateTime.Now);
//                    DbUtils.AddParameter(cmd, "@Id", user.Id);

//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }

//        public void Delete(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @Id";
//                    DbUtils.AddParameter(cmd, "@id", id);
//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }
//    }
//}