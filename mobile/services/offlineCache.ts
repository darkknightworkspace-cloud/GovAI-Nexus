/**
 * GovAI Nexus Mobile - Offline Caching Utility
 * Stores government service directories and citizen applications locally
 * for instant rendering and offline access in rural areas.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  SERVICES: '@govai_services_cache',
  OFFLINE_DRAFTS: '@govai_offline_drafts',
  USER_PROFILE: '@govai_user_profile',
  NOTIFICATIONS: '@govai_notifications'
};

export const offlineCache = {
  async saveServices(services: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CACHE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Failed to cache services:', e);
    }
  },

  async getServices(): Promise<any[] | null> {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEYS.SERVICES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  async saveDraftApplication(draft: any): Promise<void> {
    try {
      const existing = await this.getDraftApplications();
      const updated = [draft, ...existing.filter((d: any) => d.id !== draft.id)];
      await AsyncStorage.setItem(CACHE_KEYS.OFFLINE_DRAFTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save offline draft:', e);
    }
  },

  async getDraftApplications(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEYS.OFFLINE_DRAFTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
};
