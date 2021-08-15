
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

export const getExtension = async (provider: ExtensionEnum, account: string): Promise<[Error|null,HeatmapItem[]|null]> => {

  switch (provider) {
    case ExtensionEnum.GITHUB:
      return getGithubExtension(account);
  }

  // if we reached here, it's invalid enum, so error
  return [new Error(''), null];

}

export const getGithubExtension = async (username: string): Promise<[Error|null,HeatmapItem[]|null]> => {
  try {
    const requestBody = {
      extension: 'github',
      account: username
    };

    const resp = await apiClient.get<{response: HeatmapItem[]}>('/data', { data: requestBody});
    return [null, resp.data.response];
  } catch(err) {
    return [err, null]
  }
}

export const getGitlabExtension = async (username: string) => { }
