const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://next-mag.now.sh'
    : 'http://localhost:3000';

export default baseUrl;
