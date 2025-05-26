import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";
import { Role } from "../roles/role.entity";
import { Course } from "../courses/course.entity";
import { Enrollment } from "../enrollment/enrollment.entity";
import { Payment } from "../payments/payment.entity";
import { Progress } from "../progresses/progress.entity";
import { Quiz } from "../quiz/quiz.entity";
import { ChatMessage } from "../chat/chat.entity";
import { BlogPost } from "../blogs/blogPost.entity";
import { BlogComment } from "../blogs/blog_comments.entity";

@Entity('users')
@Unique(["email"])
export abstract class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    @Index()
    email: string;

    @Column({ nullable: true })
    @Exclude()
    password: string;

    // Quan hệ ManyToMany với RoleEntity: Một người dùng có thể có nhiều vai trò
    @ManyToMany(() => Role, role => role.users, { cascade: true, eager: false })
    @JoinTable({
        name: 'user_roles', // Tên bảng trung gian
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
    })
    roles: Role[];

    // @Column({ type: 'enum', enum: Gender, nullable: true })
    // gender: Gender;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    @Exclude()
    googleId: string;

    @Column({ nullable: true })
    @Exclude()
    facebookId: string;

    @Column({ nullable: true })
    @Exclude()
    githubId: string;

    // @Column({ type: 'boolean', default: false })
    // isEmailVerified: boolean;

    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

    @OneToMany(() => Enrollment, (e) => e.user)
    enrollments: Enrollment[];

    @OneToMany(() => Payment, (p) => p.user)
    payments: Payment[];

    @OneToMany(() => Quiz, (qa) => qa.user)
    quizzes: Quiz[];

    @OneToMany(() => Progress, (p) => p.user)
    progresses: Progress[];

    @OneToMany(() => ChatMessage, (msg) => msg.user)
    messages: ChatMessage[];

    @OneToMany(() => BlogPost, (b) => b.author)
    blogs: BlogPost[];

    // Quan hệ: Một User có thể viết nhiều Bình luận Blog
    @OneToMany(() => BlogComment, comment => comment.user)
    comments: BlogComment[];
}