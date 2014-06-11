using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TryAngular.Models;

namespace TryAngular.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult Save(IList<CartVM> data)
        {
            foreach (var item in data)
            {
                CartItem cart = new CartItem();
                AutoMapper.Mapper.DynamicMap<CartVM, CartItem>(item, cart);
                if (item.Id == 0)
                    db.CartItems.Add(cart);
                if (item.IsDelete)
                    db.CartItems.Remove(cart);
            }
            db.SaveChanges();
            return Json(data);
        }

        public ActionResult List()
        {
            var data = db.CartItems.ToList();
            return Json(data);
        }

        public ActionResult ListName()
        {
            var data = db.CartItems.Select(c => c.Name).Distinct().ToList();
            return Json(data);
        }
    }
}