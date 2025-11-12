import Conf from '../src/components/Conf/Conf'
import { Client, Databases, ID, Query, Storage } from "appwrite";


class config {
  client = new Client();
  databases;
  storage;

  constructor() {
    const endpoint =
      Conf?.EndPointId ||
      Conf?.endpoint ||
      import.meta.env?.VITE_APPWRITE_URL ||
      import.meta.env?.VITE_APPWRITE_ENDPOINT;

    const project =
      Conf?.ProjectId ||
      Conf?.projectId ||
      import.meta.env?.VITE_APPWRITE_PROJECT_ID ||
      import.meta.env?.VITE_APPWRITE_PROJECT;

    if (!endpoint) {
      throw new Error(
        "Appwrite endpoint is not defined. Set Conf.EndPointId or VITE_APPWRITE_URL."
      );
    }
    if (!project) {
      throw new Error(
        "Appwrite project id is not defined. Set Conf.ProjectId or VITE_APPWRITE_PROJECT_ID."
      );
    }

    this.client.setEndpoint(endpoint).setProject(project);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // create document (uses correct positional params for SDK)
  async createDocument({ title, slug, content, imageid, status, userid }) {
    try {
      const dbId =
        Conf?.DatabaseId || Conf?.databaseId || import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collectionId =
        Conf?.TableId || Conf?.tableId || Conf?.CollectionId || Conf?.collectionId || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      const documentId = slug
      const result = await this.databases.createDocument(
        dbId,
        collectionId,
        documentId,
        { title, content, imageid, status, userid }
      );
      return result;
    } catch (error) {
      console.error("createDocument error:", error);
      throw error;
    }
  }

  // list documents (correct signature)
  async allDocument(query = Query.equal("status", "active")) {
    try {
      const dbId =
        Conf?.DatabaseId || Conf?.databaseId || import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collectionId =
        Conf?.TableId || Conf?.tableId || Conf?.CollectionId || Conf?.collectionId || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      const result = await this.databases.listDocuments(dbId, collectionId, [query]);
      return result;
    } catch (error) {
      console.error("allDocument error:", error);
      throw error;
    }
  }

  async getDocument(slug) {
    try {
      const dbId =
        Conf?.DatabaseId || Conf?.databaseId || import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collectionId =
        Conf?.TableId || Conf?.tableId || Conf?.CollectionId || Conf?.collectionId || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      const result = await this.databases.getDocument(dbId, collectionId, slug);
      return result;
    } catch (error) {
      console.error("getDocument error:", error);
      throw error;
    }
  }

  async updateDocument({ $id, title, content, imageid, status, userid },slugid) {
    try {
      const dbId =
        Conf?.DatabaseId || Conf?.databaseId || import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collectionId =
        Conf?.TableId || Conf?.tableId || Conf?.CollectionId || Conf?.collectionId || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      const result = await this.databases.updateDocument(
        dbId,
        collectionId,
        slugid,
        {$id, title, content, imageid, status, userid }
      );
      return result;
    } catch (error) {
      console.error("updateDocument error:", error);
      throw error;
    }
  }

  async deleteDocument(slug) {
    try {
      const dbId =
        Conf?.DatabaseId || Conf?.databaseId || import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const collectionId =
        Conf?.TableId || Conf?.tableId || Conf?.CollectionId || Conf?.collectionId || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

      const result = await this.databases.deleteDocument(dbId, collectionId, slug);
      return result;
    } catch (error) {
      console.error("deleteDocument error:", error);
      throw error;
    }
  }

  // storage methods (positional params)
  async uploadImage(file) {
    try {
      const bucketId =
        Conf?.StorageId || Conf?.storageId || import.meta.env.VITE_APPWRITE_BUCKET_ID;
      const result = await this.storage.createFile(bucketId, ID.unique(), file);
      return result;
    } catch (error) {
      console.error("uploadImage error:", error);
      throw error;
    }
  }

  async imagePreview(imageid) {
    try {
      const bucketId =
        Conf?.StorageId || Conf?.storageId || import.meta.env.VITE_APPWRITE_BUCKET_ID;
      return this.storage.getFilePreview(bucketId, imageid);
    } catch (error) {
      console.error("imagePreview error:", error);
      throw error;
    }
  }

  async imageView(imageid) {
    try {
      const bucketId =
        Conf?.StorageId || Conf?.storageId || import.meta.env.VITE_APPWRITE_BUCKET_ID;
      return this.storage.getFileView(bucketId, imageid);
    } catch (error) {
      console.error("imageView error:", error);
      throw error;
    }
  }

  async deleteImage(imageid) { 
    try {
      const bucketId =
        Conf?.StorageId || Conf?.storageId || import.meta.env.VITE_APPWRITE_BUCKET_ID;
      const result = await this.storage.deleteFile(bucketId, imageid);
      return result;
    } catch (error) {
      console.error("deleteImage error:", error);
      throw error;
    }
  }
}

const dataStore = new config();
export default dataStore;