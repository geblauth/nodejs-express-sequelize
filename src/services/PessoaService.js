const dataSource = require('../database/models');
const Services = require('./Service.js');


class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
        this.matriculaServices = new Services('Matricula');
    }

    async pegaMatriculasAtivasPorEstudante(id) {
        const estudante = await super.getRegisterById(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

    async pegaPessoasEscopoTodo(){
        const listaPessoas = await super.pegaRegistroPorEscopo('todosOsRegistros');
        return listaPessoas;
    }
      
    async pegaMatriculasPorEstudante(id) {
        const estudante = await super.getRegisterById(id);
        const listaMatriculas = await estudante.getTodasAsMatriculas();
        return listaMatriculas;
    }

    async cancelaPessoaEMatriculas(estudanteId){
        return dataSource.sequelize.transaction(async (transacao) =>{
            await super.updateRegister({ativo:false},{id:estudanteId},transacao);
            await this.matriculaServices.updateRegister({status: 'cancelado'},{estudante_id:estudanteId},transacao);
        });
    }
}
module.exports = PessoaServices;