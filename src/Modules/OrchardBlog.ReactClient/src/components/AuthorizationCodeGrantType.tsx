import { useState, useEffect } from 'react';
import Configuration from './Configuration';

const AuthorizationCodeGrantType = () => {
  const [actionUrl, setActionUrl] = useState('');

  useEffect(() => {
    const parameters: Record<string, string> = {
      client_id: Configuration.CLIENT_ID as string,
      redirect_uri: Configuration.REDIRECT_URI as string,
      response_type: 'code',
      scope: 'offline_access' // set offline_access for getting refresh token in response body
    };

    // https://stackoverflow.com/a/44609277/1872200
    const actionUrl = new URL(Configuration.AUTHORIZATION_ENDPOINT as string);
    Object.keys(parameters).forEach(key => actionUrl.searchParams.append(key, parameters[key]));
    setActionUrl(actionUrl.toString());

  }, []);

  return (
    <div className='block-list-item'>
      <a href={actionUrl}>Get access token and refresh token with authorization code flow</a>
    </div>
  );
};

export default AuthorizationCodeGrantType;
