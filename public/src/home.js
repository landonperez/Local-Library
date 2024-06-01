function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    if (!book.borrows[0].returned) {
      count++;
    }
    return count;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const sortedGenres = Object.entries(genreCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count]) => ({ name, count }));

    return sortedGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }));

  popularBooks.sort((a, b) => b.count - a.count);

  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    authorBorrowCounts[authorName] = (authorBorrowCounts[authorName] || 0) + book.borrows.length;
  });

  const popularAuthors = Object.entries(authorBorrowCounts)
    .map(([name, count]) => ({ name, count }));

    popularAuthors.sort((a, b) => b.count - a.count);

    return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
