const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
    it('GET /pedidos - Deve retornar uma lista de pedidos', async () => {
        const res = await request(app).get('/pedidos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /pedidos - Deve criar um novo pedido', async () => {
        const newPedido = {
            endereco: { latitude: -23.5505, longitude: -46.6333 },
            produto: 'Produto A',
            quantidade: 10
        };
        const res = await request(app)
            .post('/pedidos')
            .send(newPedido);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.endereco).toEqual(newPedido.endereco);
        expect(res.body.produto).toEqual(newPedido.produto);
        expect(res.body.quantidade).toEqual(newPedido.quantidade);
    });

    it('GET /rotas - Deve retornar uma lista de rotas', async () => {
        const res = await request(app).get('/rotas');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /rotas - Deve criar uma nova rota', async () => {
        const newRota = {
            latitude: -23.5505,
            longitude: -46.6333
        };
        const res = await request(app)
            .post('/rotas')
            .send(newRota);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.latitude).toEqual(newRota.latitude);
        expect(res.body.longitude).toEqual(newRota.longitude);
    });

    it('GET /melhor-rota/:id - Deve retornar a melhor rota de entrega', async () => {
        // Primeiro cria uma rota
        const newRota = {
            latitude: -23.5505,
            longitude: -46.6333
        };
        const rotaRes = await request(app)
            .post('/rotas')
            .send(newRota);
        const rotaId = rotaRes.body.id;

        // Depois cria um pedido
        const newPedido = {
            endereco: { latitude: -23.5510, longitude: -46.6340 },
            produto: 'Produto B',
            quantidade: 5
        };
        await request(app)
            .post('/pedidos')
            .send(newPedido);

        const res = await request(app).get(`/melhor-rota/${rotaId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('distancia');
    });
});
