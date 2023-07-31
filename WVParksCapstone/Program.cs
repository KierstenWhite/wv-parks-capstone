using Microsoft.AspNetCore.Authentication.Cookies;
using WVParksCapstone.Models;
using WVParksCapstone.Repositories;


namespace WVParksCapstone
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IStarTypeRepository, StarTypeRepository>();
            builder.Services.AddTransient<IStayTypeRepository, StayTypeRepository>();
            builder.Services.AddTransient<ITrailDifficultyRepository, TrailDifficultyRepository>();
            builder.Services.AddTransient<IActivityTypeRepository, ActivityTypeRepository>();
            builder.Services.AddTransient<IRegionRepository, RegionRepository>();
            builder.Services.AddTransient<IParkRepository, ParkRepository>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WVParksCapstone v1"));
                app.UseDeveloperExceptionPage();
            }

            // Do not block requests while in development
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.MapControllers();

            app.Run();
        }
    }
}