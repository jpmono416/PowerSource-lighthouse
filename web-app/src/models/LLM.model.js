import { DataTypes, Op } from "sequelize";
import Database from "../db/Database.js";

export const defineLLMModel = () => {
    const sequelize = Database.getSequelize();
    const LLM = sequelize.define(
        "LLM",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.TEXT,
            },
            name: {
                type: DataTypes.TEXT,
            },
            organization: {
                type: DataTypes.TEXT,
            },
            description: {
                type: DataTypes.TEXT,
            },
            created_date: {
                type: DataTypes.TEXT,
            },
            url: {
                type: DataTypes.TEXT,
            },
            datasheet: {
                type: DataTypes.TEXT,
            },
            modality: {
                type: DataTypes.TEXT,
            },
            size: {
                type: DataTypes.TEXT,
            },
            sample: {
                type: DataTypes.TEXT,
            },
            analysis: {
                type: DataTypes.TEXT,
            },
            dependencies: {
                type: DataTypes.TEXT,
            },
            included: {
                type: DataTypes.TEXT,
            },
            excluded: {
                type: DataTypes.TEXT,
            },
            quality_control: {
                type: DataTypes.TEXT,
            },
            access: {
                type: DataTypes.TEXT,
            },
            license: {
                type: DataTypes.TEXT,
            },
            intended_uses: {
                type: DataTypes.TEXT,
            },
            prohibited_uses: {
                type: DataTypes.TEXT,
            },
            monitoring: {
                type: DataTypes.TEXT,
            },
            feedback: {
                type: DataTypes.TEXT,
            },
            model_card: {
                type: DataTypes.TEXT,
            },
            training_emissions: {
                type: DataTypes.TEXT,
            },
            training_time: {
                type: DataTypes.TEXT,
            },
            training_hardware: {
                type: DataTypes.TEXT,
            },
            adaptation: {
                type: DataTypes.TEXT,
            },
            output_space: {
                type: DataTypes.TEXT,
            },
            terms_of_service: {
                type: DataTypes.TEXT,
            },
            monthly_active_users: {
                type: DataTypes.TEXT,
            },
            user_distribution: {
                type: DataTypes.TEXT,
            },
            failures: {
                type: DataTypes.TEXT,
            },
            perceived_business_value: {
                type: DataTypes.TEXT,
            },
            business_readiness: {
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: "powersource_llm",
            timestamps: false,
        }
    );
    return LLM;
};
