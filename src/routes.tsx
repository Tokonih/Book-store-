import { createBrowserRouter } from 'react-router-dom';
import UnauthenticatedLayout from './layouts/UnauthenticatedLayout';
import Dashboard from './pages/landing';
import BookDetail from './pages/landing/bookDetail';
import Author from './pages/landing/author';
import Profile from './pages/landing/profile';
import SearchResult from './pages/landing/searchResult';


export const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'details/:bookId', element: <BookDetail /> },
      { path: 'author/:authorId', element: <Author /> },
      { path: 'profile/:profileId', element: <Profile /> },
      { path: 'search', element: <SearchResult /> },
    ]
  },
  {
    path: '/auth',
    element: <UnauthenticatedLayout />,
    children: [
    ]
  }
]);
