import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import JobTitle from "./JobTitle";

interface JobPositionAttributes {
  id?: number,
  code?: string,
  name?: string | null,
  titleId?: number

  createdAt?: Date,
  updatedAt? : Date
}

export interface JobPositionInput extends Optional<JobPositionAttributes, 'id'>{ }
export interface JobPositionOutput extends Required<JobPositionAttributes>{ }

class JobPosition extends Model<JobPositionAttributes, JobPositionInput> implements JobPositionAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public titleId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

JobPosition.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  code: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  titleId: {
    allowNull: false,
    type: DataTypes.BIGINT
  },

}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

JobPosition.belongsTo(JobTitle, { foreignKey: "titleId"})
export default JobPosition;  