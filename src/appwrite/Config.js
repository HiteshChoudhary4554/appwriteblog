import { Client, Databases, Query, Storage , ID } from "appwrite";
import Conf from '../Conf/Conf'

class configDatabase{
    client = new Client()
    database
    storage
    constructor() {
        this.client
        .setEndpoint(Conf.EndPointId)
        .setProject(Conf.ProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,content,status,featuredImage,userid}){
        try {
            return await this.database.createDocument({
                databaseId: Conf.DatabaseId,
                collectionId : Conf.TableId,
                documentId : slug,
                data : {
                    title,
                    content,
                    slug,
                    status,
                    featuredImage,
                    userid
                }
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
    
    async displayPost(queries = [Query.equal('status',"active")]){
        try {
            return await this.database.listDocuments({
                databaseId: Conf.DatabaseId,
                collectionId: Conf.TableId,
                queries
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument({
                databaseId: Conf.DatabaseId,
                collectionId: Conf.TableId,
                documentId:slug
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    async updatePost({slug,title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument({
                databaseId:Conf.DatabaseId,
                collectionId:Conf.TableId,
                documentId:slug,
                data :{
                    title,
                    content,
                    slug,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }


    async deletePost(slug){
        try {
            return await this.database.deleteDocument({
                databaseId: Conf.DatabaseId,
                collectionId: Conf.TableId,
                documentId: slug
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: Conf.StorageId,
                fileId : ID.unique(),
                file
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    async getFile(fileId){
        try {
            return await this.storage.getFile({
                bucketId: Conf.StorageId,
                fileId
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    getFileView(fileId){
      return this.storage.getFileView({
        bucketId: Conf.StorageId,
        fileId
      })
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile({
                bucketId: Conf.StorageId,
                fileId
            })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const database = new configDatabase()
export default database;