// controllers/categoriaController.js

const Categoria = require('../models/Categoria');

// Obtener las categorías de un torneo específico
const getCategoriasByTorneo = async (req, res) => {
  const { torneoId } = req.params;

  if (!torneoId) {
    return res.status(400).json({ message: 'El ID del torneo es obligatorio' });
  }

  try {
    const categorias = await Categoria.getCategoriasByTorneo(torneoId);
    
    if (categorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron categorías para este torneo.' });
    }

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
  }
};

// Obtener todas las categorías
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAllCategorias();

    if (categorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron categorías.' });
    }

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
  }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
  const { nombre, torneoId } = req.body;

  // Validar solo el campo obligatorio "nombre"
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    const nuevaCategoria = await Categoria.createCategoria(nombre, torneoId);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
  }
};

// Actualizar una categoría
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio para la actualización' });
  }

  try {
    const actualizado = await Categoria.updateCategoria(id, nombre);
    if (!actualizado) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error: error.message });
  }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await Categoria.deleteCategoria(id);
    if (!eliminado) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
  }
};

// Obtener categorías con torneos, equipos y capitanes asociados
const getCategoriasWithTorneosEquipos = async (req, res) => {
  try {
    const categoriasTorneosEquipos = await Categoria.getCategoriasWithTorneosEquipos();

    if (categoriasTorneosEquipos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron categorías con torneos y equipos asociados.' });
    }

    res.status(200).json(categoriasTorneosEquipos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías con torneos y equipos', error: error.message });
  }
};

// Obtener categorías con torneos asociados
const getCategoriasConTorneos = async (req, res) => {
  try {
    const categoriasTorneos = await Categoria.getCategoriasConTorneos();

    if (categoriasTorneos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron categorías con torneos asociados.' });
    }

    res.status(200).json(categoriasTorneos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías con torneos', error: error.message });
  }
};

module.exports = {
  getCategoriasByTorneo,
  getAllCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoriasWithTorneosEquipos,
  getCategoriasConTorneos,
};
