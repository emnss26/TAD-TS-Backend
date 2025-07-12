import axios from 'axios';
import env from '../../config';

/**
 * Retrieves all custom attribute definitions for documents in a specific folder.
 * @param projectId  The project identifier (UUID, without “b.” prefix)
 * @param folderId   The folder URN (URL-encoded)
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @returns          The raw custom-attribute-definitions response
 * @throws           If required params are missing or the request fails
 */
export async function getFolderCustomAttributeDefinitions(
  projectId: string,
  folderId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch custom attribute definitions');
  }
  if (!projectId) {
    throw new Error('Project ID is required to fetch custom attribute definitions');
  }
  if (!folderId) {
    throw new Error('Folder ID is required to fetch custom attribute definitions');
  }

  const url = `${env.AUTODESK_BASE_URL}/bim360/docs/v1/projects/${projectId}/folders/${encodeURIComponent(folderId)}/custom-attribute-definitions`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching custom attribute definitions:',
      error.response?.data || error.message
    );
    throw error;
  }
}