# QuizGen API
The Question Paper Generator API or QuizGen API is designed to ready a question paper in an instant. This API takes into account the subject, topic and marks by difficulty to prepare a fair question paper from the questions from a readymade question bank and sends it back as a .pdf file. I am thankful to the Reelo team for giving me the opportunity to work on such an interesting project.

# Base Url of the deployed app
This app is deployed on heroku and the base url is https://quizgen-quiz-generator.herokuapp.com.
To use the API, follow this format:
https://quizgen-quiz-generator.herokuapp.com/[route]

# Endpoints/Routes

# Route 1: Set the question bank
Endpoint: /setQuestionBank<br/>
Method: POST<br/>
Initially, the app uses a question Bank with randomly generated strings as questions. I have not designed an actual question bank :P. Here is a sample example of how the question bank JSON is structured. Right now, initial question bank has only one subject: "Physics", and 5 topics: "Waves", "Optics", "Mechanics", "Liquid Properties" and "Force". "All" as a topic name selects questions from all topics in a subject.
```
{
  "Physics":{
    "Easy":[
      {
        "_id": ...,
        "value": ["What is the speed of light", "Physics", "Waves", 5]
      }, ...
    ],
    "Medium":[
       ...
    ],
    "Hard": [
      ...
    ]
  }
}
```

This endpoint allows you to set your own question bank by sending a question bank JSON in the same above format in the post request body. 

# Route 2: Generate question paper pdf by passing distribution of marks by difficulty as query parameter
Endpoint: /generateQuiz/[subject]/[topic]?easy=[a%]&medium=[b%]&hard=[c%]&total=[totMarks]<br/>
Method: GET <br/>
Eg: https://quizgen-quiz-generator.herokuapp.com/generateQuiz/Physics/All?easy=5&medium=50&hard=45 <br/>
Note: By default distribution is easy = 20%, medium = 50%, hard = 30% and total = 100<br/>
This endpoint generates and sends the question paper as a .pdf file that you can download. If marks of one section/difficulty are not adding up to percentage of marks in that section. It adds up the remaining marks in the last questions proposed marks. That way you always get a paper that has a perfect marking scheme. If there are no questions left to select from or the topic does not exist. It would print the no. of marks remaining in the pdf file along with the rest of the selected questions and ask the user to set questions for that many marks. Incase the pecentages of easy, medium and hard are not adding up to 100. It would send MathError message.

# Route 3: Generate question paper pdf by passing distribution of marks by difficulty as post JSON data
Endpoint: /generateQuiz/[subject]/[topic]<br/>
Method: POST<br/>
Eg: https://quizgen-quiz-generator.herokuapp.com/generateQuiz/Physics/All with post data as: 

```
{
    "easy": 50,
    "medium": 40,
    "hard": 10
}
```
Note: By default distribution is easy = 20%, medium = 50%, hard = 30% and total = 100<br/>

Works same as the GET request but intended to be used as integration with a FrontEnd.

# Libraries used and Why
1. Express: Most popular js backend framework which abstracts a lot of things in API development.
2. pdfKit: I pereferred this library for generating the PDF because it is simple to use and comes with a lot of formatting options.

# Vulnerabilities

1. I have not yet implemented any logic to avoid repeating questions. This I plan to do in the future by maintaining a selected question set for each difficulty.
2. I would like to have an uploading functionality for uploading question bank JSON file.
3. I would like to make the pdf prettier.

# Final Note
 
 Thank you for reading this far. If you face any issues with the API, feel free to connect to me about it. I would look forward to your feedback:)

