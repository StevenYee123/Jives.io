module.exports = function(controller){
    controller.resume = {
        basics : {
            name : "John Doe",
            label : "Programmer",
            email : "JohnDoe@gmail.com",
            phone : "(415) 935-3408",
            website : "https://google.com",
            summary : "Summary about me..."
        },
        location : {
            address : "90 50th Ave",
            postalCode : "NY 10011",
            city : "New York",
            countryCode : "US",
            region : "NY"
        },
        profiles : [
            {
                network : "LinkedIn",
                username : "Jives.io",
                url : "https://linkedin.com"
            }
        ],
        work : [
            {
                company : "Team SSS",
                position : "Slave chatbot",
                website : "https://botkit.ai",
                startDate : "2020-10-20",
                endDate : "present",
                summary : "Description...",
                highlights : ["Talking to our wonderful visitors!"]
            }
        ],
        education : [
            {
                institution : "NYU",
                area : "Software Development",
                studyType : "Bachelor",
                startDate : "01-13-2020",
                endDate : "05-08-2020",
                gpa : "4.0",
                courses : ["BUT 101 - Butlery 101"]
            },
        ],
        skills : [
            {
                name : "Full Stack Engineering",
                level : "Professional",
                keywords : ["HTML", "CSS", "Javascript"]
            }
        ],
        languages : [
            {
                langauge : "English",
                fluency : "Native"
            }
        ],
        interests : [
            {
                name : "Humans",
                keywords : ["humans", "people", "person"]
            }
        ]
    }
}