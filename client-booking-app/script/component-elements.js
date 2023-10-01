export const page = {
    navBar: {
        elements: {
            allProgressionBars: document.querySelectorAll('.single-progress-bar'),
            progressStepsText: document.querySelector('.progression-comment-container'),
            pricesText: document.getElementById('prices'),
            bookingPolicyText: document.getElementById('booking-rules'),
            aboutMeText: document.getElementById('about-me')
        }
    },
    homePage: {
        elements : {
            pageContainer: document.querySelector('.homepage-main-container'),
            setBookingBtn: document.querySelector('.homepage-cta-button')
        }
    },
    setServicePage: {
        elements: {
            pageContainer: document.querySelector('.set-styles-main-container'),
            textArea: document.getElementById('comment'),
            submitButton: document.getElementById('submit-btn'),
            fileDownloadBtn: document.getElementById('myFile'),
            formInput: document.getElementById('myForm'),
            selectedBar: document.getElementById('selected-bar'),
            allIndividualServices: document.querySelectorAll('.item'),
            mainPriceInInvoive: document.querySelector('.number-price'),
            divWithIndividualServices: document.getElementById('table-container-for-available-items'),
            invoiceListContainer: document.querySelector('.service-info-div'),
            commentTextInInvoice: document.querySelector('.xc'),
            photoTextInInvoice: document.querySelector('.status')
        }
    },
    pricesPage: {
        elements: {
            pageContainer: document.querySelector('.main-prices-container'),
            leftChevron: document.querySelector('.prices-back-btn')
        }
    },
    bookinPolicyPage: {
        elements: {
            pageContainer: document.querySelector('.mainner'),
            leftChevron: document.getElementById('back-btn-in-policy-page')
        }
    },
    aboutMePage: {
        elements: {
            pageContainer: document.getElementById('about-me-id'),
            leftChevron: document.getElementById('back-btn-in-about-me-page')
        }
    },
    footer: {
        elements: {
            pageContainer: document.getElementById('footer-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn')
        }
    }
}
