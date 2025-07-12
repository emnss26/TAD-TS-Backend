import axios from 'axios';
import env from '../../config';

/**
 * Adds a custom attribute definition to a folder.
 * @param projectId    The project identifier (UUID, without `b.` prefix)
 * @param folderId     The folder URN (URL-encoded)
 * @param token        Autodesk Forge access token (two- or three-legged)
 * @param definition   The custom attribute definition:
 *                     - name: unique name within the folder
 *                     - type: "string" | "date" | "array"
 *                     - arrayValues: drop-list values (required if type is "array")
 * @returns            The created attribute definition
 * @throws             If required params are missing or the request fails
 */
export async function addFolderCustomAttributeDefinition(
  projectId: string,
  folderId: string,
  token: string,
  definition: {
    name: string;
    type: 'string' | 'date' | 'array';
    arrayValues?: string[];
  }
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to add a custom attribute definition');
  }
  if (!projectId) {
    throw new Error('Project ID is required to add a custom attribute definition');
  }
  if (!folderId) {
    throw new Error('Folder ID is required to add a custom attribute definition');
  }

  const url = `${env.AUTODESK_BASE_URL}/bim360/docs/v1/projects/${projectId}/folders/${encodeURIComponent(folderId)}/custom-attribute-definitions`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.post(url, definition, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error adding custom attribute definition:',
      error.response?.data || error.message
    );
    throw error;
  }
}