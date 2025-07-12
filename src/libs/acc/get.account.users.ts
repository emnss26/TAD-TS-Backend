import axios from 'axios';
import env from '../../config';

/**
 * Retrieves all users in a specific BIM 360/ACC account.
 * @param accountId  The ACC account ID (UUID, without any “b.” prefix)
 * @param token      Autodesk Forge access token (two-legged, app-only)
 * @param params     Optional query parameters: limit, offset, sort, field
 * @returns          An array of user objects
 * @throws           If accountId or token is missing, or the request fails
 */
export async function getAccountUsers(
  accountId: string,
  token: string,
  params?: {
    limit?: number;
    offset?: number;
    sort?: string;
    field?: string;
  }
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch account users');
  }
  if (!accountId) {
    throw new Error('AccountId is required to fetch account users');
  }

  const baseUrl = `${env.AUTODESK_BASE_URL}/hq/v1/accounts/${accountId}/users`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const qs = new URLSearchParams();
  if (params) {
    if (params.limit !== undefined)  qs.append('limit',  String(params.limit));
    if (params.offset !== undefined) qs.append('offset', String(params.offset));
    if (params.sort)                 qs.append('sort',   params.sort);
    if (params.field)                qs.append('field',  params.field);
  }

  const url = qs.toString() ? `${baseUrl}?${qs}` : baseUrl;

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error fetching account users:',
      err.response?.data || err.message
    );
    throw err;
  }
}