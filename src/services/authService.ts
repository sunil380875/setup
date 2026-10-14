import { SelfResponse, SigninResponse } from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000/api/v1";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const authService = {
  async signin(email: string, password: string): Promise<SigninResponse> {
    const res = await fetch(`${API_BASE_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage =
        data.error || data.message || "Failed to sign in. Please try again.";
      throw new ApiError(errorMessage, res.status);
    }

    return data as SigninResponse;
  },

  async getSelf(token: string): Promise<SelfResponse> {
    const res = await fetch(`${API_BASE_URL}/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const errorMessage =
        data.error || data.message || "Unauthorized or failed to fetch user.";
      throw new ApiError(errorMessage, res.status);
    }

    return data as SelfResponse;
  },
};
