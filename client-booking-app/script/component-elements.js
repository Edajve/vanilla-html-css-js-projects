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
            setBookingBtn: document.getElementById('set-booking-btn')
        }
    },
    setServicePage: {
        elements: {
            allSetBtn: document.querySelectorAll('.items'),
            textArea: document.getElementById('comment'),
            browseBtn: document.getElementById('myFile')
        }
    },
    footer: {
        elements: {
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn')
        }
    }
}
