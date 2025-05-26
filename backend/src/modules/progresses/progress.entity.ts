import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { Lesson } from "../lessons/lesson.entity";
import { Course } from '../courses/course.entity';
import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
@Index(['userId', 'lessonId'], { unique: true })
export class Progress extends BaseEntity {
    @ManyToOne(() => User, user => user.progresses, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @ManyToOne(() => Lesson, lesson => lesson.progresses, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;

    @Column({ type: 'uuid', name: 'lesson_id' })
    lessonId: string;

    // Để dễ dàng truy vấn tiến độ theo khóa học mà không cần join nhiều lần
    @ManyToOne(() => Course, { // Không cần trường quan hệ ngược ở CourseEntity
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'uuid', name: 'course_id' })
    courseId: string;


    @Column({ type: 'boolean', default: false })
    isCompleted: boolean;

    @Column({ type: 'timestamp with time zone', nullable: true })
    completedAt: Date;
}