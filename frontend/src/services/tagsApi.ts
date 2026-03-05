import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface Tag {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
}

export const tagsApi = {
  list: () => apiGet<Tag[]>('/tags'),
  
  create: (name: string) => apiPost<Tag>('/tags', { name }),
  
  update: (id: number, name: string) => apiPut<Tag>(`/tags/${id}`, { name }),
  
  delete: (id: number) => apiDelete(`/tags/${id}`),
  
  tagHabit: (tagId: number, habitId: number) => 
    apiPost<void>(`/tags/${tagId}/habits/${habitId}`),
  
  untagHabit: (tagId: number, habitId: number) => 
    apiDelete(`/tags/${tagId}/habits/${habitId}`),
};
