using Microsoft.AspNetCore.Identity;

namespace HS.Identity
{
   
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