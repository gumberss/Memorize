
export const FINISH_QUIZ = 'FINISH_QUIZ'

export function finishQuiz(quiz) {

    return {
        type: FINISH_QUIZ,
        quiz: quiz
    }
}