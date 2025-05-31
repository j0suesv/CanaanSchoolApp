// models/pago.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Estudiante from './estudiante.js';

const Pago = sequelize.define('Pago', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  valor_abonado: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mes_abonado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Relaciones
Estudiante.hasMany(Pago, { foreignKey: 'estudianteId' });
Pago.belongsTo(Estudiante, { foreignKey: 'estudianteId' });

export default Pago;