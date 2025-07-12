import axios from 'axios';
import env from '../../config/index';

/**
 * Retrieves all projects that a specific user participates in.
 * @param accountId  ACC or BIM 360 account ID (UUID, without “b.” prefix)
 * @param userId     ACC ID or Autodesk ID of the user
 * @param token      Autodesk Forge access token
 * @returns          The API response object containing pagination and project list
 * @throws           If accountId, userId, or token is missing, or the request fails
 */
export async function getUserProjects(
  accountId: string,
  userId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch user projects');
  }
  if (!accountId) {
    throw new Error('AccountId is required to fetch user projects');
  }
  if (!userId) {
    throw new Error('UserId is required to fetch user projects');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/admin/v1/accounts/${accountId}/users/${userId}/projects`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error fetching projects for user:',
      err.response?.data || err.message
    );
    throw err;
  }
}