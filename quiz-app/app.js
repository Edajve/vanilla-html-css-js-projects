fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    let quizData = data;

    const webUi = {
        entireModel: document.querySelector('.question-container'),
        exitBtn: document.getElementById('exit-btn-in-header'),
        questionsAnswerded: document.getElementById('numerator'),
        questionAmount: document.getElementById('denominator'),
        questionCorrect: document.getElementById('correct-number'),
        questionIncorrect: document.getElementById('incorrect-number'),
        question: document.getElementById('question-text'),
        a_answer: document.getElementById('answer-for-a'),
        b_answer: document.getElementById('answer-for-b'),
        c_answer: document.getElementById('answer-for-c'),
        d_answer: document.getElementById('answer-for-d'),
        bubbles: document.querySelectorAll('.answer-box'),
        progressionBar: document.querySelector('.progression-bar'),
        progressionPercentage: document.querySelector('.progression')
    }
    
    function closeModel() {
        webUi.entireModel.remove();
    }
    
    function updateProgressionBar(percentageDone) {
        if (percentageDone === 0) {
            webUi.progressionBar.style.width = "0";
        } else {
            webUi.progressionBar.style.width = "100%";
            webUi.progressionPercentage.style.width = `${percentageDone}%`;
        }
    }
    
    let questionIndex = 0;
    
    function setQuestionAndAndAnswer(index) {
        try {
            webUi.question.innerHTML = quizData[index].question;
            webUi.a_answer.innerHTML = quizData[index].a;
            webUi.b_answer.innerHTML = quizData[index].b;
            webUi.c_answer.innerHTML = quizData[index].c;
            webUi.d_answer.innerHTML = quizData[index].d;
        } catch (error) {
            // error is okay to let be
        }
    }
    
    function onBubbleClick(bubble) {
        const totalQuestions = quizData.length;

        if (questionIndex >= totalQuestions) {
            alert('Questions Over');
            questionIndex = 0;
            resetUi();
            return;
        }
    
        let currentQuestionsAnswerded = Number.parseInt(webUi.questionsAnswerded.innerHTML.substring(1));
        const newVal = currentQuestionsAnswerded + 1;
    
        webUi.questionsAnswerded.innerHTML = `#${newVal}`;
    
        const progressPercentage = (newVal/totalQuestions) * 100;
    
        updateProgressionBar(progressPercentage);
    
        const choosenLetter = bubble.target.id.split('-')[1];
        const correctLetter = quizData[questionIndex].correct;
    
        if (choosenLetter === correctLetter) {
            const parsedString = Number.parseInt(webUi.questionCorrect.innerHTML);
            webUi.questionCorrect.innerHTML = parsedString + 1;
        } else {
            const parsedString = Number.parseInt(webUi.questionIncorrect.innerHTML);
            webUi.questionIncorrect.innerHTML = parsedString + 1;
        }
            questionIndex++;
            setQuestionAndAndAnswer(questionIndex)
    }
    
    function resetUi() {
        webUi.questionsAnswerded.innerHTML = "#0";
        webUi.questionAmount.innerHTML = `of ${quizData.length}`;
        webUi.questionCorrect.innerHTML = 0;
        webUi.questionIncorrect.innerHTML = 0;
        updateProgressionBar(0);
        setQuestionAndAndAnswer(questionIndex);
    }
    
    resetUi();
    
    webUi.bubbles.forEach(b => b.addEventListener('click', (b) => onBubbleClick(b)))
    webUi.exitBtn.addEventListener('click', closeModel);
  })
.catch(error => console.error('Error:', error));