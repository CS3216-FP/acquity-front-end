const responseType = 'code';
const clientId = '86awajx9exc3d8';
const redirectUri = 'http://localhost:3000/auth/callback';
const scope =
  'r_liteprofile%20r_emailaddress%20w_member_social%20r_basicprofile';
const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
export default { url };
