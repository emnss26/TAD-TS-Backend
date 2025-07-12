import axios from 'axios';
import env from '../../config';

/**
 * Retrieves the list of sheets for a given project, with optional filtering.
 * @param projectId  The project identifier (UUID, without `b.` prefix)
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @param params     Optional query parameters (e.g. currentOnly, filter[versionSetId], limit, offset, etc.)
 * @returns          The raw sheets response
 * @throws           If token or projectId is missing, or the request fails
 */
export async function getProjectSheets(
  projectId: string,
  token: string,
  params?: Record<string, any>
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch project sheets');
  }
  if (!projectId) {
    throw new Error('Project ID is required to fetch project sheets');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/sheets/v1/projects/${projectId}/sheets`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers, params });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching project sheets:',
      error.response?.data || error.message
    );
    throw error;
  }
}