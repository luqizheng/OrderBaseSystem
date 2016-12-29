using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Ornament.Stores;
using Ornament.Uow;

namespace HS.Identity.Store
{
    public class RoleStore : DbConnectionStore<Role, int>, IRoleStore<Role>
    {
        public RoleStore(DbUow context) : base(context)
        {
        }

        public override IQueryable<Role> Entities { get; }


        public Task<IdentityResult> CreateAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> DeleteAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleIdAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRoleNameAsync(Role role, string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedRoleNameAsync(Role role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedRoleNameAsync(Role role, string normalizedName,
            CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Role> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Role> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public override void Update(Role t)
        {
            throw new NotImplementedException();
        }

        public override void Add(Role t)
        {
            throw new NotImplementedException();
        }

        public override void Delete(Role t)
        {
            throw new NotImplementedException();
        }

        public override Role Get(int id)
        {
            throw new NotImplementedException();
        }
    }
}