// src/utils/formSubmission.js

/**
 * Handles contact form submissions to the API
 * @param {Object} formData - The form data to submit
 * @param {string} source - Source identifier (e.g., 'cta', 'contact-page')
 * @returns {Promise} - Promise that resolves with the response
 */
export async function submitContactForm(formData, source = 'website') {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          timestamp: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  }
  
  /**
   * Validates a contact form's data
   * @param {Object} formData - The form data to validate
   * @returns {Object} - { isValid: boolean, errors: Object }
   */
  export function validateContactForm(formData) {
    const errors = {};
    
    // Basic email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Name validation
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Name is required';
    }
    
    // Message validation
    if (!formData.message || formData.message.trim() === '') {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message is too short';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }