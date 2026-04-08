// Gestionnaire de stockage offline pour YAKO Africa
export interface OfflineData {
  product?: string;
  formData?: any;
  qualification?: any;
  proposition?: any;
  validation?: any;
  timestamp: string;
  synced: boolean;
}

export const offlineStorage = {
  save: (key: string, data: any) => {
    try {
      const offlineData: OfflineData = {
        ...data,
        timestamp: new Date().toISOString(),
        synced: false
      };
      localStorage.setItem(`yako_offline_${key}`, JSON.stringify(offlineData));
      return true;
    } catch (error) {
      console.error('Erreur de sauvegarde offline:', error);
      return false;
    }
  },

  get: (key: string): OfflineData | null => {
    try {
      const data = localStorage.getItem(`yako_offline_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erreur de lecture offline:', error);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(`yako_offline_${key}`);
      return true;
    } catch (error) {
      console.error('Erreur de suppression offline:', error);
      return false;
    }
  },

  markAsSynced: (key: string) => {
    try {
      const data = offlineStorage.get(key);
      if (data) {
        data.synced = true;
        localStorage.setItem(`yako_offline_${key}`, JSON.stringify(data));
      }
      return true;
    } catch (error) {
      console.error('Erreur de mise à jour sync:', error);
      return false;
    }
  },

  getPendingSync: (): string[] => {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('yako_offline_')) {
          const data = offlineStorage.get(key.replace('yako_offline_', ''));
          if (data && !data.synced) {
            keys.push(key);
          }
        }
      }
      return keys;
    } catch (error) {
      console.error('Erreur de récupération des données à synchroniser:', error);
      return [];
    }
  }
};
