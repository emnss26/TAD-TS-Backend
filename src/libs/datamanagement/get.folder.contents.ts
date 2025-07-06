import axios from 'axios';
import env from '../../config/index';

/**
 * Fetches the contents of a folder within a project.
 * @param token - Autodesk Forge access token (two- or three-legged)
 * @param projectId - the project identifier
 * @param folderId - the folder identifier
 * @param params - optional query parameters for filtering and pagination
 * @returns the raw folder contents response
 */
export async function getFolderContents(
  token: string,
  projectId: string,
  folderId: string,
  params?: {
    filterType?: string[];
    filterId?: string[];
    filterExtensionType?: string[];
    filterLastModifiedTimeRollup?: string[];
    pageNumber?: number;
    pageLimit?: number;
    includeHidden?: boolean;
  }
): Promise<any> {
  if (!token) throw new Error('Token is required to fetch folder contents');
  const url = `${env.AUTODESK_BASE_URL}/data/v1/projects/${projectId}/folders/${folderId}/contents`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const query = new URLSearchParams();
  if (params) {
    params.filterType?.forEach(v => query.append('filter[type]', v));
    params.filterId?.forEach(v => query.append('filter[id]', v));
    params.filterExtensionType?.forEach(v => query.append('filter[extension.type]', v));
    params.filterLastModifiedTimeRollup?.forEach(v => query.append('filter[lastModifiedTimeRollup]', v));
    if (params.pageNumber !== undefined) query.append('page[number]', String(params.pageNumber));
    if (params.pageLimit !== undefined) query.append('page[limit]', String(params.pageLimit));
    if (params.includeHidden !== undefined) query.append('includeHidden', String(params.includeHidden));
  }
  try {
    const { data } = await axios.get(`${url}?${query.toString()}`, { headers });
    return data;
  } catch (err: any) {
    console.error('Error fetching folder contents:', err.response?.data || err.message);
    throw err;
  }
}