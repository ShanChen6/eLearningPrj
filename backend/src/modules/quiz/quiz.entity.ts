// import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
// import { Course } from "../courses/course.entity";
// import { Lesson } from "../lessons/lesson.entity";
// import { User } from "../../common/entities/user.entity";
// import { BaseEntity } from "src/common/entities/base.entity";

// @Entity()
// export class Quiz extends BaseEntity {
//     @Column({ type: 'varchar', length: 255 })
//     title: string;

//     @Column({ type: 'text', nullable: true })
//     description: string;

//     // Quiz có thể thuộc về một Course hoặc một Lesson cụ thể
//     @ManyToOne(() => Course, course => course.quizzes, {
//         nullable: true,
//         onDelete: 'CASCADE',
//     })
//     @JoinColumn({ name: 'course_id' })
//     course?: Course;

//     @Column({ type: 'uuid', name: 'course_id', nullable: true })
//     courseId?: string;

//     @ManyToOne(() => Lesson, lesson => lesson.quizzes, {
//         nullable: true,
//         onDelete: 'CASCADE',
//     })
//     @JoinColumn({ name: 'lesson_id' })
//     lesson?: Lesson;

//     @Column({ type: 'uuid', name: 'lesson_id', nullable: true })
//     lessonId?: string;

//     @Column({ type: 'int', nullable: true, comment: 'Time limit in minutes' })
//     timeLimitMinutes: number;

//     @Column({
//         type: 'decimal',
//         precision: 5,
//         scale: 2,
//         nullable: true,
//         comment: 'Passing score (e.g., 70.00 out of 100)',
//     })
//     passingScore: number;

//     @ManyToOne(() => User, (user) => user.quizzes)
//     user: User;


//     // @OneToMany(() => QuestionEntity, question => question.quiz, { cascade: true })
//     // questions: QuestionEntity[];

//     // @OneToMany(() => QuizSubmissionEntity, submission => submission.quiz)
//     // submissions: QuizSubmissionEntity[];
// }
