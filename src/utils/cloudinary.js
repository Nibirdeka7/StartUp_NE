// src/utils/cloudinary.js

/**
 * Upload file to Cloudinary (client-side only)
 * @param {File} file - The file to upload
 * @param {string} folder - Cloudinary folder path
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Upload result
 */
export const uploadToCloudinary = async (file, folder = 'startups', options = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);
  
  // Add optional parameters
  if (options.tags) {
    formData.append('tags', options.tags);
  }
  
  if (options.transformation) {
    formData.append('transformation', options.transformation);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    return {
      url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
      created_at: data.created_at,
      original_filename: data.original_filename,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Upload multiple files
 * @param {File[]} files - Array of files
 * @param {string} folder - Target folder
 * @returns {Promise<Array>}
 */
export const uploadMultipleToCloudinary = async (files, folder = 'startups') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};

/**
 * Generate optimized image URL
 * @param {string} url - Original Cloudinary URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return '';
  
  // If it's already a Cloudinary URL, insert transformations
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const base = parts[0] + '/upload/';
      const filename = parts[1];
      
      // Build transformation string
      const transformations = [];
      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.crop) transformations.push(`c_${options.crop}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      if (options.format) transformations.push(`f_${options.format}`);
      
      const transformationString = transformations.length > 0 
        ? `${transformations.join(',')}/` 
        : '';
      
      return base + transformationString + filename;
    }
  }
  
  return url;
};

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result
 */
export const validateFile = (file, rules = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf']
  } = rules;
  
  const errors = [];
  
  // Check size
  if (file.size > maxSize) {
    errors.push(`File too large. Max size: ${maxSize / (1024 * 1024)}MB`);
  }
  
  // Check MIME type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
  }
  
  // Check extension
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
    errors.push(`Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    file
  };
};

/**
 * Create image preview URL (for UI before upload)
 * @param {File} file - Image file
 * @returns {Promise<string>} Preview URL
 */
export const createPreviewUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

/**
 * Upload with progress tracking
 * @param {File} file - File to upload
 * @param {string} folder - Target folder
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>}
 */
export const uploadWithProgress = (file, folder = 'startups', onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => reject(new Error('Upload failed')));
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);
    
    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
    );
    xhr.send(formData);
  });
};
export const uploadDPIITCertificate = async (file, startupName) => {
  try {
    if (!file) return null;
    
    const result = await uploadToCloudinary(
      file, 
      'startups/dpiit-certificates',
      {
        tags: `${startupName.toLowerCase().replace(/\s+/g, '-')}-dpiit`
      }
    );
    
    return result.url;
  } catch (error) {
    console.error("Error uploading DPIIT certificate:", error);
    throw new Error("Failed to upload DPIIT certificate");
  }
};
// Export as default
const cloudinary = {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  getOptimizedImageUrl,
  validateFile,
  createPreviewUrl,
  uploadWithProgress,
  uploadDPIITCertificate
};

export default cloudinary;