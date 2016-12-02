using HS.Identity.Store;
using Microsoft.AspNetCore.Identity;

namespace HS.Identity
{
    public static class IdentityExtentations
    {
        public static IdentityBuilder AddHsIdentity(this IdentityBuilder builder)
        {
            builder.AddRoleStore<RoleStore>();
            builder.AddUserStore<UserStore>();
            return builder;
        }
    }
}
