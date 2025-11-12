const Conf = {
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    endpoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    tableId : String(import.meta.env.VITE_APPWRITE_ARTICLE),
    storageId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default Conf;
