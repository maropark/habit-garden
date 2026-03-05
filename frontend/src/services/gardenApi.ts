import { apiGet } from './api';
import { Habit, GrowthStageEnum } from './habitsApi';

export interface GardenDay {
  date: string;
  habits: Habit[];
  has_watered_today: boolean;
}

export interface GardenResponse {
  user_id: number;
  month: number;
  year: number;
  days: GardenDay[];
}

export interface TodayHabit {
  id: number;
  name: string;
  plant_type: string;
  plant_color: string;
  growth_stage: string;
  is_watered: boolean;
  is_thirsty: boolean;
  streak: number;
  is_binary: boolean;
}

export interface TodayResponse {
  date: string;
  habits: TodayHabit[];
}

export const gardenApi = {
  getMonth: (month?: number, year?: number) => {
    const params = new URLSearchParams();
    if (month) params.append('month', String(month));
    if (year) params.append('year', String(year));
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiGet<GardenResponse>(`/garden${query}`);
  },
  
  getToday: () => apiGet<TodayResponse>('/garden/today'),
};
