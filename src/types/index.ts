export interface AccountState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface CreateBook{
  title:string;
  description:string;
  author:string;
  images:string;
}


export interface UserLoginData {
  email: string;
  password: string;
}

export interface ApiResponse {
  token: string;
  [key: string]: any;
}

// export interface ApiResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
// }


export interface BookState {
  success: boolean;
  page: number;
  totalPages: number;
  totalBooks: number;
  books: BookData[];
  loading: boolean;
  error: string | null;
}

export interface singleBookState {
  success: boolean;
  book: {
    _id:any;
    title: string;
    images?: string;
    author?: {
      _id:string;
      name:string
    };
    ratings?: number;
    description?: string; 
    publishedDate?:string
    reviews?:Array<{
      user:{
        _id:string,
        name:string,
        email:string
      },
      comment:string,
      rating:number
    }>
  };
  loading: boolean;
  error: string | null;
}

export interface BookData {
  loading: boolean;
  success?: boolean;
  error?: boolean;
  page: number;
  totalPages: number;
  totalBooks: number;
  books: BookData[];
}

export interface Book {
  _id: string;
  title: string;
  author: { name: string};
  images: string;
  ratings: number;
}


export interface CreateBook{
  title: string;
  description:string;
  author:string;
  images: string;
  success: boolean,
}

export interface BooksResponse {
  books: Book[];
  totalPages: number;
}


export interface MarkReadData {
  bookId: any;
}

