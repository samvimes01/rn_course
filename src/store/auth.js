import { TRY_AUTH } from './actionTypes';

const tryAuth = authData => ({
  type: TRY_AUTH,
  authData
});

export default tryAuth;
