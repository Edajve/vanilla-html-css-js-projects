import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";
let selectedServiceIds = []

export function toggleColor(element) {
    const id = element.currentTarget.id;
    const parentElement = document.getElementById(id);
    if (parentElement) parentElement.querySelector('.select-button').classList.toggle('selected')

    pushChoosenServicesToGlobal()
}

function pushChoosenServicesToGlobal() {
    const allPills = getAllPillsId()
    const selectedPills = getIdOfGreenPills(allPills)

    selectedServiceIds = []
    selectedPills.map(element => {
        const elementId = traverseToParent(element)
        selectedServiceIds.push(elementId)
    })

    // update UI based on choosen services from user
    addInvoicePrice(selectedServiceIds)
}

function addInvoicePrice(listOfChoosenIds) {
    let listOfPrices = []

    listOfChoosenIds.forEach(element => {
        const priceElement = fromParentTo("price", element)
        listOfPrices.push(priceElement)
    })

    let sum = 0
    listOfPrices.forEach(element => {
        const htmlPrice = element.innerHTML
        const priceOnly = Number.parseInt(htmlPrice.substring(1).split('.')[0])
        sum += priceOnly
    })

    updateInvoicePriceUI(sum)
}

const traverseToParent = element => element.parentElement.parentElement.parentElement.parentElement

function fromParentTo(columnName, element) {
    switch (columnName) {
        case "name":
            return element.children[0].children[0]
            break;
        case "description":
            return element.children[0].children[1]
            break;
        case "price":
            return element.children[0].children[2]
            break;
        case "selected":
            return element.children[0].children[3]
            break;
        default:
            console.error("invalid index")
            break;
    }
}

function getIdOfGreenPills(arrayOfIds) {
   const selectedPillsID = []
   for (let i = 0; i < arrayOfIds.length; i++) {
        const element = document.getElementById(`${arrayOfIds[i]}`)
        if (element.classList.contains('selected')) selectedPillsID.push(element)
    }
    return selectedPillsID
}

const getAllPillsId = () => {
    const grandParentDiv = page.setServicePage.elements.divWithIndividualServices
    const parentDiv = Array.from(grandParentDiv.children)

    let arrayOfPills = []
    const FIRST_CHILD_INDEX = 0

    parentDiv.forEach(e => {
        const individualId = e.children[FIRST_CHILD_INDEX]
        .children[4]
        .children[FIRST_CHILD_INDEX]
        .children[FIRST_CHILD_INDEX]
        .id
        arrayOfPills.push(individualId)
    })

    return arrayOfPills
}

const updateInvoicePriceUI = amount => page.setServicePage.elements.mainPriceInInvoive.innerHTML = `$${amount}.00`

function addServiceItemToInvoice() {
    //createInvoiceElement()
    //addItemToInvoiceList('TestService', )
    // add service to the 'invoiceListContainer' in pages alonw with the name and the price of the
}

function createInvoiceElement() {
    //create a main div with the class name 'single-invoice' with an id of 'invoice-{incremented number}
        //child div with the class 'invoice-text-div'
            //strong tag with the class 'invoice-name' with the inner text the name of the service
        //child div with the class 'invoice-price-div'
            //p tag with the class name 'invoice-price-text' with the price in the inner text
}

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