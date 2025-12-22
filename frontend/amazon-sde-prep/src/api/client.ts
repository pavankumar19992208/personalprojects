// const API_URL = "https://0cf0ba48788f.ngrok-free.app/api/v1";
// const API_URL = "http://localhost:8000/api/v1";
const API_URL = "https://3.81.28.220.nip.io/api/sde1prep/api/v1";
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    email: string;
    name: string;
    target_date: string;
    experience_level: string;
  };
}

export const api = {
  async login(email: string, password: string): Promise<AuthResponse> {
    // CHANGED: Pointing to /auth/login and sending JSON
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    return response.json();
  },

  async register(
    email: string,
    password: string,
    name: string,
    targetDate: string,
    experienceLevel: string
  ): Promise<AuthResponse> {
    // CHANGED: Pointing to /auth/register
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        target_date: targetDate,
        experience_level: experienceLevel,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Registration failed");
    }

    return response.json();
  },
  async syncProgress(topicId: string, completed: boolean) {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/progress/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topic_id: topicId, completed }),
    });
  },

  async syncBookmark(topicId: string, pageIndex: number) {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/progress/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topic_id: topicId, page_index: pageIndex }),
    });
  },
};
