// In the original design:
// Book has domain responsibilities:
// getTitle()
// getAuthor()
// turnPage()
// getCurrentPage()
// getLocation()

// But it also has infrastructure responsibilities:
// save() → handles persistence (file system).

// That means the class has two reasons to change:
// If the book domain logic changes (e.g., new page navigation rules).
// If the storage mechanism changes (e.g., save to DB instead of file).


//Refractored Design:
// Book.ts
class Book {
  getTitle() {}
  getAuthor() {}
  turnPage() {}
  getCurrentPage() {}
  getLocation() {}
}

// BookRepository.ts
class BookRepository {
  save(book: Book) {}
  load(id: string) {}
}

// Printer.ts
interface Printer {
  printPage(page: string): void;
}

class PlainTextPrinter implements Printer {
  printPage(page: string) {}
}

class HtmlPrinter implements Printer {
  printPage(page: string) {}
}
