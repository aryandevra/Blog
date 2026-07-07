import { Account, Client, ID } from "appwrite";

import conf from "../conf/conf";

export class AuthService {
  // Initialize Appwrite client and account service
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Create a new account and automatically log in
  async createAccount({ email, password, name }) {
    try {
      await this.account.create({
        userId: ID.unique(),
        email: email.trim(),
        password,
        name: name.trim(),
      });

      return this.login({ email, password });
    } catch (error) {
      console.error("Appwrite :: createAccount :: ", error);
      throw error;
    }
  }

  // Create an email/password session
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email.trim(),
        password,
      });
    } catch (error) {
      console.error("Appwrite :: login :: ", error);
      throw error;
    }
  }

  // Retrieve the currently authenticated user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite :: getCurrentUser :: ", error);
      throw error;
    }
  }

  // End the current session
  async logout() {
    try {
      return await this.account.deleteSession({
        sessionId: "current",
      });
    } catch (error) {
      console.error("Appwrite :: logout :: ", error);
      throw error;
    }
  }
}

// Export a singleton instance
const authService = new AuthService();

export default authService;
