module.exports = {
  apps:[
    {
      name: 'webapp.test-aicode.com',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env:{
        HOST: 'localhost',
        PORT: 3000
      }
    }
  ]
}
