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
            containerDiv: document.querySelector('.homepage-main-container'),
            setBookingBtn: document.querySelector('.homepage-cta-button')
        }
    },
    setServicePage: {
        elements: {
            container: document.querySelector('.set-styles-main-container'),
            textArea: document.getElementById('comment'),
            browseBtn: document.getElementById('myFile'),
            selectedBar: document.getElementById('selected-bar'),
            allServices: document.querySelectorAll('.item')
        }
    },
    pricesPage: {
        elements: {
            container: document.querySelector('.main-prices-container'),
            leftChevron: document.querySelector('.prices-back-btn')
        }
    },
    bookinPolicyPage: {
        elements: {
            container: document.querySelector('.mainner'),
            leftChevron: document.getElementById('back-btn-in-policy-page')
        }
    },
    aboutMePage: {
        elements: {
            container: document.getElementById('about-me-id'),
            leftChevron: document.getElementById('back-btn-in-about-me-page')
        }
    },
    footer: {
        elements: {
            container: document.getElementById('footer-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn')
        }
    }
}
