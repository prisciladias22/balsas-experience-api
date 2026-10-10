-- CreateTable
CREATE TABLE "Atracao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "horario" TEXT,
    "preco" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atracao_pkey" PRIMARY KEY ("id")
);
