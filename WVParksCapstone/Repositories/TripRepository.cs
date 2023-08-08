using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WVParksCapstone.Models;
using WVParksCapstone.Utils;

namespace WVParksCapstone.Repositories
{
    public class TripRepository : ITripRepository
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
                          SELECT t.Id, t.UserId, t.TripName, t.ParkId, t.StayId, t.TrailId, t.HistoricalSiteId, t.ActivityId, t.WaterfallId,
                           u.Email, u.Username, u.UserPhoto, u.IsAdmin, u.Bio, u.DateCreated,
                           p.Name AS ParkName, p.Address, p.City, p.State, p.Zipcode, p.ImageUrl AS ParkImage, p.RegionId,
                           r.Name AS RegionName,
                           s.Name AS StayName, s.NumberOfSites, s.Description AS StayDescription, s.ImageUrl AS StayImage, s.ParkId AS StayParkId, s.StayTypeId,
                           tl.Name AS TrailName, tl.ParkId AS TrailParkId, tl.DifficultyId, tl.ImageUrl AS TrailImage, tl.Distance, tl.Description as TrailDescription,
                           h.Name AS HistoricalSiteName, h.ParkId AS HistoricalSiteParkId, h.ImageUrl AS HistoricalSiteImage, h.Description AS HistoricalSiteDescription,
                           a.Name AS ActivityName, a.ParkId AS ActivityParkId, a.ImageUrl AS ActivityImage, a.Description AS ActivityDescription, a.ActivityTypeId,
                           w.Name AS WaterfallName, w.Description AS WaterfallDescription, w.RegionId, w.ImageUrl AS WaterfallImage
                            FROM Trip t
                            LEFT JOIN [User] u ON t.UserId = u.Id
                            LEFT JOIN Park p ON t.ParkId = p.Id
                            LEFT JOIN Region r ON p.RegionId = r.Id
                            LEFT JOIN Stay s ON t.StayId = s.Id
                            LEFT JOIN Trail tl ON t.TrailId = tl.Id
                            LEFT JOIN HistoricalSite h ON t.HistoricalSiteId = h.Id
                            LEFT JOIN Activity a ON t.ActivityId = a.Id
                            LEFT JOIN Waterfall w ON t.WaterfallId = w.Id;";

                    var reader = cmd.ExecuteReader();

                    var trip = new List<Trip>();
                    while (reader.Read())
                    {
                        trip.Add(new Trip()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            TripName = DbUtils.GetString(reader, "TripName"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StayId = DbUtils.GetInt(reader, "StayId"),
                            TrailId = DbUtils.GetInt(reader, "TrailId"),
                            HistoricalSiteId = DbUtils.GetInt(reader, "HistoricalSiteId"),
                            ActivityId = DbUtils.GetInt(reader, "ActivityId"),
                            WaterfallId = DbUtils.GetInt(reader, "WaterfallId"),
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
                                Address = DbUtils.GetString(reader, "Address"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Zipcode = DbUtils.GetString(reader, "Zipcode"),
                                ImageUrl = DbUtils.GetString(reader, "ParkImage"),
                                RegionId = DbUtils.GetInt(reader, "RegionId"),
                            },
                            Stay = new Stay()
                            {
                                Id = DbUtils.GetInt(reader, "StayId"),
                                Name = DbUtils.GetString(reader, "StayName"),
                                NumberOfSites = DbUtils.GetNullableInt(reader, "NumberOfSites"),
                                Description = DbUtils.GetString(reader, "StayDescription"),
                                ImageUrl = DbUtils.GetString(reader, "StayImage"),
                                ParkId = DbUtils.GetInt(reader, "StayParkId"),
                                StayTypeId = DbUtils.GetInt(reader, "StayTypeId"),
                            },
                            Trail = new Trail()
                            {
                                Id = DbUtils.GetInt(reader, "TrailId"),
                                Name = DbUtils.GetString(reader, "TrailName"),
                                ParkId = DbUtils.GetInt(reader, "TrailParkId"),
                                DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                                ImageUrl = DbUtils.GetString(reader, "TrailImage"),
                                Distance = DbUtils.GetNullableInt(reader, "Distance"),
                                Description = DbUtils.GetString(reader, "TrailDescription"),
                            },
                            HistoricalSite = new HistoricalSite()
                            {
                                Id = DbUtils.GetInt(reader, "HistoricalSiteId"),
                                Name = DbUtils.GetString(reader, "HistoricalSiteName"),
                                ParkId = DbUtils.GetInt(reader, "ParkId"),
                                ImageUrl = DbUtils.GetString(reader, "HistoricalSiteImage"),
                                Description = DbUtils.GetString(reader, "HistoricalSiteDescription"),
                            },
                            Activity = new Activity()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityId"),
                                Name = DbUtils.GetString(reader, "ActivityName"),
                                ParkId = DbUtils.GetInt(reader, "ActivityParkId"),
                                ImageUrl = DbUtils.GetString(reader, "ActivityImage"),
                                Description = DbUtils.GetString(reader, "ActivityDescription"),
                                ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            },
                            Waterfall = new Waterfall()
                            {
                                Id = DbUtils.GetInt(reader, "WaterfallId"),
                                Name = DbUtils.GetString(reader, "WaterfallName"),
                                Description = DbUtils.GetString(reader, "WaterfallDescription"),
                                RegionId = DbUtils.GetInt(reader, "RegionId"),
                                ImageUrl = DbUtils.GetString(reader, "WaterfallImage"),
                            }

                        });
                    }

                    reader.Close();

                    return trip;
                }
            }
        }

        public Trip GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT t.Id, t.UserId, t.TripName, t.ParkId, t.StayId, t.TrailId, t.HistoricalSiteId, t.ActivityId, t.WaterfallId,
                           u.Email, u.Username, u.UserPhoto, u.IsAdmin, u.Bio, u.DateCreated,
                           p.Name AS ParkName, p.Address, p.City, p.State, p.Zipcode, p.ImageUrl AS ParkImage, p.RegionId,
                           r.Name AS RegionName,
                           s.Name AS StayName, s.NumberOfSites, s.Description AS StayDescription, s.ImageUrl AS StayImage, s.ParkId AS StayParkId, s.StayTypeId,
                           tl.Name AS TrailName, tl.ParkId AS TrailParkId, tl.DifficultyId, tl.ImageUrl AS TrailImage, tl.Distance, tl.Description as TrailDescription,
                           h.Name AS HistoricalSiteName, h.ParkId AS HistoricalSiteParkId, h.ImageUrl AS HistoricalSiteImage, h.Description AS HistoricalSiteDescription,
                           a.Name AS ActivityName, a.ParkId AS ActivityParkId, a.ImageUrl AS ActivityImage, a.Description AS ActivityDescription, a.ActivityTypeId,
                           w.Name AS WaterfallName, w.Description AS WaterfallDescription, w.RegionId, w.ImageUrl AS WaterfallImage
                            FROM Trip t
                            LEFT JOIN [User] u ON t.UserId = u.Id
                            LEFT JOIN Park p ON t.ParkId = p.Id
                            LEFT JOIN Region r ON p.RegionId = r.Id
                            LEFT JOIN Stay s ON t.StayId = s.Id
                            LEFT JOIN Trail tl ON t.TrailId = tl.Id
                            LEFT JOIN HistoricalSite h ON t.HistoricalSiteId = h.Id
                            LEFT JOIN Activity a ON t.ActivityId = a.Id
                            LEFT JOIN Waterfall w ON t.WaterfallId = w.Id
                           WHERE t.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Trip trip = null;
                    if (reader.Read())
                    {
                        trip = new Trip()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            TripName = DbUtils.GetString(reader, "TripName"),
                            ParkId = DbUtils.GetInt(reader, "ParkId"),
                            StayId = DbUtils.GetInt(reader, "StayId"),
                            TrailId = DbUtils.GetInt(reader, "TrailId"),
                            HistoricalSiteId = DbUtils.GetInt(reader, "HistoricalSiteId"),
                            ActivityId = DbUtils.GetInt(reader, "ActivityId"),
                            WaterfallId = DbUtils.GetInt(reader, "WaterfallId"),
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
                                Address = DbUtils.GetString(reader, "Address"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Zipcode = DbUtils.GetString(reader, "Zipcode"),
                                ImageUrl = DbUtils.GetString(reader, "ParkImage"),
                                RegionId = DbUtils.GetInt(reader, "RegionId"),
                            },
                            Stay = new Stay()
                            {
                                Id = DbUtils.GetInt(reader, "StayId"),
                                Name = DbUtils.GetString(reader, "StayName"),
                                NumberOfSites = DbUtils.GetNullableInt(reader, "NumberOfSites"),
                                Description = DbUtils.GetString(reader, "StayDescription"),
                                ImageUrl = DbUtils.GetString(reader, "StayImage"),
                                ParkId = DbUtils.GetInt(reader, "StayParkId"),
                                StayTypeId = DbUtils.GetInt(reader, "StayTypeId"),
                            },
                            Trail = new Trail()
                            {
                                Id = DbUtils.GetInt(reader, "TrailId"),
                                Name = DbUtils.GetString(reader, "TrailName"),
                                ParkId = DbUtils.GetInt(reader, "TrailParkId"),
                                DifficultyId = DbUtils.GetNullableInt(reader, "DifficultyId"),
                                ImageUrl = DbUtils.GetString(reader, "TrailImage"),
                                Distance = DbUtils.GetNullableInt(reader, "Distance"),
                                Description = DbUtils.GetString(reader, "TrailDescription"),
                            },
                            HistoricalSite = new HistoricalSite()
                            {
                                Id = DbUtils.GetInt(reader, "HistoricalSiteId"),
                                Name = DbUtils.GetString(reader, "HistoricalSiteName"),
                                ParkId = DbUtils.GetInt(reader, "ParkId"),
                                ImageUrl = DbUtils.GetString(reader, "HistoricalSiteImage"),
                                Description = DbUtils.GetString(reader, "HistoricalSiteDescription"),
                            },
                            Activity = new Activity()
                            {
                                Id = DbUtils.GetInt(reader, "ActivityId"),
                                Name = DbUtils.GetString(reader, "ActivityName"),
                                ParkId = DbUtils.GetInt(reader, "ActivityParkId"),
                                ImageUrl = DbUtils.GetString(reader, "ActivityImage"),
                                Description = DbUtils.GetString(reader, "ActivityDescription"),
                                ActivityTypeId = DbUtils.GetInt(reader, "ActivityTypeId"),
                            },
                            Waterfall = new Waterfall()
                            {
                                Id = DbUtils.GetInt(reader, "WaterfallId"),
                                Name = DbUtils.GetString(reader, "WaterfallName"),
                                Description = DbUtils.GetString(reader, "WaterfallDescription"),
                                RegionId = DbUtils.GetInt(reader, "RegionId"),
                                ImageUrl = DbUtils.GetString(reader, "WaterfallImage"),
                            }
                        };
                    }

                    reader.Close();

                    return trip;
                }
            }
        }

        public void Add(Trip trip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Trip (UserId, TripName, ParkId, StayId, TrailId, HistoricalSiteId, ActivityId, WaterfallId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @TripName, @ParkId, @StayId, @TrailId, @HistoricalSiteId, @ActivityId, @WaterfallId)";

                    DbUtils.AddParameter(cmd, "@UserId", trip.UserId);
                    DbUtils.AddParameter(cmd, "@TripName", trip.TripName);
                    DbUtils.AddParameter(cmd, "@ParkId", trip.ParkId);
                    DbUtils.AddParameter(cmd, "@StayId", trip.StayId);
                    DbUtils.AddParameter(cmd, "@TrailId", trip.TrailId);
                    DbUtils.AddParameter(cmd, "@HistoricalSiteId", trip.HistoricalSiteId);
                    DbUtils.AddParameter(cmd, "@ActivityId", trip.ActivityId);
                    DbUtils.AddParameter(cmd, "@WaterfallId", trip.WaterfallId);

                    trip.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Trip trip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Trip
                           SET UserId = @UserId,
                                TripName = @TripName,
                                ParkId = @ParkId,
                                StayId = @StayId,
                                TrailId = @TrailId,
                                HistoricalSiteId = @HistoricalSiteId,
                                ActivityId = @ActivityId,
                                WaterfallId = @WaterfallId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserId", trip.UserId);
                    DbUtils.AddParameter(cmd, "@TripName", trip.TripName);
                    DbUtils.AddParameter(cmd, "@ParkId", trip.ParkId);
                    DbUtils.AddParameter(cmd, "@StayId", trip.StayId);
                    DbUtils.AddParameter(cmd, "@TrailId", trip.TrailId);
                    DbUtils.AddParameter(cmd, "@HistoricalSiteId", trip.HistoricalSiteId);
                    DbUtils.AddParameter(cmd, "@ActivityId", trip.ActivityId);
                    DbUtils.AddParameter(cmd, "@WaterfallId", trip.WaterfallId);
                    DbUtils.AddParameter(cmd, "@Id", trip.Id);

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
                    cmd.CommandText = "DELETE FROM Trip WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}