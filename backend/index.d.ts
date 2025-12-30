export interface BlogData {
  title: string;
  blogURL: string;
  categories: string[];
  author: string;
  date: Date;
  content?: string;
  updatedContent?: string;
  isUpdated?: boolean,
  references?: string[],
}