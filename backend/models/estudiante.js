// models/estudiante.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Estudiante = sequelize.define('Estudiante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor_matricula: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valor_mensualidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

export default Estudiante;