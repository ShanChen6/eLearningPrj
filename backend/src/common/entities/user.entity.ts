import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";
import { Role } from "./role.entity";
// import { Course } from "../../modules/courses/course.entity";
// import { Enrollment } from "../../modules/enrollment/enrollment.entity";
// import { Payment } from "../../modules/payments/payment.entity";
// import { Progress } from "../../modules/progresses/progress.entity";
// import { Quiz } from "../../modules/quiz/quiz.entity";
// import { ChatMessage } from "../../modules/chat/chat.entity";
// import { BlogPost } from "../../modules/blogs/blogPost.entity";
// import { BlogComment } from "../../modules/blogs/blog_comments.entity";

@Entity('users')
@Unique(["email"])
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    @Index() // Index cho tìm kiếm email nhanh hơn
    email: string;

    @Column({ nullable: true })
    @Exclude() // Không trả về trường này trong response
    password?: string;

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

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true, select: false })
    refreshToken?: string;

    @Column({ nullable: true, select: false })
    @Exclude()
    googleId: string;

    @Column({ nullable: true, select: false })
    @Exclude()
    facebookId: string;

    @Column({ nullable: true, select: false })
    @Exclude()
    githubId: string;

    //     @OneToMany(() => Course, (course) => course.instructor)
    //     courses: Course[];

    //     @OneToMany(() => Enrollment, (e) => e.user)
    //     enrollments: Enrollment[];

    //     @OneToMany(() => Payment, (p) => p.user)
    //     payments: Payment[];

    //     @OneToMany(() => Quiz, (qa) => qa.user)
    //     quizzes: Quiz[];

    //     @OneToMany(() => Progress, (p) => p.user)
    //     progresses: Progress[];

    //     @OneToMany(() => ChatMessage, (msg) => msg.user)
    //     messages: ChatMessage[];

    //     @OneToMany(() => BlogPost, (b) => b.author)
    //     blogs: BlogPost[];

    //     // Quan hệ: Một User có thể viết nhiều Bình luận Blog
    //     @OneToMany(() => BlogComment, comment => comment.user)
    //     comments: BlogComment[];
}