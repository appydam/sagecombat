import axios from 'axios';
import { Deposit, Withdrawal } from '@/types/transaction';

const API_BASE_URL = 'https://api.sagecombat.com';

// TODO: Replace with dynamic userId from auth context
const MOCK_USER_ID = Number(JSON.parse(localStorage.getItem("userId")));

export const fetchWithdrawalHistory = async (): Promise<Withdrawal[]> => {
  try {
    const response = await axios.post<{ code: number; data: Withdrawal[] }>(
      `${API_BASE_URL}/withdrawl-history`,
      {
        userId: MOCK_USER_ID,
      }
    );
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error('Failed to fetch withdrawal history');
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    // Returning empty array on error to prevent UI crash
    return [];
  }
};

export const fetchDepositHistory = async (): Promise<Deposit[]> => {
  try {
    const response = await axios.post<{ code: number; data: Deposit[] }>(
      `${API_BASE_URL}/deposit-history`,
      {
        userId: MOCK_USER_ID,
      }
    );
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error('Failed to fetch deposit history');
  } catch (error) {
    console.error('Error fetching deposit history:', error);
    // Returning empty array on error to prevent UI crash
    return [];
  }
};
