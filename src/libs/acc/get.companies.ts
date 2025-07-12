import axios from 'axios';
import env from '../../config';

/**
 * Retrieves a list of companies in the specified account.
 * @param accountId  The ACC account ID (UUID, without any “b.” prefix)
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @returns          The JSON response containing companies and pagination
 * @throws           If accountId or token is missing, or the request fails
 */
export async function getAccountCompanies(
  accountId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch account companies');
  }
  if (!accountId) {
    throw new Error('AccountId is required to fetch companies');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/admin/v1/accounts/${accountId}/companies`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error fetching account companies:',
      err.response?.data || err.message
    );
    throw err;
  }
}