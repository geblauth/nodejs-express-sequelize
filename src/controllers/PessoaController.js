const Controller = require('./Controllers.js');
const PessoaServices = require('../services/PessoaService.js');


const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
    constructor(){
        super(pessoaServices);
    }

    async pegaMatricula(req, res){
        const {estudante_id} = req.params;
        try {
            const listMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));

            return res.status(200).json(listMatriculas);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async pegaMatriculasAtivas(req, res){
        const {estudante_id} = req.params;
        try {
            const listMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudante_id));

            return res.status(200).json(listMatriculas);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async pegaTodasAsPessoas(req, res){
        try {
            const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodo();
            return res.status(200).json(listaTodasAsPessoas);
        } catch (error) {
            return res.status(500).json({error: error.message});
            
        }
    }

    async cancelaRegistroEstudante(req,res){
        const {estudante_id} = req.params;
        try {
            await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
            return res.status(200).json({mensagem: `Matriculas ref. Estudante${estudante_id} canceladas`});
        } catch (error) {
            return res.status(500).json({error: error.message});
            
        }
    }

}

module.exports = PessoaController;