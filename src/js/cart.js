let ul = document.querySelector(".cart-inner.hide > ul");
ul.innerHTML = " ";
let buttons = document.querySelectorAll("#add-to-cart");
let removeIcon = document.querySelectorAll("#delete");
let totalAmount = document.querySelector("#total-amount");
totalAmount.innerHTML = "$0";
let subtotalAmount = document.querySelector("#subtotal-amount");
subtotalAmount.innerHTML = "$0";
let currentCardNumber = document.querySelector("#items-in-cart");
currentCardNumber.innerHTML = "You have 0 item in your cart";

class Cart {
  constructor() {
    this.cartCourses = [];
    this.cartItemCount = 0;
    this.totalPreTax = 0;
  }

  addCourse(courseId) {
    let targetedCourse = courses.find((course) => course.id === courseId);
    this.cartCourses.push(targetedCourse);
    this.update();
  }

  removeCourse(courseId) {
    this.cartCourses = this.cartCourses.filter(
      (course) => course.id !== courseId
    );

    this.update();
  }

  subtotal() {
    let price = 0;

    for (let course of this.cartCourses) {
      price += course.price;
    }
    this.totalPreTax = price;
    this.update();
    return this.totalPreTax.toFixed(2);
  }

  total() {
    this.update();
    return (this.totalPreTax * 0.13 + this.totalPreTax).toFixed(2);
  }

  update() {
    ul.innerHTML = "";
    for (let course of this.cartCourses) {
      ul.innerHTML += course.createCourse();
    }
  }
}

let currentCart = new Cart();

for (let button of buttons) {
  button.onclick = function (event) {
    currentCart.addCourse(
      event.target.closest("li").getAttribute("data-course-id")
    );

    subtotalAmount.innerHTML = `$${currentCart.subtotal()}`;
    totalAmount.innerHTML = `$${currentCart.total()}`;
    currentCardNumber.innerHTML = `You have ${currentCart.cartCourses.length} items in your cart`;
  };
}

ul.onclick = function (event) {
  let target = event.target;
  let courseId = target.closest("li").getAttribute("data-course-id");

  if (target.className === "far fa-times-circle") {
    currentCart.removeCourse(courseId);
    subtotalAmount.innerHTML = `$${currentCart.subtotal()}`;
    totalAmount.innerHTML = `$${currentCart.total()}`;
    currentCardNumber.innerHTML = `You have ${currentCart.cartCourses.length} items in your cart`;
  }
};
