import axios from 'axios';
import env from '../../config/index';

/**
 * Fetches metadata for a single project.
 * @param token - Autodesk Forge access token
 * @param accountId - the hub (account) identifier
 * @param projectId - the project identifier
 * @returns the raw project data response from the API
 * @throws if no token is provided or the request fails
 */
export async function getProjectData(
  token: string,
  accountId: string,
  projectId: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch project data');
  }

  const url = `${env.AUTODESK_BASE_URL}/project/v1/hubs/${accountId}/projects/${projectId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching project data:', err.response?.data || err.message);
    throw err;
  }
}