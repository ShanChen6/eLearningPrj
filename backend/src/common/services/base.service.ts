import { Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<BaseEntity>) { }

  findAll(): Promise<BaseEntity[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<T> {
    return this.repo.findOne({ where: { id } as any }) as Promise<T>;
  }

  create(data: Partial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity) as Promise<T>;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}