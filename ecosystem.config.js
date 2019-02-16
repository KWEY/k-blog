module.exports = {
  apps: [{
    name: 'k-blog',
    script: 'server.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '400M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    // 'production' is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      // key: '/.ssh',
      // SSH user
      user: 'root',
      // SSH host
      host: '107.182.28.215',
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: 'StrictHostKeyChecking=no',
      // GIT remote/branch
      ref: 'origin/master',
      // GIT remote
      repo: 'git@github.com:KWEY/k-blog.git',
      // path in the server
      path: '/home/www/k-blog',
      // Pre-setup command or path to a script on your local machine
      'pre-setup': 'yum install git ; ls -la',
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      'post-setup': 'ls -la',
      // pre-deploy action
      'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  }
};
