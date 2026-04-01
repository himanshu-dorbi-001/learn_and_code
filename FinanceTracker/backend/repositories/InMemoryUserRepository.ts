import { User } from '../domain/models/User';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { EntityNotFoundError } from '../domain/errors/ApplicationError';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.getId(), user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new EntityNotFoundError('User', id);
    }
    this.users.delete(id);
  }
}