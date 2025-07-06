import axios from 'axios';
import env from '../../config/index';

/**
 * Retrieves the list of versions for a specific item.
 * @param token - Autodesk Forge access token
 * @param projectId - the project identifier
 * @param itemId - the item identifier
 * @returns the raw versions list response
 */
export async function getItemVersions(
  token: string,
  projectId: string,
  itemId: string
): Promise<any> {
  if (!token) throw new Error('Token is required to fetch item versions');
  const url = `${env.AUTODESK_BASE_URL}/data/v1/projects/${projectId}/items/${itemId}/versions`;
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching item versions:', err.response?.data || err.message);
    throw err;
  }
}
