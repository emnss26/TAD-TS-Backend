import axios from 'axios';
import env from '../../config/index';

/**
 * Retrieves detailed information about a specific user in a project.
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @param projectId  The project identifier (UUID, without the `b.` prefix)
 * @param userId     The user identifier (ACC ID or Autodesk ID)
 * @returns          The user object on success, or `{ name: "User removed or unknown" }` if 404
 * @throws           On other HTTP errors or when `token` is missing
 */
export async function getUserByUserId(
  token: string,
  projectId: string,
  userId: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch user data');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/admin/v1/projects/${projectId}/users/${userId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    // If the user was removed or not found, return a friendly object
    if (err.response?.status === 404) {
      return { name: 'User removed or unknown' };
    }

    console.error(
      'Error fetching user by userId:',
      err.response?.data ?? err.message
    );
    throw err;
  }
}