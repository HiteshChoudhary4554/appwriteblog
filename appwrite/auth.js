import { Client, Account, ID } from "appwrite";
import Conf from "../src/components/Conf/Conf";

class authService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(Conf.endpoint).setProject(Conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
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
    try {
      return await this.account.get();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  } 

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  }
}

const service = new authService();
export default service;