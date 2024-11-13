
export interface Book {
    _id: string;
    title: string;
    genre: string;
    author: string;
    ratings: number;
    reviews: string[]; 
  }
  
  export interface AuthorData {
    _id: string;
    name: string;
    email: string;
    profileImage: string | null;
    role: string;
    readBooks: string[];
    __v: number;
    books: Book[]; 
  }
  
  export interface AuthorResponse {
    success: boolean;
    data: AuthorData;
    loading?: boolean;
    error?: string | null;
  }
  