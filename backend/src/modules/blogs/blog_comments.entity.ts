// import { BaseEntity } from "src/common/entities/base.entity";
// import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
// import { BlogPost } from "./blogPost.entity";
// import { User } from "../../common/entities/user.entity";

// @Entity('blog_comments')
// export class BlogComment extends BaseEntity {
//     @ManyToOne(() => BlogPost, post => post.comments, {
//         nullable: false,
//         onDelete: 'CASCADE', // Nếu bài post bị xóa, comment cũng bị xóa
//     })
//     @JoinColumn({ name: 'post_id' })
//     post: BlogPost;

//     @Column({ type: 'uuid', name: 'post_id' })
//     postId: string;

//     @ManyToOne(() => User, user => user.comments, {
//         nullable: false, // Comment phải có người dùng
//         onDelete: 'CASCADE', // Nếu user bị xóa, comment cũng bị xóa
//     })
//     @JoinColumn({ name: 'user_id' })
//     user: User;

//     @Column({ type: 'uuid', name: 'user_id' })
//     userId: string;

//     @Column({ type: 'text' })
//     content: string;

//     // Cho phép bình luận lồng nhau (reply)
//     @ManyToOne(() => BlogComment, comment => comment.replies, {
//         nullable: true,
//         onDelete: 'CASCADE', // Nếu parent comment bị xóa, reply cũng bị xóa
//     })
//     @JoinColumn({ name: 'parent_comment_id' })
//     parentComment?: BlogComment;

//     @Column({ type: 'uuid', name: 'parent_comment_id', nullable: true })
//     parentCommentId?: string;

//     @OneToMany(() => BlogComment, comment => comment.parentComment, { cascade: true })
//     replies: BlogComment[];
// }