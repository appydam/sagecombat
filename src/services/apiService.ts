import { FullCompetitionsApiResponse } from "@/types/competitions";
import { API_ENDPOINTS } from "@/constants/config";

let cachedData: FullCompetitionsApiResponse | null = null;
let ongoingRequest: Promise<FullCompetitionsApiResponse> | null = null;

export const fetchAllCompetitionsData = async (): Promise<FullCompetitionsApiResponse> => {
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  if (ongoingRequest) {
    return ongoingRequest;
  }

  ongoingRequest = fetch(API_ENDPOINTS.GET_ALL_COMP)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.code !== 200 || !data.data) {
        throw new Error("Invalid API response format");
      }
      cachedData = data;
      ongoingRequest = null;
      return data;
    })
    .catch(error => {
      ongoingRequest = null;
      console.error("Failed to fetch competitions data:", error);
      throw error;
    });

  return ongoingRequest;
};
