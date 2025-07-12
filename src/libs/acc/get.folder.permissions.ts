import axios from 'axios';
import env from '../../config';

/**
 * Retrieves the permissions for a given folder in a BIM 360/ACC project.
 * @param projectId  The project identifier (UUID, without “b.” prefix)
 * @param folderId   The folder URN
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @returns          The raw permissions response
 * @throws           If required params are missing or the request fails
 */
export async function getFolderPermissions(
  projectId: string,
  folderId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch folder permissions');
  }
  if (!projectId) {
    throw new Error('Project ID is required to fetch folder permissions');
  }
  if (!folderId) {
    throw new Error('Folder ID is required to fetch folder permissions');
  }

  const url = `${env.AUTODESK_BASE_URL}/bim360/docs/v1/projects/${projectId}/folders/${encodeURIComponent(folderId)}/permissions`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching folder permissions:',
      error.response?.data || error.message
    );
    throw error;
  }
}