
import axios from 'axios';

import { PROVIDER_API_URL } from '../config';
import { HeatmapItem, ExtensionEnum } from '../types/user.types';

const apiClient = axios.create({
  baseURL: PROVIDER_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getExtension = async (provider: ExtensionEnum, account: string): Promise<HeatmapItem[]> => {

  switch (provider) {
    case ExtensionEnum.GITHUB:
      return getGithubExtension(account);
  }

  // if we reached here, it's invalid enum, so error
  return [];

}

export const getGithubExtension = async (username: string) => { 
  try {
    const resp = await apiClient.get<HeatmapItem[]>('/github', { params: { username } });
    return resp.data;
  } catch(err) {
    throw err;
  }
}

export const getGitlabExtension = async (username: string) => { }
