/** 
 * File: test.js
 * Description: Arquivo que armazena os testes da nossa aplicação 
 * Author: Sérgio Peluzzi
 * Date: 2021-02-11
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Vehicles', function() {
    /** Testando a rota GET em /vehicle/list */
    describe('/GET vehicles', function() {
        it('Deve retornar todos os veículos', (done) => {
            chai.request(server)
                .get('/vehicle/list')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                done()
                })
        });
    });
    /** Testando a adição de novos veículos POST em /vehicle/add */
    describe('/POST vehicles', function() {
        it('Não deve inserir veículos com algum campo vazio ', (done) => {
            let vehicle = {
                id: 7,
                modelo: 'Prisma LTZ',
                marca: 'Chevrolet',
                ano: 2020,
                chassi: '',
                placa: null,
                renavam: 78787878
            }
            chai.request(server)
                .post('/vehicle/add')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.be.a('object')
                    res.should.have.property('error')
                done()
                })
        });
        it('Não deve inserir um veículo duplicado', (done) => {
            let vehicle = {
                id: 1,
                modelo: 'Prisma LTZ',
                marca: 'Chevrolet',
                ano: 2020,
                chassi: 123456,
                renavam: 987654,
                placa: 'NBB5050'
            }
            chai.request(server)
                .post('/vehicle/add')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(409)
                    res.body.should.be.a('object')
                    res.should.have.property('error')
                done()
                })
        });
        it('Deve inserir um veículo', (done) => {
            let vehicle = {
                id: 19,
                modelo: 'Prisma LTZ',
                marca: 'Chevrolet',
                ano: 2020,
                chassi: 1234599,
                renavam: 98765444,
                placa: 'NBB50588'
            }
            chai.request(server)
                .post('/vehicle/add')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.should.have.property('success')
                done()
                })
        });
    });
    /** Testando a rota PATCH em /vehicle/update/:id */
    describe('/PATCH vehicles', function() {
        it('Não deve atualizar um veículos com algum campo vazio ', (done) => {
            let vehicle = {
                id: 7,
                modelo: 'Prisma LTZ',
                marca: 'Chevrolet',
                ano: 2020,
                chassi: '',
                placa: null,
                renavam: 78787878
            }
            chai.request(server)
                .patch(`/vehicle/update/${vehicle.id}`)
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.be.a('object')
                    res.should.have.property('error')
                done()
                })
        });
        it('Deve atualizar um veículo', (done) => {
            let vehicle = {
                id: 1,
                modelo: 'Prisma LTZ',
                marca: 'Chevrolet',
                ano: 2020,
                chassi: 1234599,
                renavam: 98765444,
                placa: 'NBB50588'
            }
            chai.request(server)
                .patch(`/vehicle/update/${vehicle.id}`)
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.should.have.property('success')
                done()
                })
        });
    });
    /** Testando a rota DELETE em /vehicle/delete/:id */
    describe('/DELETE vehicles', function() {
        it('Deve excluir um veículo', (done) => {
            let id = 1
            chai.request(server)
                .delete(`/vehicle/delete/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.have.property('success')
                done()
                })
        });
    });
});