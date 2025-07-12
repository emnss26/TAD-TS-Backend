import axios from 'axios';
import env from '../../config/index';

/**
 * Payload for creating a new BIM 360/ACC user.
 */
export interface CreateUserPayload {
  email: string;
  company_id: string;
  nickname?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state_or_province?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  industry?: string;
  about_me?: string;
  default_role?: string;
}

/**
 * Creates a new user in the BIM 360 member directory.
 * @param accountId  ACC or BIM 360 account ID (UUID, without “b.” prefix)
 * @param token      Autodesk Forge access token
 * @param userData   Details of the user to create
 * @returns          The created user object
 * @throws           If required params are missing or the request fails
 */
export async function createUser(
  accountId: string,
  token: string,
  userData: CreateUserPayload
): Promise<any> {
  if (!token) {
    throw new Error('Token is required to create a new user');
  }
  if (!accountId) {
    throw new Error('AccountId is required to create a new user');
  }
  if (!userData.email) {
    throw new Error('Payload must include an email');
  }
  if (!userData.company_id) {
    throw new Error('Payload must include a company_id');
  }

  const url = `${env.AUTODESK_BASE_URL}/hq/v1/accounts/${accountId}/users`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.post(url, userData, { headers });
    return data;
  } catch (err: any) {
    console.error(
      'Error creating user:',
      err.response?.data || err.message
    );
    throw err;
  }
}