import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/http.ts

export const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.SITE_URL ?? "http://localhost:3000"
      : "",
  withCredentials: true,
})
