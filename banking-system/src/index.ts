import { BankingSystem } from "./services/BankingSystem.js";
import { Customer } from "./models/Customer.js";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const bank = new BankingSystem();

// Test Customer
const customer = new Customer("C001", "Himanshu");
bank.addCustomer(customer);

//Test Account
const account1 = bank.openAccount("C001", "A1001");

function ask(question: string, callback: (answer: string) => void) {
  rl.question(question, (answer: string) => callback(answer));
}

function showMenu() {
  console.log("\n--- Banking Menu ---");
  console.log("1. Deposit");
  console.log("2. Withdraw");
  console.log("3. Transfer");
  console.log("4. Apply Loan");
  console.log("5. Check Balance");
  console.log("6. Exit");

  ask("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        ask("Enter amount to deposit: ", (amt) => {
          try {
            const amount = Number(amt);
            bank.deposit(account1.accountNumber, amount);
            console.log(`Deposited ${amount}. New balance: ${bank.getBalance(account1.accountNumber)}`);
          } catch (e: any) {
            console.log("Error:", e.message);
          }
          showMenu();
        });
        break;

      case "2":
        ask("Enter amount to withdraw: ", (amt) => {
          try {
            const amount = Number(amt);
            bank.withdraw(account1.accountNumber, amount);
            console.log(`Withdrawn ${amount}. New balance: ${bank.getBalance(account1.accountNumber)}`);
          } catch (e: any) {
            console.log("Error:", e.message);
          }
          showMenu();
        });
        break;

      case "3":
        ask("Enter target account number: ", (accNum) => {
          const targetAccount = bank.openAccount("C001", accNum);
          ask("Enter amount to transfer: ", (amt) => {
            try {
              const amount = Number(amt);
              bank.transfer(account1.accountNumber, targetAccount.accountNumber, amount);
              console.log(`Transferred ${amount}. Source balance: ${bank.getBalance(account1.accountNumber)}, Target balance: ${bank.getBalance(targetAccount.accountNumber)}`);
            } catch (e: any) {
              console.log("Error:", e.message);
            }
            showMenu();
          });
        });
        break;

      case "4":
        ask("Enter loan ID: ", (loanId) => {
          ask("Enter principal: ", (principal) => {
            ask("Enter interest rate: ", (rate) => {
              ask("Enter term (years): ", (term) => {
                const loan = bank.applyLoan("C001", loanId, Number(principal), Number(rate), Number(term));
                console.log(`Loan applied. Total repayment: ${bank.calculateLoanRepayment(loan)}`);
                showMenu();
              });
            });
          });
        });
        break;

      case "5":
        console.log(`Account Balance: ${account1.balance}`);
        showMenu();
        break;

      case "6":
        console.log("Thank you for banking with us!");
        rl.close();
        break;

      default:
        console.log("Invalid choice. Try again.");
        showMenu();
    }
  });
}

console.log(`Welcome ${customer.name}! Your customer ID is ${customer.id}.`);
showMenu();

