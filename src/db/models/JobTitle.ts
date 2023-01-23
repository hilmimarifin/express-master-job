import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface JobTitleAttributes {
  id?: number,
  code?: string,
  name?: string | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface JobTitleInput extends Optional<JobTitleAttributes, 'id'>{ }
export interface JobTitleOutput extends Required<JobTitleAttributes>{ }

class JobTitle extends Model<JobTitleAttributes, JobTitleInput> implements JobTitleAttributes {
  public id!: number;
  public name!: string;
  public code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

JobTitle.init({
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

}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default JobTitle;  