import readline from 'readline';
import { Container } from '../backend/Container.ts';

const container = Container.getInstance();
const userController = container.getUserController();
const transactionController = container.getTransactionController();
const budgetController = container.getBudgetController();
const reportController = container.getReportController();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function mainMenu() {
  console.log('\n=== Personal Finance Tracker (Console Mode) ===');
  console.log('1. Create User');
  console.log('2. List Users');
  console.log('3. Add Transaction');
  console.log('4. List Transactions for User');
  console.log('5. Set Budget');
  console.log('6. Check Budget Status');
  console.log('7. Generate Monthly Summary');
  console.log('8. Generate Category Summary');
  console.log('9. Exit');

  const choice = await question('Choose an option (1-9): ');
  switch (choice.trim()) {
    case '1':
      await handleCreateUser();
      break;
    case '2':
      await handleListUsers();
      break;
    case '3':
      await handleAddTransaction();
      break;
    case '4':
      await handleListTransactions();
      break;
    case '5':
      await handleSetBudget();
      break;
    case '6':
      await handleCheckBudget();
      break;
    case '7':
      await handleMonthlySummary();
      break;
    case '8':
      await handleCategorySummary();
      break;
    case '9':
      console.log('Goodbye!');
      rl.close();
      process.exit(0);
    default:
      console.log('Invalid choice. Please select from 1 to 9.');
  }

  await mainMenu();
}

async function handleCreateUser() {
  const name = await question('Enter user name: ');
  const email = await question('Enter user email: ');

  try {
    const user = await userController.createUser(name.trim(), email.trim());
    console.log('User created:', user.getId(), user.getName(), user.getEmail());
  } catch (error: any) {
    console.error('Error creating user:', error.message || error);
  }
}

async function handleListUsers() {
  const users = await userController.getAllUsers();
  if (users.length === 0) {
    console.log('No users found.');
    return;
  }

  console.log('\nRegistered users:');
  users.forEach((user: any) => {
    console.log(`- ${user.getId()} | ${user.getName()} | ${user.getEmail()}`);
  });
}

async function handleAddTransaction() {
  const userId = await question('Enter user ID: ');
  const type = await question('Enter type (INCOME/EXPENSE): ');
  const amountText = await question('Enter amount: ');
  const category = await question('Enter category: ');
  const description = await question('Enter description: ');
  const dateText = await question('Enter date (YYYY-MM-DD): ');

  const amount = Number(amountText);
  const date = new Date(dateText);

  try {
    const tx = await transactionController.addTransaction(
      userId.trim(),
      type.trim().toUpperCase() as any,
      amount,
      category.trim(),
      description.trim(),
      date
    );
    console.log('Transaction added:', tx.getId(), tx.getType(), tx.getAmount().getAmount());
  } catch (error: any) {
    console.error('Error adding transaction:', error.message || error);
  }
}

async function handleListTransactions() {
  const userId = await question('Enter user ID: ');

  try {
    const transactions = await transactionController.getTransactionsByUserId(userId.trim());
    if (transactions.length === 0) {
      console.log('No transactions found.');
      return;
    }

    console.log('\nTransactions:');
    for (const tx of transactions) {
      console.log(`- ${tx.getId()} | ${tx.getType()} | ${tx.getAmount().getAmount()} | ${tx.getCategory()} | ${tx.getDescription()} | ${tx.getDate().toISOString().slice(0, 10)}`);
    }
  } catch (error: any) {
    console.error('Error listing transactions:', error.message || error);
  }
}

async function handleSetBudget() {
  const userId = await question('Enter user ID: ');
  const category = await question('Enter category: ');
  const limitText = await question('Enter limit amount: ');
  const month = await question('Enter month (YYYY-MM): ');

  const limitAmount = Number(limitText);

  try {
    const budget = await budgetController.setBudget(userId.trim(), category.trim(), limitAmount, month.trim());
    console.log('Budget created:', budget.getId(), budget.getCategory(), budget.getLimit().getAmount());
  } catch (error: any) {
    console.error('Error setting budget:', error.message || error);
  }
}

async function handleCheckBudget() {
  const userId = await question('Enter user ID: ');
  const category = await question('Enter category: ');
  const month = await question('Enter month (YYYY-MM): ');

  try {
    const status = await budgetController.checkBudgetStatus(userId.trim(), category.trim(), month.trim());
    console.log(`Budget status: exceeded=${status.isExceeded}, spent=${status.spent}, limit=${status.limit}, remaining=${status.remaining}`);
  } catch (error: any) {
    console.error('Error checking budget:', error.message || error);
  }
}

async function handleMonthlySummary() {
  const userId = await question('Enter user ID: ');
  const month = await question('Enter month (YYYY-MM): ');

  try {
    const summary = await reportController.generateMonthlySummary(userId.trim(), month.trim());
    console.log(`Monthly summary (${month}): income=${summary.totalIncome}, expense=${summary.totalExpense}, savings=${summary.savings}, txCount=${summary.transactionCount}`);
  } catch (error: any) {
    console.error('Error generating monthly summary:', error.message || error);
  }
}

async function handleCategorySummary() {
  const userId = await question('Enter user ID: ');
  const month = await question('Enter month (YYYY-MM): ');

  try {
    const summary = await reportController.generateCategorySummary(userId.trim(), month.trim());
    console.log(`Category summary (${month}):`);
    for (const [category, data] of Object.entries(summary) as [string, { income: number; expense: number; total: number }][]) {
      console.log(`- ${category}: income=${data.income}, expense=${data.expense}, total=${data.total}`);
    }
  } catch (error: any) {
    console.error('Error generating category summary:', error.message || error);
  }
}

(async () => {
  console.log('Starting Personal Finance Tracker in console mode...');
  await mainMenu();
})();
