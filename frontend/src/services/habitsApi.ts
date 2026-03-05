import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface PlantTypeEnum {
  SUNFLOWER: string;
  ROSE: string;
  TULIP: string;
  SUCCULENT: string;
  HERB: string;
  TREE: string;
  CACTUS: string;
  DAISY: string;
  LAVENDER: string;
}

export interface PlantColorEnum {
  YELLOW: string;
  PINK: string;
  RED: string;
  WHITE: string;
  PURPLE: string;
  ORANGE: string;
  BLUE: string;
  GREEN: string;
}

export interface GrowthStageEnum {
  SEED: string;
  SPROUT: string;
  GROWING: string;
  BLOOMING: string;
  MATURE: string;
}

export interface Habit {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  plant_type: keyof PlantTypeEnum;
  plant_color: keyof PlantColorEnum;
  is_binary: boolean;
  quantity_target: number;
  growth_stage: keyof GrowthStageEnum;
  current_watering: number;
  last_watered_at: string | null;
  streak_count: number;
  is_shared: boolean;
  created_at: string;
}

export interface HabitCreate {
  name: string;
  description?: string;
  plant_type: keyof PlantTypeEnum;
  plant_color: keyof PlantColorEnum;
  is_binary: boolean;
  quantity_target: number;
}

export interface HabitUpdate {
  name?: string;
  description?: string;
  plant_type?: keyof PlantTypeEnum;
  plant_color?: keyof PlantColorEnum;
  is_binary?: boolean;
  quantity_target?: number;
  is_shared?: boolean;
}

export const habitsApi = {
  list: () => apiGet<Habit[]>('/habits'),
  
  get: (id: number) => apiGet<Habit>(`/habits/${id}`),
  
  create: (data: HabitCreate) => apiPost<Habit>('/habits', data),
  
  update: (id: number, data: HabitUpdate) => apiPut<Habit>(`/habits/${id}`, data),
  
  delete: (id: number) => apiDelete(`/habits/${id}`),
  
  water: (id: number, quantity: number = 1) => 
    apiPost<{ habit_id: number; quantity: number; new_watering_level: number; new_growth_stage: GrowthStageEnum; streak_count: number }>(
      `/habits/${id}/water`, 
      { quantity }
    ),
  
  getLogs: (id: number, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiGet<any[]>(`/habits/${id}/logs${query}`);
  },
};
