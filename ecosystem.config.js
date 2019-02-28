module.exports = {
  apps: [
    {
      name: 'k-blog',
      script: 'server/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '107.182.28.215',
      port: '29420',
      ref: 'origin/master',
      repo: 'git@github.com:KWEY/k-blog.git',
      path: '/home/www/k-blog',
      'post-deploy': 'npm i && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
