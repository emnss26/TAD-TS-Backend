import axios from 'axios';
import env from '../../config';

/**
 * Retrieves all partner companies in a specific BIM 360/ACC project.
 * @param accountId   The ACC account ID (UUID, without any “b.” prefix)
 * @param projectId   The project ID (UUID, without any “b.” prefix)
 * @param token       Autodesk Forge access token (two-legged, app-only)
 * @param params      Optional query parameters: limit, offset, sort, fields
 * @returns           An array of company objects
 * @throws            If accountId, projectId or token is missing, or the request fails
 */
export async function getProjectCompanies(
  accountId: string,
  projectId: string,
  token: string,
  params?: {
    limit?: number;
    offset?: number;
    sort?: string;
    fields?: string;
  }
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch project companies');
  }
  if (!accountId) {
    throw new Error('AccountId is required to fetch project companies');
  }
  if (!projectId) {
    throw new Error('ProjectId is required to fetch project companies');
  }

  const baseUrl = `${env.AUTODESK_BASE_URL}/hq/v1/accounts/${accountId}/projects/${projectId}/companies`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const qs = new URLSearchParams();
  if (params) {
    if (params.limit !== undefined)   qs.append('limit',  String(params.limit));
    if (params.offset !== undefined)  qs.append('offset', String(params.offset));
    if (params.sort)                  qs.append('sort',   params.sort);
    if (params.fields)                qs.append('field',  params.fields);
  }

  const url = qs.toString() ? `${baseUrl}?${qs}` : baseUrl;

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error fetching project companies:',
      err.response?.data || err.message
    );
    throw err;
  }
}