import axios from 'axios';
import env from '../../config/index';

/**
 * Fetches all hubs visible to the given token.
 * @param token - Autodesk Forge access token
 * @returns the raw hubs response from the API
 * @throws if no token is provided or the request fails
 */
export async function getHubs(token: string): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch hubs');
  }

  const url = `${env.AUTODESK_BASE_URL}/project/v1/hubs`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching hubs:', err.response?.data || err.message);
    throw err;
  }
}