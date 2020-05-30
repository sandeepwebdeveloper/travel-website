import '../styles/style.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

let mobileMenu = new MobileMenu();



new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

if (module.hot) {
    module.hot.accept()
}
/*
class Adult extends Person {
    payTaxes() {
        console.log(this.name + " now owes zero taxes.");
    }
}
let john = new Person("John Doe", "Blue");
john.greet();
let jane = new Adult("Jane Smith ", "Green");
//john.greet();
jane.payTaxes(); */

