import { Client, ID, Query } from "appwrite";


class Config {
    client = new Client()
    databases
    storage
    constructor() {
        this.client
            .setEndpoint(conf.appwrite_URL)
            .setProject(conf.appwrite_PROJECT_ID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    get_products = async ({ limit = 10, skip = 0 },topSeller=false) => {
        const queries = [Query.limit(limit), Query.offset(skip)];
        topSeller && queries.push(Query.orderDesc("sold"));
        
        const response = await this.databases.listDocuments(
            conf.appwrite_DATABASE_ID,
            conf.appwrite_COLLECTION_ID_PRODUCTS,
            queries
        );
        return response;
    };

    get_product = async (id) => {
        const response = await this.databases.getDocument(
            conf.appwrite_DATABASE_ID,
            conf.appwrite_COLLECTION_ID_PRODUCTS,
            id
        );
        return response;
    };
}