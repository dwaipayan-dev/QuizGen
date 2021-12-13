require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

const pdfMakerService = require('./pdfMakerService');

const Utility = require('./Utilities');
const questionBank = require('./QuestionBank');

const PORT = process.env.PORT || 8086;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

//post request. Pass marks breakdown and total marks as part of json body
app.get('/generateQuiz/:subject/:topic', async(req, res)=>{
    let subject = req.params.subject || "Physics";
    let topic = req.params.topic || "All";

    let easyPercent = parseFloat(req.query.easy) || 20;
    let mediumPercent = parseFloat(req.query.medium) || 50;
    let hardPercent = parseFloat(req.query.hard) || 30;
    let totalMarks = parseInt(req.query.total) || 100;
    //console.log((easyPercent + mediumPercent + hardPercent), totalMarks)
    let questionSheet = {};

    try{
        if((easyPercent + mediumPercent + hardPercent)*totalMarks*0.01 > totalMarks)
            throw "MathError";
        questionSheet.easy = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, easyPercent, "Easy", totalMarks);
        questionSheet.medium = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, mediumPercent, "Medium", totalMarks);
        questionSheet.hard = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, hardPercent, "Hard", totalMarks);
        if(questionSheet.easy.maxMarks > 0){
            questionSheet.easy.message(`Questions worth ${questionSheet.easy.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        if(questionSheet.medium.maxMarks > 0){
            questionSheet.medium.message(`Questions worth ${questionSheet.medium.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        if(questionSheet.hard.maxMarks > 0){
            questionSheet.hard.message(`Questions worth ${questionSheet.hard.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=QuizPaper.pdf'
        });
        pdfMakerService.buildPDF(
            (chunk)=>stream.write(chunk),
            () => stream.end(),
            questionSheet
        );
    }

    catch(e){
        res.status(400).send("Unknown error"+e);
    }
})

//get request. Pass marks breakdown and total marks as query params
app.post('/generateQuiz/:subject/:topic', async(req, res)=>{
    let subject = req.params.subject || "Physics";
    let topic = req.params.topic || "All";
    let easyPercent = parseFloat(req.body.easy) || 20;
    let mediumPercent = parseFloat(req.body.medium) || 50;
    let hardPercent = parseFloat(req.body.hard) || 30;
    let totalMarks = parseInt(req.body.total) || 100;
    //console.log((easyPercent + mediumPercent + hardPercent), totalMarks)
    let questionSheet = {};

    try{
        if((easyPercent + mediumPercent + hardPercent)*totalMarks*0.01 > totalMarks)
            throw "MathError";
        questionSheet.easy = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, easyPercent, "Easy", totalMarks);
        questionSheet.medium = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, mediumPercent, "Medium", totalMarks);
        questionSheet.hard = Utility.distributeQuestionsAccToPercentage(questionBank, subject, topic, hardPercent, "Hard", totalMarks);
        if(questionSheet.easy.maxMarks > 0){
            questionSheet.easy.message(`Questions worth ${questionSheet.easy.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        if(questionSheet.medium.maxMarks > 0){
            questionSheet.medium.message(`Questions worth ${questionSheet.medium.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        if(questionSheet.hard.maxMarks > 0){
            questionSheet.hard.message(`Questions worth ${questionSheet.hard.maxMarks} could not be generated. Please create questions to complete the paper.`);
        }
        //res.status(200).send(questionSheet);
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline'
        });
        pdfMakerService.buildPDF(
            (chunk)=>stream.write(chunk),
            () => stream.end(),
            questionSheet
        );
    }

    catch(e){
        res.status(400).send("Unknown error"+e);
    }
})

app.listen(PORT, async()=>{
    console.log(`Server listening on PORT ${PORT}`);
}).on('error', (err)=>{
    console.log(`${err}`);
});