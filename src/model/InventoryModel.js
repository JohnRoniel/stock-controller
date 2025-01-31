const mongoose = require('mongoose');

/*
    _id: Identificador único do inventário
    name: Nome do item
    category: Categoria do item
    countMin: Quantidade mínima do item
    count: Quantidade atual do item
    control: Tipo de controle do item
    controlState: Estado do estoque do item
    lastUpdated: Data da última alteração
*/
const inventorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countMin: {
        type: Number,
        min: 0,
        default: 0,
        required: false,
    },
    count: {
        type: Number,
        required: true,
        min: 0,
    },
    control: {
        type: String,
        required: true
    },
    controlState: {
        type: String
    },
    lastUpdated: {
        type: String
    },
});

// Função para formatar a data no formato "00:00 01/01/2025"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

// Hook para atualizar a data da última alteração
inventorySchema.pre('save', function (next) {
    const currentDate = new Date();
    this.lastUpdated = formatDate(currentDate); // Atualiza o campo lastUpdated com a data formatada
    next();
});


// Criando o modelo do Inventário
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
