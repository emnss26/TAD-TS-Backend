import axios from 'axios';
import env from '../../config/index';

export async function getSubmittalSpecDefinitions(
  token: string,
  projectId: string
): Promise<any> {
  if (!token) {
    throw new Error('Token is required');
  }
  const url = `${env.AUTODESK_BASE_URL}/construction/issues/v1/projects/${projectId}/issue-attribute-definitions`;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (err: any) {
    // P. ej. si no hay definiciones, devolvemos un array vacío
    if (err.response?.status === 404) {
      return { results: [] };
    }
    // en cualquier otro caso, que lo maneje el errorHandler
    console.error('Error fetching Issue Attributes:', err.response?.data || err.message);
    throw err;
  }
}