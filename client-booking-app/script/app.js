import { page } from "./component-elements.js";

const allBars = page.navBar.elements.allProgressionBars

console.log(prices);

// Now you can use allBars without errors

allBars[0].addEventListener('click', function() {
    allBars[0].classList.add('current-bar')
})
