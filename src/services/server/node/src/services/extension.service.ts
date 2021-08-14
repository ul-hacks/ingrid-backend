
import axios from 'axios';

import { HeatmapItem } from '../types/user.types';

export const enum ExtensionEnum {
  GITHUB = 'github',
  GITLAB = 'gitlab'
}

const apiClient = axios.create({
  baseURL: '',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getExtension = async (provider: ExtensionEnum, account: string) => {

  switch (provider) {
    case ExtensionEnum.GITHUB:
      return getGithubExtension(account);
  }

  // if we reached here, it's invalid enum, so error

}

export const getGithubExtension = async (username: string) => { 
  
}

export const getGitlabExtension = async (username: string) => { }
