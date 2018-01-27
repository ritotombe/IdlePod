import React from 'react'

//q1-q9 source: https://surveyyourself.files.wordpress.com/2018/01/irrational-procrastination-scale.pdf
export default function() {
    return {
        1: {
                text: "I delay tasks beyond what is reasonable.", 
                reverse: false,
                number: 1
            },
        2: {
                text: "I do everything when I believe it needs to be done.", 
                reverse: true,
                number: 2
            },
        3: {
                text: "I often regret not getting to tasks sooner.", 
                reverse: false,
                number: 3
            },
        4: {
                text: "There are aspects of my life that I put off, though I know I shouldn't.", 
                reverse: false,
                number: 4
            },
        5: {
                text: "If there is something I should do, I get to it before attending to lesser tasks.",
                reverse: true,
                number: 5
            },
        6: {
                text: "I put things off so long that my well-being or efficiency unnecessarily suffers.", 
                reverse: false,
                number: 6
            },
        7: {
                text: "At the end of the day, I know I could have spent the time better.", 
                reverse: false,
                number: 7
            },
        8: {
                text: "I spend my time wisely.", 
                reverse: true,
                number: 8
            },
        9: {
                text: "When I should be doing one thing, I will do another.", 
                reverse: false,
                number: 9
            },
        10:{
                text: "I usually prevent and/or overcome procrastination by ...", 
                reverse: false,
                number: 10,
                options: {
                    1: {
                        text: "Find peer(s) to help me to take actions", 
                        extra: "In what kind of help do you expect?",
                        number: 1
                    },
                    2: {
                        text: "Clarify my vision",
                        number: 2
                    },
                    3: {
                        text: "Break down my work (task and/or time) into smaller details",
                        extra: "Do you use any tool(s) to manage your work? Is there any particular technique?",
                        number: 3
                    }, 
                    4: {
                        text: "Change my environment",
                        extra: "What environment do you typically change? (eg. work, school, friends, etc)",
                        number: 4
                    }, 
                    5: {
                        text: "No more excuses, just do it",
                        number: 5
                    }, 
                    6: {
                        text: "Other ...",
                        number: 6
                    }
                }
            },
        }
}