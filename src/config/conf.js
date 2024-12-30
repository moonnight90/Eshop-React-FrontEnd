const conf = {
    appwrite_URL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwrite_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwrite_COLLECTION_ID_PRODUCTS: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_PRODUCTS),
    appwrite_COLLECTION_ID_CART: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_CART),
    appwrite_COLLECTION_ID_WHISHLIST: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_WHISHLIST),
    appwrite_COLLECTION_ID_ORDER: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDER),
    appwrite_BUCKET_ID_ORDER_ITEMS: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_ORDER_ITEMS),

    BACKEND_DOMAIN: String(import.meta.env.VITE_BACKEND_DOMAIN)
}

export default conf