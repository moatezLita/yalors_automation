// src/utils/contactLogger.js
import fs from 'fs';
import path from 'path';

/**
 * Simple utility to log contact form submissions to a file
 * This is a temporary solution until a proper backend is implemented
 */
export function logContactSubmission(data) {
  try {
    // Define the log file path
    const logFilePath = path.join(process.cwd(), 'contact-submissions.json');
    
    // Create a collection if it doesn't exist yet
    let submissions = [];
    
    // Read existing submissions if file exists
    if (fs.existsSync(logFilePath)) {
      const fileContent = fs.readFileSync(logFilePath, 'utf8');
      submissions = JSON.parse(fileContent);
    }
    
    // Add the new submission with timestamp
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    
    // Write back to file
    fs.writeFileSync(logFilePath, JSON.stringify(submissions, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error logging contact submission:', error);
    return false;
  }
}

/**
 * Retrieve all logged submissions
 * For admin purposes only
 */
export function getContactSubmissions() {
  try {
    const logFilePath = path.join(process.cwd(), 'contact-submissions.json');
    
    if (!fs.existsSync(logFilePath)) {
      return [];
    }
    
    const fileContent = fs.readFileSync(logFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return [];
  }
}