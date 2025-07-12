import axios from 'axios';
import env from '../../config';

/**
 * Retrieves a filtered list of users in a specific project.
 * @param projectId  The project identifier
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @param params     Optional query parameters for filtering, sorting, pagination, etc.
 * @returns          The raw project-users response
 * @throws           If token or projectId is missing, or the request fails
 */
export async function getProjectUsers(
  projectId: string,
  token: string,
  params?: Record<string, string | number>
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch project users');
  }
  if (!projectId) {
    throw new Error('Project ID is required to fetch project users');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/admin/v1/projects/${projectId}/users`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, {
      headers,
      params,
    });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching project users:',
      error.response?.data || error.message
    );
    throw error;
  }
}