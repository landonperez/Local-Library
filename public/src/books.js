function findById(items, id) {
  return items.find(item => item.id === id);
}

function findAuthorById(authors, id) {
  return findById(authors, id);
}

function findBookById(books, id) {
  return findById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .slice(0, 10)
    .map(borrow => {
      const account = findById(accounts, borrow.id);
      return { ...account, returned: borrow.returned };
    });
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
