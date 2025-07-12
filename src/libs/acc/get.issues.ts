import axios from 'axios';
import env from '../../config';

/**
 * Retrieves all issues in a project, including comments and attachments.
 * @param projectId  The project identifier (UUID, without `b.` prefix)
 * @param token      Autodesk Forge access token (three-legged)
 * @param region     Optional region header for routing ("US" or "EMEA")
 * @returns          The raw issues response (with pagination and results)
 * @throws           If required params are missing or the request fails
 */
export async function getProjectIssues(
  projectId: string,
  token: string,
  region?: 'US' | 'EMEA'
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to fetch project issues');
  }
  if (!projectId) {
    throw new Error('Project ID is required to fetch project issues');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/issues/v1/projects/${projectId}/issues`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  if (region) {
    headers['x-ads-region'] = region;
  }

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error fetching project issues:',
      error.response?.data || error.message
    );
    throw error;
  }
}