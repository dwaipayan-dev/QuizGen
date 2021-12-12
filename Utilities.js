const questionBank = require('./QuestionBank')
// for(let obj of questionBank.Physics.Easy){
//     console.log(obj)
// }
// for(let obj of questionBank.Physics.Medium){
//     console.log(obj)
// }
// for(let obj of questionBank.Physics.Hard){
//     console.log(obj)
// }

const Utility = {
    sortQuestionsToMarks(QuestionArr){
        return QuestionArr.sort((firstElement, secondElement)=>{
            return -(firstElement.value[3] - secondElement.value[3]);
        })
    },
    getUniqueMarks(QuestionArr){
        let marksMap = QuestionArr.map((element)=>{
            return element.value[3];
        });
        return [...new Set(marksMap)];
    },
    selectRange(questionListSorted, thresholdMarks){
        for(let i = 0; i < questionListSorted.length; i++){
            if(questionListSorted[i].value[3] === thresholdMarks){
                return questionListSorted.slice(i);
            }
        }
    }, 
    distributeQuestionsAccToPercentage(questionBank, subject, topic, percentage, difficulty, totalMarks){
        let questionByDifficulty = [...questionBank[subject][difficulty]];
        //console.log(questionByDifficulty);
        let questionByTopic = [];
        if(topic === "All"){
            questionByTopic = [...questionByDifficulty];
        }
        else{
            questionByTopic = questionByDifficulty.filter((element)=>{
                return element.value[2] === topic;
            });
        }
        //console.log(questionByTopic);
        let maxMarks = percentage*0.01*totalMarks;
        //console.log(maxMarks);
        let questionListSorted = this.sortQuestionsToMarks(questionByTopic);
        //console.log(questionListSorted);
        let uniqueMarksList = this.getUniqueMarks(questionListSorted);
        //console.log(uniqueMarksList);
        let thresholdMarks = uniqueMarksList[0];
        let thresholdIdx = 0;
        let questionPaper = [];
        try{
            while(maxMarks > 0){
                while(maxMarks < thresholdMarks && thresholdIdx < uniqueMarksList.length-1){
                    thresholdIdx += 1;
                    thresholdMarks = uniqueMarksList[thresholdIdx];
                    //console.log(`thresholdMarks is ${thresholdMarks}`);
                }
                if(maxMarks < thresholdMarks){
                    //console.log("set Last");
                    questionPaper[questionPaper.length - 1].value[3] += maxMarks;
                    maxMarks = 0;
                    continue;
                }
                questionListSorted = this.selectRange(questionListSorted, thresholdMarks);
                if(uniqueMarksList.includes(maxMarks)){
                    questionListSorted = questionListSorted.filter((element)=>{
                        return element.value[3] === maxMarks;
                    });
                    //choose random, make maxMarks zero then continue
                }
                if(questionListSorted === undefined){
                    //throw error
                    throw "Error! No more questions can be selected within limit."
                } 
                let chosenQuestion = questionListSorted[Math.floor(Math.random()*questionListSorted.length)];
                let chosenQuestionId = chosenQuestion._id;
                let chosenQuestionValue = [...chosenQuestion.value];
                maxMarks -= chosenQuestionValue[3];
                questionPaper.push(chosenQuestion);
                //console.log(`${chosenQuestionId}->${chosenQuestionValue}`); 
                
            }
            return({questionPaper, maxMarks});
        }
        catch(e){
            console.log(`Questions worth ${maxMarks} could not be generated. Question Paper generated till now is:`);
            return({questionPaper, maxMarks});
        }
    }
}

//Freezing object so that functions cannot be changed from outside.
Object.freeze(Utility);
// console.log(Utility.distributeQuestionsAccToPercentage(questionBank, "Physics", "All", 20, "Easy", 100));
// console.log(Utility.distributeQuestionsAccToPercentage(questionBank, "Physics", "All", 50, "Medium", 100));
// console.log(Utility.distributeQuestionsAccToPercentage(questionBank, "Physics", "All", 30, "Hard", 100));

module.exports = Utility;