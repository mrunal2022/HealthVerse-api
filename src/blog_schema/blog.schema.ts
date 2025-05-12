import { Schema, Document } from "mongoose";

export const BlogSchema = new Schema(
    {
      id: { type: Number, required: true, unique:true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
      image: { type: String, required: true },
      categoryId: { type: Number, required: true },
    },
    { collection: 'blogs' }
  );
  
  export interface BlogDetails extends Document {
    id: number;
    title:string;
    desc: string;
    image: string;
    categoryId: number;
  }