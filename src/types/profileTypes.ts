export interface ProfileResponse {
    success: boolean;
    data: {
      _id: string;
      name: string;
      email: string;
      profileImage: string | null;
      role: string; 
      readBooks:any; 
      __v: number;
      books: string[];
    };
  }
  
  
export interface ProfileState {
    loading: boolean;
    profile?: ProfileResponse["data"];
    error?: string;
  }
  
  export const initialState: ProfileState = {
    loading: false,
    profile: undefined,
    error: undefined,
  };