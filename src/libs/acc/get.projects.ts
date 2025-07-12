import axios from 'axios';
import env from '../../config';

/**
 * Retrieves all projects in the given account.
 * @param accountId  The ACC account ID (UUID, without any “b.” prefix)
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @returns          The JSON response containing projects and pagination
 * @throws           If accountId or token is missing, or the request fails
 */
export async function getAccountProjects(
  accountId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch account projects');
  }
  if (!accountId) {
    throw new Error('AccountId is required to fetch projects');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/admin/v1/accounts/${accountId}/projects`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error fetching account projects:',
      err.response?.data || err.message
    );
    throw err;
  }
}