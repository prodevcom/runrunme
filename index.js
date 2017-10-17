var app = require('./config/CustomExpress')();

app.listen(8000, 'api.juntospelascriancas.dev', function(){
  console.log('Servidor rodando na porta 3000.');
});
