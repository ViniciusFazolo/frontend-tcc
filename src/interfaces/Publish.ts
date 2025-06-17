// src/interfaces/Publish.ts
import { User } from "./User";
import { Album } from "./Album";
import { Commentary } from "./Commentary";

export interface Publish {
  id: string;
  description: string;
  whenSent: string; 
  images: string[];
  author: User;
  commentaries: Commentary[];
  album: Album;
}

export interface CreatePublishRequest {
  description: string;
  albumId: string;
}