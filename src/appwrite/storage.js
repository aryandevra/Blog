import { Client, ID, Storage } from 'appwrite';

import config from '../config/config';

export class StorageService {
  // Initialize Appwrite client and storage service
  client = new Client();
  storage;

  // Store storage configuration
  bucketId = config.appwriteBucketId;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  // Upload a file to the storage bucket
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: this.bucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error('Appwrite :: uploadFile :: ', error);
      throw error;
    }
  }

  // Delete a file from the storage bucket
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: this.bucketId,
        fileId,
      });
    } catch (error) {
      console.error('Appwrite :: deleteFile :: ', error);
      throw error;
    }
  }

  // Replace an existing file
  async updateFile(fileId, file) {
    try {
      return await this.storage.updateFile({
        bucketId: this.bucketId,
        fileId,
        file,
      });
    } catch (error) {
      console.error('Appwrite :: updateFile :: ', error);
      throw error;
    }
  }

  // Get a preview URL for a file
  // Note: Image transformations require a paid Appwrite plan
  // async getFilePreview(fileId) {
  //   try {
  //     return await this.storage.getFilePreview({
  //       bucketId: this.bucketId,
  //       fileId,
  //       quality: 30,
  //     });
  //   } catch (error) {
  //     console.error("Appwrite :: getFilePreview :: ", error);
  //     throw error;
  //   }
  // }

  // Get a direct view URL for a file
  async getFileView(fileId) {
    try {
      return await this.storage.getFileView({
        bucketId: this.bucketId,
        fileId,
      });
    } catch (error) {
      console.error('Appwrite :: getFileView :: ', error);
      throw error;
    }
  }
}

// Export a singleton instance
const storageService = new StorageService();

export default storageService;
