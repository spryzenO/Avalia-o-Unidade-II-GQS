const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pedidos = [];
let rotas = [];

// GET /pedidos - Retorna uma lista de pedidos.
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

// POST /pedidos - Cria um novo pedido.
app.post('/pedidos', (req, res) => {
    const { endereco, produto, quantidade } = req.body;
    if (!endereco || !endereco.latitude || !endereco.longitude || !produto || typeof quantidade !== 'number') {
        return res.status(400).json({ message: 'Dados inválidos' });
    }
    const pedido = {
        id: pedidos.length + 1,
        endereco,
        produto,
        quantidade
    };
    pedidos.push(pedido);
    res.status(201).json(pedido);
});

// GET /rotas - Retorna uma lista de rotas.
app.get('/rotas', (req, res) => {
    res.json(rotas);
});

// POST /rotas - Cria uma nova rota.
app.post('/rotas', (req, res) => {
    const { latitude, longitude } = req.body;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ message: 'Dados inválidos' });
    }
    const rota = {
        id: rotas.length + 1,
        latitude,
        longitude
    };
    rotas.push(rota);
    res.status(201).json(rota);
});

// Função para calcular a distância entre dois pontos geográficos
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
}

// GET /melhor-rota/:id - Verifica a melhor rota de entrega para os pedidos.
app.get('/melhor-rota/:id', (req, res) => {
    const rotaId = parseInt(req.params.id);
    const rota = rotas.find(r => r.id === rotaId);

    if (!rota) {
        return res.status(404).json({ message: 'Rota não encontrada' });
    }

    // Ordenar os pedidos pela distância em relação à rota especificada
    const pedidosOrdenados = pedidos.map(pedido => ({
        ...pedido,
        distancia: calcularDistancia(rota.latitude, rota.longitude, pedido.endereco.latitude, pedido.endereco.longitude)
    })).sort((a, b) => a.distancia - b.distancia);

    res.json(pedidosOrdenados);
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
