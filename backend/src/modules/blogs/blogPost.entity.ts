import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/user.entity";
import { BlogComment } from "./blog_comments.entity";

@Entity('blog_posts')
export class BlogPost extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    content: string; // HTML or Markdown

    @Column({ type: 'varchar', length: 255, unique: true })
    @Index()
    slug: string;

    @Column({ type: 'varchar', nullable: true })
    featuredImageUrl: string;

    @Column({ type: 'boolean', default: false })
    isPublished: boolean;

    @Column({ type: 'timestamp with time zone', nullable: true })
    publishedAt: Date;

    @ManyToOne(() => User, user => user.blogs, {
        nullable: false, // Bài viết phải có tác giả
        onDelete: 'SET NULL', // Nếu tác giả bị xóa, giữ lại bài viết
    })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @Column({ type: 'uuid', name: 'author_id' })
    authorId: string;

    @Column({ type: 'simple-array', nullable: true, comment: 'Array of tags' }) // PostgreSQL specific
    tags: string[];

    @Column({ type: 'varchar', length: 100, nullable: true })
    @Index()
    category: string;

    @OneToMany(() => BlogComment, comment => comment.post, { cascade: true })
    comments: BlogComment[];
}