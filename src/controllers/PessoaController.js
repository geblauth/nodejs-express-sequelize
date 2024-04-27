const Controller = require('./Controllers.js');
const PessoaServices = require('../services/PessoaService.js');


const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
    constructor(){
        super(pessoaServices);
    }

    async pegaMatricula(req, res){
        const {estudanteId} = req.params;
        try {
            const listMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));

            return res.status(200).json(listMatriculas);
        } catch (error) {
            //error
        }
    }

}

module.exports = PessoaController;