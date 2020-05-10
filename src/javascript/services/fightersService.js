import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    try {
      return await callApi(`details/fighter/${id}.json`, 'GET');
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
