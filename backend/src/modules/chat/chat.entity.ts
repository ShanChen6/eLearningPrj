// import { BaseEntity } from "src/common/entities/base.entity";
// import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
// import { User } from "../../common/entities/user.entity";

// @Entity()
// export class ChatMessage extends BaseEntity {
//     @ManyToOne(() => User, user => user.messages, {
//         nullable: false,
//         onDelete: 'CASCADE', // Hoặc SET NULL nếu muốn giữ tin nhắn khi user bị xóa
//     })
//     @JoinColumn({ name: 'sender_id' })
//     user: User;

//     @Column({ type: 'uuid', name: 'user_id' })
//     userId: string;

//     // ID của phòng chat, có thể là course_id, lesson_id, hoặc một ID phòng chat riêng
//     @Column({ type: 'uuid', name: 'room_id', nullable: true })
//     @Index()
//     roomId: string;

//     @Column({ type: 'text' })
//     content: string;

//     @Column({
//         type: 'timestamp with time zone',
//         default: () => 'CURRENT_TIMESTAMP',
//         name: 'sent_at',
//     })
//     sentAt: Date;
// }