// Domain logic: terminateEmployee(), isWorking().
// Persistence: saveEmployeeToDatabase().
// Reporting/Export: printEmployeeDetailReportXML(), printEmployeeDetailReportCSV().

// That means the class has three reasons to change:
// If employee rules change (domain).
// If database persistence changes.
// If reporting/export format changes.

//Refactored Design:
// Employee.ts
class Employee {
  terminateEmployee() {}
  isWorking() {}
}

// EmployeeRepository.ts
class EmployeeRepository {
  saveEmployeeToDatabase(employee: Employee) {}
  deleteEmployee(employee: Employee) {}
}

// EmployeeReport.ts
class EmployeeReport {
  printEmployeeDetailReportXML(employee: Employee) {}
  printEmployeeDetailReportCSV(employee: Employee) {}
}

