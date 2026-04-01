import { User } from '../domain/models/User';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(name: string, email: string): Promise<User> {
    return this.userService.createUser(name, email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
