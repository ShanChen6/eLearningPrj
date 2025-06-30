import { IsOptional, IsNumber, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number) // Đảm bảo chuyển đổi từ string sang number
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    orderBy?: string; // Tên trường để sắp xếp (ví dụ: 'name', 'createdAt')

    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC']) // Chỉ cho phép 'ASC' hoặc 'DESC'
    sortOrder?: 'ASC' | 'DESC' = 'ASC';

    @IsOptional()
    @IsString()
    q?: string; // Query chung cho full-text search
}