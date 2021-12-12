const questionBank_json = {
    Physics:{
        Easy: [],
        Medium: [],
        Hard: []
    }
};

let topics = ["Waves", "Optics", "Mechanics", "Liquid Properties", "Force"]
let unique_marks_Easy = [5, 3, 2]
let unique_marks_Medium = [4, 4.5, 5, 6]
let unique_marks_Hard = [7, 10, 12]
for(let i = 0; i < 100; i++){
    questionBank_json.Physics.Easy.push({
        _id: i,
        value: [(Math.random()+1).toString(36).substring(2) + "?", "Physics", topics[Math.floor(Math.random()*topics.length)], unique_marks_Easy[Math.floor(Math.random()*unique_marks_Easy.length)]]
    })
    questionBank_json.Physics.Medium.push({
        _id: i,
        value: [(Math.random()+1).toString(36).substring(2) + "?", "Physics", topics[Math.floor(Math.random()*topics.length)], unique_marks_Medium[Math.floor(Math.random()*unique_marks_Medium.length)]]
    })
    questionBank_json.Physics.Hard.push({
        _id: i,
        value: [(Math.random()+1).toString(36).substring(2) + "?", "Physics", topics[Math.floor(Math.random()*topics.length)], unique_marks_Hard[Math.floor(Math.random()*unique_marks_Hard.length)]]
    })
}

module.exports = questionBank_json;