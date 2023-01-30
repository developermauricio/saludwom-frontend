module.exports = {
  apps:[
    {
      name: 'SaludWom',
      script: './start.js',
      env:{
        HOST: 'localhost',
        PORT: 3000
      }
    },
    {
      name: 'saludwom-app.socket-aicode.art',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env:{
        HOST: 'localhost',
        PORT: 3000
      }
    }
  ]
}
