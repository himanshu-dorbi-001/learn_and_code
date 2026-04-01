export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly createdAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date = new Date()
  ) {
    this.validateUserData(name, email);
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  private validateUserData(name: string, email: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
