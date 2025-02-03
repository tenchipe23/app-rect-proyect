export interface AlertConfig {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    duration?: number;
    showCloseButton?: boolean;
  }
  
  export interface AlertState {
    alert: AlertConfig | null;
    show: (config: AlertConfig) => void;
    clear: () => void;
  }