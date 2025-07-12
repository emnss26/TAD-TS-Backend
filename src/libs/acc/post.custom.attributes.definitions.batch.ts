import axios from 'axios';
import env from '../../config';

/**
 * Batch-updates (or clears) custom attribute values on a file version.
 * @param projectId   The project identifier (UUID, without `b.` prefix)
 * @param versionId   The file version URN (URL-encoded)
 * @param token       Autodesk Forge access token (two- or three-legged)
 * @param attributes  Array of attribute updates, each with:
 *                    - id: string|number  The custom-attribute ID
 *                    - value: string|null The value to assign (null to clear)
 * @returns           The update results array
 * @throws            If required params are missing or the request fails
 */
export async function batchUpdateVersionCustomAttributes(
  projectId: string,
  versionId: string,
  token: string,
  attributes: Array<{ id: string | number; value: string | null }>
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to update custom attributes');
  }
  if (!projectId) {
    throw new Error('Project ID is required to update custom attributes');
  }
  if (!versionId) {
    throw new Error('Version ID is required to update custom attributes');
  }
  if (!Array.isArray(attributes) || attributes.length === 0) {
    throw new Error('At least one attribute update must be provided');
  }

  const url = `${env.AUTODESK_BASE_URL}/bim360/docs/v1/projects/${projectId}` +
              `/versions/${encodeURIComponent(versionId)}/custom-attributes:batch-update`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.post(url, attributes, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error batch-updating custom attributes:',
      error.response?.data || error.message
    );
    throw error;
  }
}