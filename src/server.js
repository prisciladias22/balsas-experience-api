const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Bem-vindo à Balsas Experience API!',
    descricao: 'API de informações sobre atrações turísticas de Balsas-MA.',
    endpoints: {
      listar: 'GET /atracoes',
      consultar: 'GET /atracoes/:id',
      cadastrar: 'POST /atracoes',
      atualizar: 'PUT /atracoes/:id',
      excluir: 'DELETE /atracoes/:id',
    },
  });
});

// Listar todas as atrações
app.get('/atracoes', async (req, res) => {
  try {
    const atracoes = await prisma.atracao.findMany({
      orderBy: { nome: 'asc' },
    });

    return res.status(200).json(atracoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Não foi possível listar as atrações.',
    });
  }
});

// Consultar uma atração pelo ID
app.get('/atracoes/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: 'O ID deve ser um número inteiro positivo.',
    });
  }

  try {
    const atracao = await prisma.atracao.findUnique({
      where: { id },
    });

    if (!atracao) {
      return res.status(404).json({
        erro: 'Atração não encontrada.',
      });
    }

    return res.status(200).json(atracao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Não foi possível consultar a atração.',
    });
  }
});

// Cadastrar uma nova atração
app.post('/atracoes', async (req, res) => {
  const { nome, descricao, endereco, categoria, horario, preco } = req.body;

  if (
    typeof nome !== 'string' ||
    !nome.trim() ||
    typeof descricao !== 'string' ||
    !descricao.trim() ||
    typeof endereco !== 'string' ||
    !endereco.trim() ||
    typeof categoria !== 'string' ||
    !categoria.trim()
  ) {
    return res.status(400).json({
      erro: 'Informe nome, descrição, endereço e categoria.',
    });
  }

  try {
    const atracao = await prisma.atracao.create({
      data: {
        nome: nome.trim(),
        descricao: descricao.trim(),
        endereco: endereco.trim(),
        categoria: categoria.trim(),
        horario:
          typeof horario === 'string' && horario.trim()
            ? horario.trim()
            : null,
        preco:
          typeof preco === 'string' && preco.trim()
            ? preco.trim()
            : null,
      },
    });

    return res.status(201).json(atracao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Não foi possível cadastrar a atração.',
    });
  }
});

// Atualizar uma atração
app.put('/atracoes/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: 'O ID deve ser um número inteiro positivo.',
    });
  }

  const { nome, descricao, endereco, categoria, horario, preco } = req.body;

  const camposTexto = {
    nome,
    descricao,
    endereco,
    categoria,
    horario,
    preco,
  };

  for (const [campo, valor] of Object.entries(camposTexto)) {
    if (valor !== undefined && typeof valor !== 'string') {
      return res.status(400).json({
        erro: `O campo "${campo}" deve ser um texto.`,
      });
    }
  }

  for (const campo of ['nome', 'descricao', 'endereco', 'categoria']) {
    if (typeof camposTexto[campo] === 'string' && !camposTexto[campo].trim()) {
      return res.status(400).json({
        erro: `O campo "${campo}" não pode ficar vazio.`,
      });
    }
  }

  try {
    const dados = {};

    for (const campo of ['nome', 'descricao', 'endereco', 'categoria']) {
      if (camposTexto[campo] !== undefined) {
        dados[campo] = camposTexto[campo].trim();
      }
    }

    for (const campo of ['horario', 'preco']) {
      if (camposTexto[campo] !== undefined) {
        dados[campo] = camposTexto[campo].trim() || null;
      }
    }

    const atracao = await prisma.atracao.update({
      where: { id },
      data: dados,
    });

    return res.status(200).json(atracao);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        erro: 'Atração não encontrada.',
      });
    }

    console.error(error);
    return res.status(500).json({
      erro: 'Não foi possível atualizar a atração.',
    });
  }
});

// Excluir uma atração
app.delete('/atracoes/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: 'O ID deve ser um número inteiro positivo.',
    });
  }

  try {
    await prisma.atracao.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        erro: 'Atração não encontrada.',
      });
    }

    console.error(error);
    return res.status(500).json({
      erro: 'Não foi possível excluir a atração.',
    });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Balsas Experience API rodando em http://localhost:${PORT}`);
});

// Encerrar conexões corretamente
async function encerrarServidor() {
  await new Promise((resolve) => server.close(resolve));
  await prisma.$disconnect();
}

process.on('SIGINT', encerrarServidor);
process.on('SIGTERM', encerrarServidor);