/** 
 * File: server.js
 * Description: Arquivo principal responsavel por executar a aplicação 
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 3000

//Linha necessária para que o request body seja analisado
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cors());

//Requisições get para a URL raiz /
app.get('/', (req, res) => {
    const output = { value: 'hello world' }
    res.send(output)
})

/** Método para Adicionar veiculos */
app.post('/vehicle/add', (req, res) => {
    
    //Obtem os veículos do json
    const vehicles = getVehicles()
    
    //Obtem os dados da requisição POST
    const requestData = req.body

    /** Validações */
    //Verifica se há algum campo não preenchido
    if (requestData.placa === null || 
        requestData.chassi === null || 
        requestData.renavam === null || 
        requestData.modelo === null ||
        requestData.marca === null ||
        requestData.ano === null) {
        //Envia uma resposta de erro com uma mensagem e o status Unauthorized 401
        return res.status(401).send({
            error: true,
            msg: 'Campo obrigatório não preenchido!'
        })
    }

    //Verifica se o veículo já está cadastrado
    const existId = vehicles.find( v => v.id === requestData.id)
    const existPlaca = vehicles.find( v => v.placa === requestData.placa)
    const existChassi = vehicles.find( v => v.chassi === requestData.chassi)
    const existRenavam = vehicles.find( v => v.renavam === requestData.renavam)
    
    if (existId || existPlaca || existChassi || existRenavam) {
        //Envia uma resposta de erro com uma mensagem e o status Conflict 409
        return res.status(401).send({
            error: true,
            msg: 'Veículo já cadastrado!'
        })
    }
    
    //Adiciona os dados do veículo da requisição ao conjunto de veículos obtidos a partir do json
    vehicles.push(requestData)

    //Salva o arquivo json com o novo veículo adicionado
    saveVehicles(vehicles)

    //Envia uma resposta de sucesso com uma mensagem
    res.send({
        success: true,
        msg: 'Veículo adicionado com sucesso'
    })


})

/** Método para Recuperar todos os veículos */
app.get('/vehicle/list', (req, res) => {
    //Obtem os veículos do json
    const vehicles = getVehicles()

    //Envia uma resposta com todos os vehiculos cadastrados
    res.send(vehicles)
})

/** Método para Recuperar um veículo */
app.get('/vehicle/edit/:id', (req, res) => {
    //Recupera o veículo baseado no parametro id da url
    const vehicle = req.params.id
    
    //Obtem os veículos do json
    const vehicles = getVehicles()

    //Usa o filter pra pegar o veículo cujo id foi passado por parâmetro
    const edVehicle = vehicles.filter(v => v.id == vehicle)

    //Envia uma resposta o vehiculo pesquisado
    res.send(edVehicle)
})

/** Método para Atualizar um veículo */
app.patch('/vehicle/update/:id', (req, res) => {
    //Recupera o veículo baseado no parametro id da url
    const vehicle = req.params.id

    //Obtem os dados da requisição PATCH
    const requestData = req.body

    //Obtem os veículos do json
    const vehicles = getVehicles()

    /** Validações */
    //Verifica se há algum campo não preenchido
    if (requestData.placa === null || 
        requestData.chassi === null || 
        requestData.renavam === null || 
        requestData.modelo === null ||
        requestData.marca === null ||
        requestData.ano === null) {
        //Envia uma resposta de erro com uma mensagem e o status Unauthorized 401
        return res.status(401).send({
            error: true,
            msg: 'Campo obrigatório não preenchido!'
        })
    }

    //Usa o filter pra remover o veículo cujo id foi passado por parâmetro
    const updVehicle = vehicles.filter(v => v.id != vehicle)

    //Adiciona os dados do veículo da requisição ao conjunto de veículos obtidos a partir do json
    updVehicle.push(requestData)

    //Salva o arquivo json com o novo veículo adicionado
    saveVehicles(updVehicle)

    //Envia uma resposta de sucesso com uma mensagem
    res.send({
        success: true,
        msg: 'Veículo atualizado com sucesso'
    })
})

/** Método para Excluir um veículo */
app.delete('/vehicle/delete/:id', (req, res) => {
    //Recupera o veículo baseado no parametro id da url
    const vehicle = req.params.id

    //Obtem os veículos do json
    const vehicles = getVehicles()

    //Verifica se o veículo existe
    const existId = vehicles.find( v => v.id == vehicle)

    if (!existId) {
        //Envia uma resposta de erro com uma mensagem e o status Conflict 409
        return res.status(409).send({
            error: true,
            msg: 'Veículo não está cadastrado'
        })
    }

    //Usa o filter pra remover o veículo cujo id foi passado por parâmetro
    const filterVehicles = vehicles.filter(v => v.id != vehicle)
    
    //Salva o arquivo json com o novo veículo adicionado
    saveVehicles(filterVehicles)

    //Envia uma resposta de sucesso com uma mensagem
    res.send({
        success: true,
        msg: 'Veículo excluído com sucesso'
    })
})


/** Funções auxiliares */

//Salva os veículos no arquivo json
const saveVehicles = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('vehicles.json', stringifyData)
}

//Recupera os veículos do arquivo json
const getVehicles = () => {
    const jsonData = fs.readFileSync('vehicles.json')
    return JSON.parse(jsonData)    
}

//Config da porta do servidor
app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
})


module.exports = app