import axios from 'axios';
import env from '../../config';

/**
 * Retrieves the issue attribute definitions for a given project.
 * @param projectId  The project identifier
 * @param token      Autodesk Forge access token (two- or three-legged)
 * @returns          The raw attribute definitions response
 * @throws           If token is missing or the request fails
 */
export async function getIssueAttributeDefinitions(
  projectId: string,
  token: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch issue attribute definitions');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/issues/v1/projects/${projectId}/issue-attribute-definitions`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching issue attribute definitions:',
      error.response?.data || error.message
    );
    throw error;
  }
}