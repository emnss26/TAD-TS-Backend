import axios from 'axios';
import env from '../../config/index';

/**
 * Retrieves metadata for a specific item.
 * @param token - Autodesk Forge access token
 * @param projectId - the project identifier
 * @param itemId - the item identifier
 * @param includePathInProject - whether to include the pathInProject attribute
 * @returns the raw item metadata response
 */
export async function getItem(
  token: string,
  projectId: string,
  itemId: string,
  includePathInProject?: boolean
): Promise<any> {
  if (!token) throw new Error('Token is required to fetch item metadata');
  const url = `${env.AUTODESK_BASE_URL}/data/v1/projects/${projectId}/items/${itemId}`;
  const headers = { Authorization: `Bearer ${token}` };
  const query = includePathInProject ? `?includePathInProject=true` : '';
  try {
    const { data } = await axios.get(`${url}${query}`, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching item metadata:', err.response?.data || err.message);
    throw err;
  }
}
