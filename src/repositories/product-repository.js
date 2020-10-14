'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
var firebird = require('node-firebird');
const conexao = require('../connection/firebird');
exports.get = async() => {
    let res;
    // const res = await Product.find({
    //     active: true
    // }, 'title price slug');

    var pool = firebird.pool(5, conexao.options);
    
    await pool.get(function(err, db)  {
        try {
        db.query(
            "SELECT FIRST 2 CODPRD, NOMEFANTASIA FROM TPRODUTO",
            function(err, result) {
            try {
                if (err) {
                    res = "Ocorreu um erro ao tentar fazer a consulta. Erro: " +err
                    return res;
                }

                if (result != undefined) {
                console.log('Numero de Linhas: '+result.length);
                    for (var i=0;i<result.length;i++) {
                    result[i].CODPRD = conexao.convertBuffer(result[i].CODPRD) ;// ab2str(result[i].CODPRD);
                    result[i].NOMEFANTASIA = conexao.convertBuffer(result[i].NOMEFANTASIA); // ab2str(result[i].NOMEFANTASIA);
                    // console.log( ab2str(result[i].CODPRD), ab2str(result[i].NOMEFANTASIA));
                }
                res = JSON.stringify(result)
                console.log(res);
                return res;
                // return res.send(result);
                } else {
                    res = "Não existem dados para ser retornados";
                    return res;
                }
            } catch (e) {
                    console.log(e);
                    res = "Falha ao buscar dados no banco" +e;
                    return res;
            }
            }
        );
        db.detach();
        } catch {
            console.log("Ocorreu um erro ao gerar o pool conexões");
            res = "Ocorreu um erro ao gerar o pool conexões" +e;
            return res;
        }
    });
}

exports.getBySlug = async(slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}