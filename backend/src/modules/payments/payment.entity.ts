// import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
// import { User } from "../../common/entities/user.entity";
// import { Course } from "../courses/course.entity";
// import { BaseEntity } from "src/common/entities/base.entity";

// @Entity('payments')
// export class Payment extends BaseEntity {
//     @ManyToOne(() => User, user => user.payments, {
//         nullable: false, // Phải có người dùng thanh toán
//         onDelete: 'SET NULL', // Nếu user bị xóa, giữ lại payment record, set userId = null
//     })
//     @JoinColumn({ name: 'user_id' })
//     user: User;

//     @Column({ type: 'uuid', name: 'user_id' })
//     userId: string;

//     // Thanh toán có thể cho một khóa học, hoặc một gói, hoặc sản phẩm khác
//     @ManyToOne(() => Course, course => course.payments, {
//         nullable: true, // Có thể không gắn với khóa học cụ thể
//         onDelete: 'SET NULL',
//     })
//     @JoinColumn({ name: 'course_id' })
//     course?: Course;

//     @Column({ type: 'uuid', name: 'course_id', nullable: true })
//     courseId?: string;

//     @Column({ type: 'varchar', length: 255, unique: true }) // ID giao dịch từ cổng thanh toán
//     transactionId: string;

//     @Column({ type: 'varchar', length: 50 })
//     paymentGateway: string; // e.g., 'STRIPE', 'PAYPAL', 'VNPAY'

//     @Column({ type: 'decimal', precision: 12, scale: 2 }) // Tăng precision nếu cần
//     amount: number;

//     @Column({ type: 'varchar', length: 10 })
//     currency: string; // e.g., 'VND', 'USD'

//     // @Column({
//     //     type: 'enum',
//     //     enum: PaymentStatus,
//     //     default: PaymentStatus.PENDING,
//     // })
//     // status: PaymentStatus;

//     @Column({ type: 'jsonb', nullable: true, comment: 'Store additional gateway response or metadata' })
//     gatewayMetadata: object;
// }