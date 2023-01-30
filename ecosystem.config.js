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
      script: './start.js',
      env:{
        HOST: 'localhost',
        PORT: 3000
      }
    }
  ]
}
