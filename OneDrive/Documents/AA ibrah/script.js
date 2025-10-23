document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: 'ركن من اركان الحج اذا لم يفعله العبد ، فانه يفوته الحج فما هو ؟', answer: 'الوقوف بعرفه' },
        { question: 'ما المقصود بالمدينه الورديه؟', answer: 'مدينه البتراء بالاردن' },
        { question: 'ماهي أول سوره نزلت كامله؟', answer: 'سوره المدثر' },
        { question: 'كوكب لاتظهر فيه ظاهره الفصول الاربعه؟', answer: 'عطارد' },
        { question: 'ماهي قاعده حساب السرعه المتوسطه؟', answer: 'المسافه ÷ السرعه' },
        { question: 'من هو مخترع الاله الحاسبه ؟', answer: 'المخترع بليز باسكال' },
        { question: 'ضد كلمه مخترع؟', answer: 'مقلد ،مستنسخ' },
        { question: 'من أول من قال السلام عليكم ورحمة الله وبركاته؟', answer: 'آدم عليه السلام' },
        { question: 'ماهو أول كوكب اكتشف بواسطه التيليسكوب؟', answer: 'اورانوس' },
        { question: 'ماهو أقدم أنواع العلوم؟', answer: 'الفلك' },
        { question: 'هو سواد الليل وظلمته؟', answer: 'الدُجى' },
        { question: 'ماهي جمع كلمه حسام ؟', answer: 'حسامون ، حسامين' },
        { question: 'ماهو العنصر الرئيسي في تركيب المخدر ؟', answer: 'كحول' },
        { question: 'من أشهر أنواع الخط العربي؟', answer: 'الكوفي' },
        { question: 'من هو النبي الذي لم يتزوج ؟', answer: 'يحيى عليه السلام ، عيسى عليه السلام' },
        { question: 'من هو الخليفه الذي يحج عاماً ويغزو عاماً؟', answer: 'هارون الرشيد' },
        { question: 'يقصد به زياده الخير ودوامه؟', answer: 'البركة' },
        { question: 'هو الشق من جانب الى اخر فما هو؟', answer: 'ثقب' },
        { question: 'ماده تستخرج من بطن الغزال؟', answer: 'مسك' },
        { question: 'هي وحده قياس طويله ذكرت في القران الكريم؟', answer: 'ذراع' },
        { question: 'كلمه ضد كلمه الايثار فما هي؟', answer: 'الجشع /الانانيه' },
        { question: 'ماذا يسمى صوت الافعى ؟', answer: 'فحيح' },
        { question: 'من هو الحيوان المشهور بجماله ويعيش في الصحراء؟', answer: 'ظبي' },
        { question: 'التَّـقوى، والتَّحرُّجُ، والكفُّ عن المحارِمِ فما هي ؟', answer: 'الوَرَع' },
        { question: 'اين يقع مثلث برمودا؟', answer: 'في المحيط الاطلسي' }
    ];
    let currentQuestionIndex = 0;

    const questionDisplay = document.getElementById('question-display');
    const answerDisplay = document.getElementById('answer-display');
    const questionCounter = document.getElementById('question-counter');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const team1ScoreSpan = document.getElementById('team1-score');
    const team2ScoreSpan = document.getElementById('team2-score');
    const scoreControls = document.querySelectorAll('.score-controls .score-btn');

    const savedState = JSON.parse(localStorage.getItem('quizState'));
    if (savedState) {
        currentQuestionIndex = savedState.currentQuestionIndex;
        team1ScoreSpan.textContent = savedState.team1Score;
        team2ScoreSpan.textContent = savedState.team2Score;
    }

    function updateQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionDisplay.textContent = questions[currentQuestionIndex].question;
            questionCounter.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
            answerDisplay.style.display = 'none';
            saveState();
        } else {
            questionDisplay.textContent = 'انتهت الأسئلة!';
            questionCounter.textContent = '';
            answerDisplay.style.display = 'none';
            nextQuestionBtn.disabled = true;
            showAnswerBtn.disabled = true;
            nextQuestionBtn.textContent = 'انتهى';
        }
    }

    function showAnswer() {
        if (currentQuestionIndex < questions.length) {
            answerDisplay.textContent = `الإجابة: ${questions[currentQuestionIndex].answer}`;
            answerDisplay.style.display = 'block';
        }
    }

    function saveState() {
        const state = {
            currentQuestionIndex: currentQuestionIndex,
            team1Score: parseInt(team1ScoreSpan.textContent),
            team2Score: parseInt(team2ScoreSpan.textContent)
        };
        localStorage.setItem('quizState', JSON.stringify(state));
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        updateQuestion();
    });

    showAnswerBtn.addEventListener('click', showAnswer);

    scoreControls.forEach(button => {
        button.addEventListener('click', () => {
            const team = button.dataset.team;
            const action = button.dataset.action;
            const scoreSpan = team === '1' ? team1ScoreSpan : team2ScoreSpan;
            let currentScore = parseInt(scoreSpan.textContent);

            if (action === 'add') {
                currentScore++;
            } else if (action === 'subtract') {
                if (currentScore > 0) {
                    currentScore--;
                }
            }
            scoreSpan.textContent = currentScore;
            saveState();
        });
    });

    updateQuestion();
});