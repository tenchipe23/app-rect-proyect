import { create } from "zustand";
import { AlertConfig, AlertState } from "./alertTypes";

export const useAlertStore = create<AlertState>((set) => ({
    alert: null,
  
    show: (config) => {
      if (!config.message) {
        console.error("AlertService: No message provided");
        return;
      }
  
      const finalConfig: AlertConfig = {
        type: "success",
        duration: 2000,
        showCloseButton: true,
        ...config,
      };
  
      set({ alert: finalConfig });
  
      if (finalConfig.duration) {
        setTimeout(() => {
          set({ alert: null });
        }, finalConfig.duration);
      }
    },
  
    clear: () => set({ alert: null }),
  }));