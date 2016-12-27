using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace HS.Identity
{
    //public class HsPasswordValidator : IPasswordValidator<User>
    //{
    //    public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user, string password)
    //    {
    //        //TODO 需要完成对现有db的处理
    //        return Task.FromResult<IdentityResult>(IdentityResult.Success);
    //    }
    //}

    public class HsPasswordHash : IPasswordHasher<User>
    {
        public string HashPassword(User user, string password)
        {
            return password;
        }

        public PasswordVerificationResult VerifyHashedPassword(User user, string hashedPassword, string providedPassword)
        {
          
            return PasswordVerificationResult.Success;

        }
    }
}
