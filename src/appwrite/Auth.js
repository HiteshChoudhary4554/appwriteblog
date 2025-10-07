import { Client, Account, ID } from "appwrite";
import Conf from "../Conf/Conf";

class authService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(Conf.EndPointId).setProject(Conf.ProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    console.log("1");
    try {
      await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      return await this.login({ email, password });
    } catch (error) {
      if (error.code === 409) {
        console.error("Accoun already exist ", error.message);
        throw error;
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }

  async login({ email, password }) {
    console.log("2");
    
    try {
      await this.account.createEmailPasswordSession({
        email,
        password,
      });

      return await this.getAccount();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getAccount() {
    console.log("3");
    
    try {
      return await this.account.get();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

const service = new authService();
export default service;
