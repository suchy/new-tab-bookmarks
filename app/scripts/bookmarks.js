(function () {
  'use strict';

  var bookmarksFolderName = 'New Tab Screen';
  var bookmarksList = document.querySelector('.js-bookmarks-list');

  function createFolder (bookmarksFolderName, callback) {
    chrome.bookmarks.create({ title: bookmarksFolderName }, function (folder) {
      callback(folder);
    });
  }

  function getBookmarks (bookmarkFolderId, callback) {
    chrome.bookmarks.getChildren(bookmarkFolderId, function (bookmarks) {

      if (bookmarks) {
        bookmarks.forEach(function (bookmark) {
          callback(bookmark);
        });
      }
    });
  }

  function renderBookmark (bookmark) {
    var bookmarksListItem = document.createElement('li');

    var bookmarksListItemLink = document.createElement('a');
    bookmarksListItemLink.href = bookmark.url;
    bookmarksListItemLink.title = bookmark.title;

    var bookmarksListItemText = document.createTextNode(bookmark.title);

    bookmarksListItemLink.appendChild(bookmarksListItemText);
    bookmarksListItem.appendChild(bookmarksListItemLink);
    bookmarksList.appendChild(bookmarksListItem);
  }

  chrome.bookmarks.search({ title: bookmarksFolderName }, function (newTabBookmarksFolder) {

    if (newTabBookmarksFolder.length > 0) {
      getBookmarks(newTabBookmarksFolder[0].id, function (bookmark) {
        renderBookmark(bookmark);
      });
    } else {
      createFolder(bookmarksFolderName);
    }
  });
})();
