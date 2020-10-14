'use strict';

const ValidationContract = require('../validators/fluent-validator');
var config = require('../config');
var firebird = require('node-firebird');
const conexao = require('../connection/firebird');

exports.get = async(req, res, next) => {
    try {
        var pool = firebird.pool(5, conexao.options);

        pool.get(function(err, db) {
            try {
            db.query(
                "SELECT F.CODCFO, F.NOMEFANTASIA, F.NOME, F.CODTIPOCFO, F.CGCCFO, F.INSCRESTADUAL, "+
                "F.TIPO, F.RUA, F.NUMERO, F.COMPLEMENTO, F.BAIRRO, F.CIDADE, F.CODETD, F.CEP, F.TELEFONE,"+
                "F.TELEFONE2, F.FAX, F.EMAIL, F.CONTATO, F.LIMITECREDITO, F.VALOREMABERTO, F.DESCONTOMAX "+
                "FROM FCFO F "+
                "WHERE F.ATIVO = 'T' AND F.TIPO <> 'F' ", 
                function(err, result) {
                    try {
                        if (err) {
                        return res.status(400).send({error:"Ocorreu um erro ao tentar fazer a consulta. Erro : " +err});
                        }
    
                        if (result != undefined) {
                        console.log('Numero de Linhas: '+result.length);
                        for (var i=0;i<result.length;i++) {
                            result[i].CODCFO = conexao.convertBuffer(result[i].CODCFO) ;
                            result[i].NOMEFANTASIA = conexao.convertBuffer(result[i].NOMEFANTASIA); 
                            result[i].NOME = conexao.convertBuffer(result[i].NOME); 
                            result[i].CODTIPOCFO = conexao.convertBuffer(result[i].CODTIPOCFO); 
                            result[i].CGCCFO = conexao.convertBuffer(result[i].CGCCFO); 
                            result[i].INSCRESTADUAL = conexao.convertBuffer(result[i].INSCRESTADUAL);
                            result[i].TIPO = conexao.convertBuffer(result[i].TIPO); 
                            result[i].RUA = conexao.convertBuffer(result[i].RUA); 
                            result[i].NUMERO = conexao.convertBuffer(result[i].NUMERO); 
                            result[i].COMPLEMENTO = conexao.convertBuffer(result[i].COMPLEMENTO); 
                            result[i].BAIRRO = conexao.convertBuffer(result[i].BAIRRO); 
                            result[i].CIDADE = conexao.convertBuffer(result[i].CIDADE); 
                            result[i].CODETD = conexao.convertBuffer(result[i].CODETD); 
                            result[i].CEP = conexao.convertBuffer(result[i].CEP); 
                            result[i].TELEFONE = conexao.convertBuffer(result[i].TELEFONE); 
                            result[i].TELEFONE2 = conexao.convertBuffer(result[i].TELEFONE2); 
                            result[i].FAX = conexao.convertBuffer(result[i].FAX); 
                            result[i].EMAIL = conexao.convertBuffer(result[i].EMAIL); 
                            result[i].CONTATO = conexao.convertBuffer(result[i].CONTATO); 
                        }
    
                        return res.send(JSON.stringify(result));
                        } else {
                            res.status(400).send({ error: "Não existem dados para ser retornados" });
                        }
                    } catch (e) {
                        console.log(e);
                        res.status(400).send({ error: "Falha ao buscar dados no banco" });
                    }
                    }
            );
            db.detach();
            } catch (e) {
                console.log(e);
                res.status(400)
                .send({ error: "Ocorreu um erro ao gerar o pool conexões! Falha na conexão com Banco" });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Falha ao carregar os dados de clientes do servidor" });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var pool = firebird.pool(5, conexao.options);

        pool.get(function(err, db) {
            try {
            db.query(
                "SELECT F.CODCFO, F.NOMEFANTASIA, F.NOME, F.CODTIPOCFO, F.CGCCFO, F.INSCRESTADUAL, "+
                "F.TIPO, F.RUA, F.NUMERO, F.COMPLEMENTO, F.BAIRRO, F.CIDADE, F.CODETD, F.CEP, F.TELEFONE,"+
                "F.TELEFONE2, F.FAX, F.EMAIL, F.CONTATO, F.LIMITECREDITO, F.VALOREMABERTO, F.DESCONTOMAX "+
                "FROM FCFO F "+
                "WHERE F.ATIVO = 'T' AND F.TIPO <> 'F' AND F.CODCFO = ? ", req.params.id,
                function(err, result) {
                    try {
                        if (err) {
                        return res.status(400).send({error:"Ocorreu um erro ao tentar fazer a consulta. Erro : " +err});
                        }
    
                        if (result != undefined) {
                        console.log('Numero de Linhas: '+result.length);
                        for (var i=0;i<result.length;i++) {
                            result[i].CODCFO = conexao.convertBuffer(result[i].CODCFO) ;
                            result[i].NOMEFANTASIA = conexao.convertBuffer(result[i].NOMEFANTASIA); 
                            result[i].NOME = conexao.convertBuffer(result[i].NOME); 
                            result[i].CODTIPOCFO = conexao.convertBuffer(result[i].CODTIPOCFO); 
                            result[i].CGCCFO = conexao.convertBuffer(result[i].CGCCFO); 
                            result[i].INSCRESTADUAL = conexao.convertBuffer(result[i].INSCRESTADUAL);
                            result[i].TIPO = conexao.convertBuffer(result[i].TIPO); 
                            result[i].RUA = conexao.convertBuffer(result[i].RUA); 
                            result[i].NUMERO = conexao.convertBuffer(result[i].NUMERO); 
                            result[i].COMPLEMENTO = conexao.convertBuffer(result[i].COMPLEMENTO); 
                            result[i].BAIRRO = conexao.convertBuffer(result[i].BAIRRO); 
                            result[i].CIDADE = conexao.convertBuffer(result[i].CIDADE); 
                            result[i].CODETD = conexao.convertBuffer(result[i].CODETD); 
                            result[i].CEP = conexao.convertBuffer(result[i].CEP); 
                            result[i].TELEFONE = conexao.convertBuffer(result[i].TELEFONE); 
                            result[i].TELEFONE2 = conexao.convertBuffer(result[i].TELEFONE2); 
                            result[i].FAX = conexao.convertBuffer(result[i].FAX); 
                            result[i].EMAIL = conexao.convertBuffer(result[i].EMAIL); 
                            result[i].CONTATO = conexao.convertBuffer(result[i].CONTATO);  
                        }
    
                        return res.send(JSON.stringify(result));
                        } else {
                            res.status(400).send({ error: "Não existem dados para ser retornados" });
                        }
                    } catch (e) {
                        console.log(e);
                        res.status(400).send({ error: "Falha ao buscar dados no banco" });
                    }
                    }
            );
            db.detach();
            } catch (e) {
                console.log(e);
                res.status(400)
                .send({ error: "Ocorreu um erro ao gerar o pool conexões! Falha na conexão com Banco" });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "Falha ao carregar os dados de clientes do servidor" });
    }
}
