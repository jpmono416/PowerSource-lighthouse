import { Op, fn, col } from "sequelize";
import { defineLLMModel } from "../models/LLM.model.js";

export default class LLMService {
    static async getLLMModel() {
        if (!this.LLMModel) {
            this.LLMModel = defineLLMModel();
        }
        return this.LLMModel;
    }

    static async getLLMCount() {
        try {
            const LLMModel = await this.getLLMModel();
            const count = await LLMModel.count();
            return count;
        } catch (error) {
            console.error("Error retrieving LLM count:", error);
            throw error;
        }
    }

    static async createLLM(llmDetails) {
        const { name, description, createdBy } = llmDetails;
        try {
            const LLMModel = await this.getLLMModel();
            console.log("About to create LLM");
            const llm = await LLMModel.create({
                name,
                description,
                createdBy,
            });
            console.log("LLM created", llm);
            return llm;
        } catch (error) {
            console.error("Error creating LLM:", error);
            throw error;
        }
    }

    static async getAllLLMs(filters) {
        try {
            const LLMModel = await this.getLLMModel();

            // Build dynamic query
            const query = {
                where: {},
                order: [["name", "ASC"]],
            };
            if (filters) {
                if (filters.name) {
                    query.where.name = { [Op.like]: `%${filters.name}%` };
                }

                if (filters.organization) {
                    query.where.organization = filters.organization;
                }

                if (filters.license) {
                    query.where.license = filters.license;
                }

                if (filters.access) {
                    query.where.access = filters.access;
                }

                if (filters.modality) {
                    query.where.modality = { [Op.like]: `%${filters.modality}%` };
                }

                if (filters.createdDateFrom && filters.createdDateTo) {
                    query.where.created_date = {
                        [Op.between]: [
                            new Date(filters.createdDateFrom),
                            new Date(filters.createdDateTo),
                        ],
                    };
                } else if (filters.createdDateFrom) {
                    query.where.created_date = {
                        [Op.gte]: new Date(filters.createdDateFrom),
                    };
                } else if (filters.createdDateTo) {
                    query.where.created_date = {
                        [Op.lte]: new Date(filters.createdDateTo),
                    };
                }
            }
            const llms = await LLMModel.findAll(query);
            return llms;
        } catch (error) {
            console.error("Error retrieving all LLMs:", error);
            throw error;
        }
    }

    static async getLLMById(id) {
        try {
            const LLMModel = await this.getLLMModel();
            const llm = await LLMModel.findOne({ where: { id } });
            return llm;
        } catch (error) {
            console.error("Error retrieving LLM by id:", error);
            throw error;
        }
    }

    //* Get all LLMs that have a non-null value for the database fields 'perceived_business_value' and 'business_readiness'
    static async getMatrixLLMs() {
        try {
            const LLMModel = await this.getLLMModel();
            const matrixLLMs = await LLMModel.findAll({
                where: {
                    perceived_business_value: { [Op.ne]: "" },
                    business_readiness: { [Op.ne]: "" },
                },
            });
            return matrixLLMs;
        } catch (error) {
            console.error("Error retrieving matrix LLMs:", error);
            throw error;
        }
    }

    static async getDistinctFilterValues() {
        try {
            const LLMModel = await this.getLLMModel();
            const filterColumns = ["organization", "license", "access", "modality"];
            let distinctValues = {};

            for (const column of filterColumns) {
                const distinctColumnValues = await LLMModel.findAll({
                    attributes: [[fn("DISTINCT", col(column)), column]],
                    where: {},
                    order: [[column, "ASC"]],
                });

                const filteredValues = distinctColumnValues
                    .filter((value) => value[column]) // Remove null values
                    .map((value) => value[column]); // Extract the column value

                //? Some filters are stored as a string with multiple values separated by ','
                //? Modalities are comma-separated values on each entry, which are separated by ';' instead
                const splitByChar = column === "modality" ? ";" : ",";
                distinctValues[column] = this.processMultiValueStrings(filteredValues, splitByChar);
            }

            return distinctValues;
        } catch (error) {
            console.error("Error getting distinct filter values:", error);
            throw error;
        }
    }

    static processMultiValueStrings(values, splitBy = "") {
        const distinctModalities = new Set();
        values.forEach((value) => {
            value.split(splitBy).forEach((subValue) => {
                distinctModalities.add(subValue.trim());
            });
        });

        return Array.from(distinctModalities);
    }
}
