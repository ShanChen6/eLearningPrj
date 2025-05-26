import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Course } from "../courses/course.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Progress } from "../progresses/progress.entity";
import { Quiz } from "../quiz/quiz.entity";

@Entity('lessons')
export class Lesson extends BaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'varchar', nullable: true })
    videoUrl: string;

    @Column({ type: 'int', default: 0 })
    @Index()
    order: number; // Thứ tự bài học trong khóa

    @Column({ type: 'int', nullable: true, comment: 'Duration in minutes' })
    durationMinutes: number;

    @ManyToOne(() => Course, course => course.lessons, {
        nullable: false,
        onDelete: 'CASCADE', // Nếu Course bị xóa, Lesson cũng bị xóa
    })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'uuid', name: 'course_id' })
    courseId: string;

    @OneToMany(
        () => Progress,
        progress => progress.lesson,
    )
    progresses: Progress[];

    @OneToMany(() => Quiz, quiz => quiz.lesson, { cascade: true })
    quizzes: Quiz[];
}