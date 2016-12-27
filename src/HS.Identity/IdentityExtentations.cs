using HS.Identity.Store;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace HS.Identity
{
    public static class IdentityExtentations
    {
        public static IdentityBuilder AddHsIdentity(this IdentityBuilder builder)
        {
            builder.AddRoleStore<RoleStore>();
            builder.AddUserStore<UserStore>();
            builder.Services.AddSingleton(typeof(IPasswordHasher<User>),
                typeof(HsPasswordHash));
            //builder.AddPasswordValidator<HsPasswordValidator>();
            //builder.
            return builder;
        }
    }
}
