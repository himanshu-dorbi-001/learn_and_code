import { IUserRepository } from './domain/repositories/IUserRepository';
import { ITransactionRepository } from './domain/repositories/ITransactionRepository';
import { IBudgetRepository } from './domain/repositories/IBudgetRepository';
import { INotificationService } from './domain/services/INotificationService';
import { ICurrencyConversionService } from './domain/services/ICurrencyConversionService';

import { InMemoryUserRepository } from './repositories/InMemoryUserRepository';
import { InMemoryTransactionRepository } from './repositories/InMemoryTransactionRepository';
import { InMemoryBudgetRepository } from './repositories/InMemoryBudgetRepository';
import { EmailNotificationAdapter } from './adapters/EmailNotificationAdapter';
import { MockCurrencyConversionAdapter } from './adapters/MockCurrencyConversionAdapter';

import { UserService } from './services/UserService';
import { TransactionService } from './services/TransactionService';
import { BudgetService } from './services/BudgetService';
import { ReportService } from './services/ReportService';

import { UserController } from './controllers/UserController';
import { TransactionController } from './controllers/TransactionController';
import { BudgetController } from './controllers/BudgetController';
import { ReportController } from './controllers/ReportController';

export class Container {
  private static instance: Container;

  // Repositories
  private userRepository: IUserRepository;
  private transactionRepository: ITransactionRepository;
  private budgetRepository: IBudgetRepository;

  // External Services
  private notificationService: INotificationService;
  private currencyConversionService: ICurrencyConversionService;

  // Application Services
  private userService: UserService;
  private transactionService: TransactionService;
  private budgetService: BudgetService;
  private reportService: ReportService;

  // Controllers
  private userController: UserController;
  private transactionController: TransactionController;
  private budgetController: BudgetController;
  private reportController: ReportController;

  private constructor() {
    // Initialize Repositories
    this.userRepository = new InMemoryUserRepository();
    this.transactionRepository = new InMemoryTransactionRepository();
    this.budgetRepository = new InMemoryBudgetRepository();

    // Initialize External Services
    this.notificationService = new EmailNotificationAdapter();
    this.currencyConversionService = new MockCurrencyConversionAdapter();

    // Initialize Application Services
    this.userService = new UserService(this.userRepository);
    this.transactionService = new TransactionService(this.transactionRepository, this.userRepository);
    this.reportService = new ReportService(this.transactionRepository, this.userRepository);
    this.budgetService = new BudgetService(
      this.budgetRepository,
      this.transactionRepository,
      this.userRepository,
      this.notificationService
    );

    // Initialize Controllers
    this.userController = new UserController(this.userService);
    this.transactionController = new TransactionController(this.transactionService);
    this.budgetController = new BudgetController(this.budgetService);
    this.reportController = new ReportController(this.reportService);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getUserService(): UserService {
    return this.userService;
  }

  getTransactionService(): TransactionService {
    return this.transactionService;
  }

  getBudgetService(): BudgetService {
    return this.budgetService;
  }

  getReportService(): ReportService {
    return this.reportService;
  }

  getUserController(): UserController {
    return this.userController;
  }

  getTransactionController(): TransactionController {
    return this.transactionController;
  }

  getBudgetController(): BudgetController {
    return this.budgetController;
  }

  getReportController(): ReportController {
    return this.reportController;
  }
}