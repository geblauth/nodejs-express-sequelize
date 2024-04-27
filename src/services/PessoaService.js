const Services = require('./Service.js');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
    }

    async pegaMatriculasPorEstudante(id) {
        const estudante = await super.getRegisterById(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }
      
}
module.exports = PessoaServices;