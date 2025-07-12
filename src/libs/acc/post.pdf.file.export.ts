import axios from 'axios';
import env from '../../config';

export interface ExportOptions {
  outputFileName?: string;
  standardMarkups?: {
    includePublishedMarkups: boolean;
    includeUnpublishedMarkups: boolean;
    includeMarkupLinks: boolean;
  };
  issueMarkups?: {
    includePublishedMarkups: boolean;
    includeUnpublishedMarkups: boolean;
  };
  photoMarkups?: {
    includePublishedMarkups: boolean;
    includeUnpublishedMarkups: boolean;
  };
}

/**
 * Creates a PDF export job for one or more file versions in a project.
 * @param projectId     The project identifier (UUID, with or without "b." prefix)
 * @param token         Autodesk Forge access token (two- or three-legged)
 * @param fileVersions  Array of file version URNs to export (max 200)
 * @param options       Optional export settings (markups, output name, etc.)
 * @returns             The export job response containing an export ID and status
 * @throws              If required params are missing or the request fails
 */
export async function exportProjectFiles(
  projectId: string,
  token: string,
  fileVersions: string[],
  options?: ExportOptions
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to create export job');
  }
  if (!projectId) {
    throw new Error('Project ID is required to create export job');
  }
  if (!fileVersions || fileVersions.length === 0) {
    throw new Error('At least one file version URN is required');
  }

  const url = `${env.AUTODESK_BASE_URL}/construction/files/v1/projects/${projectId}/exports`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const body = {
    fileVersions,
    ...(options ? { options } : {}),
  };

  try {
    const { data } = await axios.post(url, body, { headers });
    return data;
  } catch (error: any) {
    console.error(
      'Error creating project export job:',
      error.response?.data || error.message
    );
    throw error;
  }
}