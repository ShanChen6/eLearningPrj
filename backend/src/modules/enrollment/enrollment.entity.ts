// import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
// import { User } from "../../common/entities/user.entity";
// import { Course } from "../courses/course.entity";
// import { BaseEntity } from "src/common/entities/base.entity";

// @Entity('enrollments')
// @Index(['userId', 'courseId'], { unique: true })
// export class Enrollment extends BaseEntity {
//     @ManyToOne(() => User, user => user.enrollments, {
//         nullable: false,
//         onDelete: 'CASCADE',
//     })
//     @JoinColumn({ name: 'user_id' })
//     user: User;

//     @Column({ type: 'uuid', name: 'user_id' })
//     userId: string;

//     @ManyToOne(() => Course, course => course.enrollments, {
//         nullable: false,
//         onDelete: 'CASCADE',
//     })
//     @JoinColumn({ name: 'course_id' })
//     course: Course;

//     @Column({ type: 'uuid', name: 'course_id' })
//     courseId: string;

//     @Column({
//         type: 'timestamp with time zone',
//         default: () => 'CURRENT_TIMESTAMP',
//     })
//     enrolledAt: Date;

//     @Column({
//         type: 'decimal',
//         precision: 5,
//         scale: 2,
//         default: 0.0,
//         comment: 'Completion percentage 0.00 to 100.00',
//     })
//     completionPercentage: number;
// }