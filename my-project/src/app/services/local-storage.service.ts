import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

    // Save data to localStorage
    saveData(key: string, value: any): void {
      try {
        const clonedValue = structuredClone(value); // Prevent circular structure error
        localStorage.setItem(key, JSON.stringify(clonedValue));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  
    // Get data from localStorage
    getData(key: string): any {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
      }
    }
  
    // Remove data from localStorage
    removeData(key: string): void {
      localStorage.removeItem(key);
    }

    clearAll(): void {
      localStorage.clear();
    }
    
  }