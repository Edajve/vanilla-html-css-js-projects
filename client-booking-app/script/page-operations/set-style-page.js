import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";

export function toggleColor(element) {
    const id = element.currentTarget.id;
    const parentElement = document.getElementById(id);
    if (parentElement) parentElement.querySelector('.select-button').classList.toggle('selected')
    
    const bars = getAllSelectedBars()
    getIdOfSelectedBars(bars)
}

function getIdOfSelectedBars(arrayOfIds) {
    /*
        you stopped here, for some reason you cant get the id of all selected bars, the 'arrayOfIds'
        coming in is the id of all the 'button' elements that holds the class for highligheted or not.
    */
    const selectedBarsID = []
    for (let i = 0; i < arrayOfIds.length; i++) {
        const element = document.getElementById(`'${arrayOfIds[i]}'`)
        if (element.classList.contains('selected')) {
            selectedBarsID.push(element)
        }
    }
    console.log(selectedBarsID);
}

const getAllSelectedBars = () => {
    const grandParentDiv = page.setServicePage.elements.divWithIndividualServices
    const parentDiv = Array.from(grandParentDiv.children)

    let arrayOfBars = []
    parentDiv.forEach(e => {arrayOfBars.push(e.children[0].children[4].children[0].children[0].id)})
    // console.log(parentDiv[].children[0].children[4].children[0].children[0].id);
    return arrayOfBars
    //updateInvoicePrice(total)
}

const updateInvoicePriceUI = amount => page.setServicePage.elements.mainPriceInInvoive.innerHTML = `$${amount}.00`

const setBookingContainerDiv = page.setServicePage.elements.pageContainer;

export function openPage() {
    setBookingContainerDiv.style.display = ""
    footerComponent.showFooter()
}

export function closePage() {
    setBookingContainerDiv.style.display = 'none'
    footerComponent.closeFooter()
}

export default {
    openPage,
    closePage,
    toggleColor
}