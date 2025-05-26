export enum PaymentStatus {
    PENDING = 'pending',
    SUCCESSFUL = 'successful',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

export enum QuestionType {
    MULTIPLE_CHOICE_SINGLE_ANSWER = 'multiple_choice_single_answer',
    MULTIPLE_CHOICE_MULTIPLE_ANSWERS = 'multiple_choice_multiple_answers',
    ESSAY = 'essay',
    SHORT_ANSWER = 'short_answer',
}