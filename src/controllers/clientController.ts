import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

// Criar novo cliente
export const createClient = async (req: Request, res: Response) => {
  const { name, fiscalIdentifier, email } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: { name, fiscalIdentifier, email }
    });
    res.status(201).json(newClient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
};

// Obter todos os clientes
export const getClients = async (req: Request, res: Response) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
};

// Obter cliente por ID
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(client);
};

// Atualizar cliente
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, fiscalIdentifier, email } = req.body;

  try {
    const updatedClient = await prisma.client.update({
      where: { id },
      data: { name, fiscalIdentifier, email },
    });

    res.json(updatedClient);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('P2025')) {
        res.status(404).json({ error: 'Cliente não encontrado' });
      } else {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
};

// Deletar cliente
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.client.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('P2025')) {
        res.status(404).json({ error: 'Client not found' });
      } else {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Erro desconhecido' });
    }
  }
};
