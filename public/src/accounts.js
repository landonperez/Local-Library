function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    const lastNameA = a.name.last.toLowerCase();
    const lastNameB = b.name.last.toLowerCase();
    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }
    return 0;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((total, book) => {
    const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
    return total + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books
    .filter(book => 
      book.borrows.some(borrow => borrow.id === accountId && !borrow.returned)
    )
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return {
        ...book,
        author,
      };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
