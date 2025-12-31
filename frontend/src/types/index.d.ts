export interface IBlog {
  _id: string
  title: string;
  blogURL: string;
  categories: string[];
  author: string;
  date: Date;
  content: string;
  updatedContent?: string;
  isUpdated?: boolean,
  references?: string[],
}

export interface BlogCard {
  title: string;
  content: string;
  categories: string[];
  author: string;
  date: Date;
}