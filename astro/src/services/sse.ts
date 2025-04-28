import api from "./api";
import { authService } from "./auth";

class SSEService {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;

  private async getValidToken(): Promise<string> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        const { accessToken } = await authService.refresh();
        return accessToken;
      }
      return token;
    } catch (error) {
      console.error("Failed to get valid token:", error);
      throw error;
    }
  }

  connect(onMessage: (data: any) => void) {
    this.disconnect();

    const connectWithToken = async () => {
      try {
        const token = await this.getValidToken();
        const url = new URL(`${api.defaults.baseURL}/projects/updates`);
        url.searchParams.append("token", token);

        this.eventSource = new EventSource(url.toString()); // Remove withCredentials for cross-origin

        this.eventSource.onmessage = (event) => {
          try {
            const parsed = JSON.parse(event.data);

            // Handle heartbeat messages differently
            if (parsed.type === "heartbeat") {
              console.log("Heartbeat received");
              this.reconnectAttempts = 0; // Reset reconnect counter on successful heartbeat
              return;
            }

            onMessage(parsed);
          } catch (error) {
            console.error("Error parsing SSE message:", error, event.data);
          }
        };

        this.eventSource.onopen = () => {
          console.log("SSE connection established");
          this.reconnectAttempts = 0;
        };

        this.eventSource.onerror = async (error) => {
          console.error("SSE Error:", error);
          console.error("ReadyState:", this.eventSource?.readyState);

          // Close the current connection
          this.eventSource?.close();
          this.eventSource = null;

          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(
              `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`,
            );
            setTimeout(() => {
              connectWithToken();
            }, this.reconnectTimeout * this.reconnectAttempts);
          } else {
            console.error("Max reconnect attempts reached, giving up");
            this.disconnect();
          }
        };
      } catch (error) {
        console.error("Failed to connect to SSE:", error);
        this.disconnect();
      }
    };

    void connectWithToken();
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.reconnectAttempts = 0;
  }
}

export const sseService = new SSEService();
