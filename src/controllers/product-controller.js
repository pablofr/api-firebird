'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');
var firebird = require('node-firebird');
const conexao = require('../connection/firebird');

exports.get = async(req, res, next) => {
    try {
        var pool = firebird.pool(5, conexao.options);

        pool.get(function(err, db) {
            try {
            db.query(
                "SELECT P.CODPRD, P.NOMEFANTASIA, P.CODFAB, P.NUMNOFABRIC AS REF_FABRIC,"+
                "P.PRECO1, P.PRECO2, P.PRECO3, P.PRECO4, P.PRECO5, P.UNIDADE, P.CODTIP, P.SALDOGERALFISICO,"+
                "P.SALDOGERALFISICO2, P.SALDOGERALFISICO3, P.SALDOGERALFISICO4, P.SALDOGERALFISICO5,"+
                "P.SALDOGERALFISICO6, P.SALDOGERALFISICO7, P.SALDOGERALFISICO8, P.SALDOGERALFISICO9,"+
                "P.SALDOGERALFISICO10, P.DESCONTOMAX, P.IDPROMOCAO "+
                "FROM TPRODUTO P "+
                "WHERE P.INATIVO <> 'T' AND P.TIPO = 'P' AND P.naoexportarpalm <> 'T'",
                function(err, result) {
                try {
                    if (err) {
                    return res.status(400).send({error:"Ocorreu um erro ao tentar fazer a consulta. Erro : " +err});
                    }

                    if (result != undefined) {
                    console.log('Numero de Linhas: '+result.length);
                    for (var i=0;i<result.length;i++) {
                        result[i].CODPRD = conexao.convertBuffer(result[i].CODPRD) ;
                        result[i].NOMEFANTASIA = conexao.convertBuffer(result[i].NOMEFANTASIA); 
                        result[i].CODFAB = conexao.convertBuffer(result[i].CODFAB); 
                        result[i].REF_FABRIC = conexao.convertBuffer(result[i].REF_FABRIC); 
                        result[i].UNIDADE = conexao.convertBuffer(result[i].UNIDADE); 
                        result[i].CODTIP = conexao.convertBuffer(result[i].CODTIP); 
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

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var pool = firebird.pool(5, conexao.options);

        pool.get(function(err, db) {
            try {
            db.query(
                "SELECT P.CODPRD, P.NOMEFANTASIA, P.CODFAB, P.NUMNOFABRIC AS REF_FABRIC,"+
                "P.PRECO1, P.PRECO2, P.PRECO3, P.PRECO4, P.PRECO5, P.UNIDADE, P.CODTIP, P.SALDOGERALFISICO,"+
                "P.SALDOGERALFISICO2, P.SALDOGERALFISICO3, P.SALDOGERALFISICO4, P.SALDOGERALFISICO5,"+
                "P.SALDOGERALFISICO6, P.SALDOGERALFISICO7, P.SALDOGERALFISICO8, P.SALDOGERALFISICO9,"+
                "P.SALDOGERALFISICO10, P.DESCONTOMAX, P.IDPROMOCAO "+
                "FROM TPRODUTO P "+
                "WHERE P.INATIVO <> 'T' AND P.TIPO = 'P' AND P.naoexportarpalm <> 'T' AND P.CODPRD = ? ", req.params.id,
                function(err, result) {
                    try {
                        if (err) {
                        return res.status(400).send({error:"Ocorreu um erro ao tentar fazer a consulta. Erro : " +err});
                        }
    
                        if (result != undefined) {
                        console.log('Numero de Linhas: '+result.length);
                        for (var i=0;i<result.length;i++) {
                            result[i].CODPRD = conexao.convertBuffer(result[i].CODPRD) ;
                            result[i].NOMEFANTASIA = conexao.convertBuffer(result[i].NOMEFANTASIA); 
                            result[i].CODFAB = conexao.convertBuffer(result[i].CODFAB); 
                            result[i].REF_FABRIC = conexao.convertBuffer(result[i].REF_FABRIC); 
                            result[i].UNIDADE = conexao.convertBuffer(result[i].UNIDADE); 
                            result[i].CODTIP = conexao.convertBuffer(result[i].CODTIP); 
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

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        // Cria o Blob Service
        // const blobSvc = azure.createBlobService(config.containerConnectionString);

        // let filename = guid.raw().toString() + '.jpg';
        // let rawdata = req.body.image;
        // let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        // let type = matches[1];
        // let buffer = new Buffer(matches[2], 'base64');

        // // Salva a imagem
        // await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
        //     contentType: type
        // }, function (error, result, response) {
        //     if (error) {
        //         filename = 'default-product.png'
        //     }
        // });

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            // image: 'https://nodestr.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};