module.exports = {
  env: {
    URL: 'http:/localhost:3000',
    FRC_SECRET: 'A1E46NN3FVM9DUOJ33O3LMDJTC8ILNS6B09F379RJE02DOPRUNO01HTRU0',
    FRC_SITE: 'FCMUR3O5H3ANK77F',
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*',
      },
      {
        source: '/verify',
        destination: 'https://api.friendlycaptcha.com/api/v1/siteverify'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/r/:site',
        destination: 'https://app-tickit.vercel.app/report/:site',
        permanent: true
      }
    ];
  }
}