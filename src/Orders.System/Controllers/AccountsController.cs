using System.Collections.Generic;
using HS.Identity;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Order.System.Models.AccountViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AccountsController(UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public object Login([FromBody] LoginViewModel value)
        {
            var appUser = new User
            {
                LoginId = value.User,
                Password = value.Password,
                Name = value.User,
            };
            //_signInManager.SignInAsync(appUser, false);
            var result = _signInManager.PasswordSignInAsync(appUser, appUser.Password, false, false).Result;
            if (result.Succeeded)
                return new
                {
                    success = true
                };
            return new
            {
                success = true,
                message = "正确登录"
            };
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}