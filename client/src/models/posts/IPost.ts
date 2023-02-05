export interface IPost {
   id: number;
   title: string;
   desc: string;
   img?: string | null;
   cat: string;
   uid: number;
   createdAt?: string | null;
   updatedAt?: string | null;
}