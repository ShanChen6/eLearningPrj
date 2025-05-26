import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/user.entity";
import { Lesson } from "../lessons/lesson.entity";
import { Enrollment } from "../enrollment/enrollment.entity";
import { Payment } from "../payments/payment.entity";
import { Quiz } from "../quiz/quiz.entity";

@Entity('courses')
export class Course extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        unique: true
    })
    @Index()
    slug: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00
    })
    price: number;

    @Column({ type: 'varchar', nullable: true })
    thumbnailUrl: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    @Index()
    category: string;

    @Column({ type: 'boolean', default: false })
    isPublished: boolean;

    @Column({ type: 'text', nullable: true })
    prerequisites: string;

    @ManyToOne(() => User, user => user.courses, {
        nullable: false, // Một khóa học phải có người hướng dẫn
        onDelete: 'SET NULL', // Nếu instructor bị xóa, khóa học vẫn còn, instructorId = null
    })
    @JoinColumn({ name: 'instructor_id' })
    instructor: User;

    @Column({ type: 'uuid', name: 'instructor_id' }) // Lưu trữ ID của instructor
    instructorId: string;

    // @ManyToOne(() => User, (user) => user.courses)
    // instructor: User;

    @OneToMany(() => Lesson, (lesson) => lesson.course, { cascade: true })
    lessons: Lesson[];

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[];

    @OneToMany(() => Quiz, quiz => quiz.course, { cascade: true })
    quizzes: Quiz[];

    @OneToMany(() => Payment, payment => payment.course)
    payments: Payment[];
}