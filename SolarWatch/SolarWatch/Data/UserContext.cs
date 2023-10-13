﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace SolarWatch.Data
{
    public class UsersContext : IdentityUserContext<IdentityUser>
    {
        public UsersContext(DbContextOptions<UsersContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // It would be a good idea to move the connection string to user secrets
            options.UseSqlServer("Server=localhost,1433;Database=SolarWatch;User Id=sa;Password=yourStrong(!)Password;Encrypt=True;TrustServerCertificate=True;");

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}