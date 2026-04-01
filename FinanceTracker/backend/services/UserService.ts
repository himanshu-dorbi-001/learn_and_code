import { User } from '../domain/models/User';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { EntityAlreadyExistsError, EntityNotFoundError } from '../domain/errors/ApplicationError';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(name: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new EntityAlreadyExistsError('User', email);
    }

    const userId = uuidv4();
    const newUser = new User(userId, name, email);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}