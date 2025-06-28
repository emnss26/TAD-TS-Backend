import axios from 'axios';
import env from '../../config/index';

/**
 * Fetches all projects under the specified hub.
 * @param token - Autodesk Forge access token
 * @param hubId - the hub identifier
 * @returns the raw projects response from the API
 * @throws if no token is provided or the request fails
 */
export async function getProjects(token: string, hubId: string): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch projects');
  }

  const url = `${env.AUTODESK_BASE_URL}/project/v1/hubs/${hubId}/projects`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching projects:', err.response?.data || err.message);
    throw err;
  }
}