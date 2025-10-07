const Conf = {
    ProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    EndPointId: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    TableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    StorageId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
} 
export default Conf;