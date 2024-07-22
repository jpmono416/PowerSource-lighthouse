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
                    query.where.name = filters.name;
                }
                
                if (filters.organization) {
                    query.where.organization = filters.organization;
                }

                if (filters.license) {
                    query.where.license = filters.license;
                }

                if(filters.access) {
                    query.where.access = filters.access;
                }

                if(filters.modality) {
                    query.where.modality = filters.modality;
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
}
