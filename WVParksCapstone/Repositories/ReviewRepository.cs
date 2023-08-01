using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly string _connectionString;
        public ReviewRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Review> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.UserId, r.ParkId, r.StarsId, r.ReviewTitle, r.ImageUrl, r.DateOfVisit,
                                 p.Name AS ParkName,
                                 u.Email, u.Username, u.UserPhoto, u.IsAdmin, u.Bio, u.DateCreated,
                                 s.Name, s.Value
                                 FROM Review r
                                 LEFT JOIN [User] u on r.UserId = u.id
                                 LEFT JOIN Park p ON r.ParkId = p.id
                                 LEFT JOIN StarType s ON r.StarsId = s.id";

                    var reader = cmd.ExecuteReader();

                    var review = new List<Review>();
                    while (reader.Read())
                    {
                        review.Add(new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StarsId = DbUtils.GetInt(reader, "StarsId"),
                            ReviewTitle = DbUtils.GetString(reader, "ReviewTitle"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            DateOfVisit = DbUtils.GetDateTime(reader, "DateOfVisit"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Username = DbUtils.GetString(reader, "Username"),
                                UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
                                IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            },
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            StarType = new StarType()
                            {
                                Id = DbUtils.GetInt(reader, "StarsId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                value = DbUtils.GetInt(reader, "value"),
                            }
                        });
                    }

                    reader.Close();

                    return review;
                }
            }
        }

        public Review GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT r.Id, r.UserId, r.ParkId, r.StarsId, r.ReviewTitle, r.ImageUrl, r.DateOfVisit,
                                 p.Name AS ParkName,
                                 u.Email, u.Username, u.UserPhoto, u.IsAdmin, u.Bio, u.DateCreated,
                                 s.Name, s.Value
                                 FROM Review r
                                 LEFT JOIN [User] u on r.UserId = u.id
                                 LEFT JOIN Park p ON r.ParkId = p.id
                                 LEFT JOIN StarType s ON r.StarsId = s.id
                           WHERE r.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Review review = null;
                    if (reader.Read())
                    {
                        review = new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StarsId = DbUtils.GetInt(reader, "StarsId"),
                            ReviewTitle = DbUtils.GetString(reader, "ReviewTitle"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            DateOfVisit = DbUtils.GetDateTime(reader, "DateOfVisit"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Username = DbUtils.GetString(reader, "Username"),
                                UserPhoto = DbUtils.GetString(reader, "UserPhoto"),
                                IsAdmin = DbUtils.IsDbNull(reader, "IsAdmin"),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            },
                            Park = new Park()
                            {
                                Id = DbUtils.GetInt(reader, "ParkId"),
                                Name = DbUtils.GetString(reader, "ParkName"),
                            },
                            StarType = new StarType()
                            {
                                Id = DbUtils.GetInt(reader, "StarsId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                value = DbUtils.GetInt(reader, "value"),
                            }
                        };
                    }

                    reader.Close();

                    return review;
                }
            }
        }

        public void Add(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Review (UserId, ParkId, StarsId, ReviewTitle, ImageUrl, DateOfVisit)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ParkId, @StarsId, @ReviewTitle, @ImageUrl, @DateOfVisit)";

                    DbUtils.AddParameter(cmd, "@UserId", review.UserId);
                    DbUtils.AddParameter(cmd, "@ParkId", review.ParkId);
                    DbUtils.AddParameter(cmd, "@StarsId", review.StarsId);
                    DbUtils.AddParameter(cmd, "@ReviewTitle", review.ReviewTitle);
                    DbUtils.AddParameter(cmd, "@ImageUrl", review.ImageUrl);
                    DbUtils.AddParameter(cmd, "@DateOfVisit", review.DateOfVisit);

                    review.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Review
                           SET UserId = @UserId
                               ParkId = @ParkId,
                               StarsId = @StarsId,
                               ReviewTitle = @ReviewTitle,
                               ImageUrl = @ImageUrl,
                               DateOfVisit = @DateOfVisit
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserId", review.UserId);
                    DbUtils.AddParameter(cmd, "@ParkId", review.ParkId);
                    DbUtils.AddParameter(cmd, "@StarsId", review.StarsId);
                    DbUtils.AddParameter(cmd, "ReviewTitle", review.ReviewTitle);
                    DbUtils.AddParameter(cmd, "@ImageUrl", review.ImageUrl);
                    DbUtils.AddParameter(cmd, "@DateOfVisit", review.DateOfVisit);
                    DbUtils.AddParameter(cmd, "@Id", review.Id);

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
                    cmd.CommandText = "DELETE FROM Review WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}