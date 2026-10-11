import { Client, ID, Query, TablesDB } from "appwrite";

import config from "../config/config";

export class DatabaseService {
  // Initialize Appwrite client and TablesDB service
  client = new Client();
  tablesDB;

  // Store database configuration
  databaseId = config.appwriteDatabaseId;
  tableId = config.appwriteTableId;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUri)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  // Create a new post
  async createPost({ title, slug, content, featuredImage, isPrivate, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: ID.unique(),
        data: {
          title: title.trim(),
          slug: slug.trim(),
          content: content?.trim() ?? null,
          featuredImage: featuredImage ?? null,
          isPrivate: Boolean(isPrivate),
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite :: createPost :: ", error);
      throw error;
    }
  }

  // Update an existing post
  async updatePost(
    postId,
    { title, slug, content, featuredImage, isPrivate, userId }
  ) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: postId,
        data: {
          title: title.trim(),
          slug: slug.trim(),
          content: content?.trim() ?? null,
          featuredImage: featuredImage ?? null,
          isPrivate: Boolean(isPrivate),
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite :: updatePost :: ", error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(postId) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: postId,
      });
    } catch (error) {
      console.error("Appwrite :: deletePost :: ", error);
      throw error;
    }
  }

  // Get a post by its ID
  async _getPost(postId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: postId,
      });
    } catch (error) {
      console.error("Appwrite :: _getPost :: ", error);
      throw error;
    }
  }

  // Get a post by its slug
  async getPost(slug) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: this.databaseId,
        tableId: this.tableId,
        queries: [Query.equal("slug", slug)],
      });

      if (result.total === 0) {
        return null;
      }

      return this._getPost(result.rows[0].$id);
    } catch (error) {
      console.error("Appwrite :: getPost :: ", error);
      throw error;
    }
  }

  // Get all public posts
  async getPublicPosts() {
    try {
      const response = await this.tablesDB.listRows({
        databaseId: this.databaseId,
        tableId: this.tableId,
        queries: [Query.equal("isPrivate", false)],
      });

      return response.rows;
    } catch (error) {
      console.error("Appwrite :: getPublicPosts :: ", error);
      throw error;
    }
  }

  // Get private posts of the logged-in user
  async getPrivatePosts(userId) {
    try {
      if (!userId) {
        return [];
      }

      const response = await this.tablesDB.listRows({
        databaseId: this.databaseId,
        tableId: this.tableId,
        queries: [
          Query.equal("isPrivate", true),
          Query.equal("userId", userId),
        ],
      });

      return response.rows;
    } catch (error) {
      console.error("Appwrite :: getPrivatePosts :: ", error);
      throw error;
    }
  }

  // Get public posts and the user's private posts
  async getPosts(userId) {
    try {
      const [privatePosts, publicPosts] = await Promise.all([
        this.getPrivatePosts(userId),
        this.getPublicPosts(),
      ]);

      return [...privatePosts, ...publicPosts];
    } catch (error) {
      console.error("Appwrite :: getPosts :: ", error);
      throw error;
    }
  }
}

// Export a singleton instance
const databasesService = new DatabaseService();

export default databasesService;
