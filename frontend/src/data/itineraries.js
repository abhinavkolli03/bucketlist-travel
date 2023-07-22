const itinerariesData = [
    {
        "id": 1,
        "image": "portugal.jpg",
        "title": "Pondering Portugal",
        "locations": ["Lisbon, Portugal"],
        "startDate": "2022-12-03",
        "duration": "2 Days",
        "endDate": "2022-12-04",
        "description": "What is Portugal famous for? Wine, for sure; this is where you'll find some of the oldest wine-growing regions in the world. In fact, two of Portugal's wine-growing regions, the Douro Valley and Pico Island in the Azores, are protected as UNESCO World Heritage Sites.",
        "thoughtBubble": "This was an interesting trip to say the least.",
        "days": {
          "day1": {
            "events": [
              {
                "id": "event1",
                "name": "Boca Brunch",
                "keyword": "Breakfast",
                "startTime": "9:00",
                "endTime": "10:00",
                "duration": "1 Hour",
                "description": "This is a popular breakfast spot in the islands specifically known for their fish and chips and soups.",
                "typicalDuration": "1 Hour",
                "image": "portugal.jpg",
              },
              {
                "id": "event2",
                "name": "Lobster Luncheon",
                "keyword": "Lunch",
                "startTime": "12:00",
                "endTime": "13:30",
                "duration": "1.5 Hours",
                "description": "This is a popular lunch spot in the islands specifically known for their lobsters.",
                "typicalDuration": "1 Hour",
                "image": "spain.jpg"
              },
              {
                "id": "event3",
                "name": "Dinner Delight",
                "keyword": "Dinner",
                "startTime": "19:00",
                "endTime": "21:00",
                "duration": "2 Hours",
                "description": "Enjoy a delightful dinner at one of Lisbon's finest restaurants, offering a variety of local dishes and seafood specialties.",
                "typicalDuration": "2 Hours",
                "image": "amazon.jpg"
              },
              {
                "id": "event4",
                "name": "Supper Spicy",
                "keyword": "Dinner",
                "startTime": "22:00",
                "endTime": "23:00",
                "duration": "1 Hour",
                "description": "Enjoy a delightful dinner at one of Lisbon's finest restaurants, offering a variety of local dishes and seafood specialties.",
                "typicalDuration": "1 Hour",
              }
            ]
          },
          "day2": {
            "events": [
              {
                "id": "event1",
                "name": "Morning Coffee",
                "keyword": "Breakfast",
                "startTime": "8:30",
                "endTime": "9:30",
                "duration": "1 Hour",
                "description": "Start your day with a cup of freshly brewed coffee and some pastries from a local café.",
                "typicalDuration": "1 Hour"
              },
              {
                "id": "event2",
                "name": "Exploring Alfama",
                "keyword": "Sightseeing",
                "startTime": "10:00",
                "endTime": "12:30",
                "duration": "2.5 Hours",
                "description": "Discover the historic Alfama district with its narrow streets, ancient buildings, and stunning viewpoints.",
                "typicalDuration": "2 Hours"
              },
              {
                "id": "event3",
                "name": "Seafood Feast",
                "keyword": "Lunch",
                "startTime": "13:00",
                "endTime": "14:30",
                "duration": "1.5 Hours",
                "description": "Treat yourself to a delicious seafood feast at a traditional Portuguese restaurant.",
                "typicalDuration": "1 Hour"
              }
            ]
          },
          "day3": {
            "events": [
              {
                "id": "event1",
                "name": "Port Wine Tasting",
                "keyword": "Wine",
                "startTime": "11:00",
                "endTime": "12:30",
                "duration": "1.5 Hours",
                "description": "Visit a local winery and indulge in a tasting of the famous Port wines of Portugal.",
                "typicalDuration": "1.5 Hours"
              },
              {
                "id": "event2",
                "name": "Riverside Stroll",
                "keyword": "Sightseeing",
                "startTime": "14:00",
                "endTime": "16:00",
                "duration": "2 Hours",
                "description": "Take a leisurely stroll along the scenic riverside and enjoy the beautiful views of the city.",
                "typicalDuration": "2 Hours"
              },
              {
                "id": "event3",
                "name": "Fado Night",
                "keyword": "Entertainment",
                "startTime": "20:00",
                "endTime": "22:00",
                "duration": "2 Hours",
                "description": "Experience the soulful sounds of Fado music at a traditional Fado house.",
                "typicalDuration": "2 Hours"
              }
            ]
          },
          "day4": {
            "events": [
              {
                "id": "event1",
                "name": "Morning Market",
                "keyword": "Shopping",
                "startTime": "9:30",
                "endTime": "11:30",
                "duration": "2 Hours",
                "description": "Visit a local market and explore a variety of fresh produce, handicrafts, and souvenirs.",
                "typicalDuration": "2 Hours"
              },
              {
                "id": "event2",
                "name": "Lunch with a View",
                "keyword": "Lunch",
                "startTime": "13:00",
                "endTime": "14:30",
                "duration": "1.5 Hours",
                "description": "Enjoy a delightful lunch with a view at a rooftop restaurant overlooking the city.",
                "typicalDuration": "1 Hour"
              },
              {
                "id": "event3",
                "name": "Historic Tour",
                "keyword": "Sightseeing",
                "startTime": "15:00",
                "endTime": "17:00",
                "duration": "2 Hours",
                "description": "Take a guided tour of historical landmarks and iconic monuments in the city.",
                "typicalDuration": "2 Hours"
              }
            ]
          },
            "day5": {
                "events": [
                    {
                        "id": "event1",
                        "name": "Boca Brunch",
                        "keyword": "Breakfast",
                        "startTime": "9:00",
                        "endTime": "10:00",
                        "duration": "1 Hour",
                        "description": "This is a popular breakfast spot in the islands specifically known for their fish and chips and soups.",
                        "typicalDuration": "1 Hour",
                    }, 
                    {
                        "id": "event2",
                        "name": "Lobster Luncheon",
                        "keyword": "Lunch",
                        "startTime": "12:00",
                        "endTime": "13:30",
                        "duration": "1.5 Hours",
                        "description": "This is a popular lunch spot in the islands specifically known for their lobsters.",
                        "typicalDuration": "1 Hour",
                    }, 
                ]
            },
            "day6": {
                "events": [
                    {
                        "id": "event1",
                        "name": "Boca Brunch",
                        "keyword": "Breakfast",
                        "startTime": "9:00",
                        "endTime": "10:00",
                        "duration": "1 Hour",
                        "description": "This is a popular breakfast spot in the islands specifically known for their fish and chips and soups.",
                        "typicalDuration": "1 Hour",
                    }, 
                    {
                        "id": "event2",
                        "name": "Lobster Luncheon",
                        "keyword": "Lunch",
                        "startTime": "12:00",
                        "endTime": "13:30",
                        "duration": "1.5 Hours",
                        "description": "This is a popular lunch spot in the islands specifically known for their lobsters.",
                        "typicalDuration": "1 Hour",
                    }, 
                ]
            },
            "day7": {
                "events": [
                    {
                        "id": "event1",
                        "name": "Boca Brunch",
                        "keyword": "Breakfast",
                        "startTime": "9:00",
                        "endTime": "10:00",
                        "duration": "1 Hour",
                        "description": "This is a popular breakfast spot in the islands specifically known for their fish and chips and soups.",
                        "typicalDuration": "1 Hour",
                    }, 
                    {
                        "id": "event2",
                        "name": "Lobster Luncheon",
                        "keyword": "Lunch",
                        "startTime": "12:00",
                        "endTime": "13:30",
                        "duration": "1.5 Hours",
                        "description": "This is a popular lunch spot in the islands specifically known for their lobsters.",
                        "typicalDuration": "1 Hour",
                    }, 
                ]
            },
        }
    },
    {
        "id": 2,
        "image": "spain.jpg",
        "title": "Strolling through Spain",
        "startDate": "2021-12-03",
        "duration": "2 Days",
        "endDate": "2021-12-04",
        "description": "Spain is cool",
        "thoughtBubble": "I don't like spaniards!",
        "days": {
            "day1": {
                "image": "portugal.jpg",
                "eventName": "waterfall",
                "location": "Lisbon, Portugal",
                "eventCategory": "Attraction",
                "startTime": "10:00 AM",
                "durationInHours": "1",
                "entranceFee": "$10-$20",
                "description": "lovely waterfall here.",
                "notes": "",
                "ticketLink": ""
            },
            "day2": {
                "image": "",
                "eventName": "Travel Time",
                "location": "Milan, Portugal",
                "eventCategory": "Travel",
                "startTime": "11:00 AM",
                "durationInHours": "0.5",
                "entranceFee": "",
                "description": "be extra cautious on bumpy roads.",
                "notes": "",
                "ticketLink": ""
            },
        }
    },
    {
        "id": 3,
        "image": "canada.jpg",
        "title": "Canadian Cruise",
        "startDate": "2020-12-08",
        "duration": "2 Days",
        "endDate": "2020-12-09",
        "description": "Maple syrup is yum.",
        "thoughtBubble": "Cute ride ;)",
        "days": {
            "day1": {
                "image": "portugal.jpg",
                "eventName": "waterfall",
                "location": "Lisbon, Portugal",
                "eventCategory": "Attraction",
                "startTime": "10:00 AM",
                "durationInHours": "1",
                "entranceFee": "$10-$20",
                "description": "lovely waterfall here.",
                "notes": "",
                "ticketLink": ""
            },
            "day2": {
                "image": "",
                "eventName": "Travel Time",
                "location": "Milan, Portugal",
                "eventCategory": "Travel",
                "startTime": "11:00 AM",
                "durationInHours": "0.5",
                "entranceFee": "",
                "description": "be extra cautious on bumpy roads.",
                "notes": "",
                "ticketLink": ""
            },
        }
    },
    {
        "id": 4,
        "image": "amazon.jpg",
        "title": "Trekking The Amazon Trees",
        "startDate": "2024-12-03",
        "duration": "2 Days",
        "endDate": "2024-12-04",
        "description": "This will be a long voyage.",
        "thoughtBubble": "I love working for amazon but the trees.",
        "days": {
            "day1": {
                "image": "portugal.jpg",
                "eventName": "waterfall",
                "location": "Lisbon, Portugal",
                "eventCategory": "Attraction",
                "startTime": "10:00 AM",
                "durationInHours": "1",
                "entranceFee": "$10-$20",
                "description": "lovely waterfall here.",
                "notes": "",
                "ticketLink": ""
            },
            "day2": {
                "image": "",
                "eventName": "Travel Time",
                "location": "Milan, Portugal",
                "eventCategory": "Travel",
                "startTime": "11:00 AM",
                "durationInHours": "0.5",
                "entranceFee": "",
                "description": "be extra cautious on bumpy roads.",
                "notes": "",
                "ticketLink": ""
            },
        }
    },
    {
        "id": 5,
        "image": "date.jpg",
        "title": "Little Elm First Date Plans",
        "startDate": "2019-12-03",
        "duration": "4 Hours",
        "endDate": "2019-12-03",
        "description": "You will definitely bag her with this.",
        "thoughtBubble": "I will say this worked 10/10.",
        "days": {
            "day1": {
                "image": "portugal.jpg",
                "eventName": "waterfall",
                "location": "Lisbon, Portugal",
                "eventCategory": "Attraction",
                "startTime": "10:00 AM",
                "durationInHours": "1",
                "entranceFee": "$10-$20",
                "description": "lovely waterfall here.",
                "notes": "",
                "ticketLink": ""
            },
        }
    }
]
  
export default itinerariesData