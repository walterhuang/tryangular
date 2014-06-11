using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TryAngular.Startup))]
namespace TryAngular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
