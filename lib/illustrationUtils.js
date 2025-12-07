/**
 * Utility functions for handling illustrations
 */

/**
 * Get the path to an illustration
 * @param {string} category - Category folder (onboarding, features, etc.)
 * @param {string} filename - Name of the illustration file
 * @returns {string} - Path to the illustration
 */
export function getIllustrationPath(category, filename) {
  return `/illustrations/${category}/${filename}`
}

/**
 * Common illustration paths for quick access
 */
export const illustrationPaths = {
  // Onboarding
  signup: getIllustrationPath('onboarding', 'signup.svg'),
  login: getIllustrationPath('onboarding', 'login.svg'),
  
  // Features
  automatedGrading: getIllustrationPath('features', 'automated-grading.svg'),
  rubricScoring: getIllustrationPath('features', 'rubric-scoring.svg'),
  analytics: getIllustrationPath('features', 'analytics.svg'),
  
  // Educational
  teacher: getIllustrationPath('educational', 'teacher.svg'),
  student: getIllustrationPath('educational', 'student.svg'),
  
  // Empty states
  noPapers: getIllustrationPath('empty-states', 'no-papers.svg'),
  noResults: getIllustrationPath('empty-states', 'no-results.svg'),
}

/**
 * Remove background using Remove.bg API
 * Note: Requires API key in environment variables
 * @param {File|string} image - Image file or URL
 * @param {string} apiKey - Remove.bg API key
 * @returns {Promise<Blob>} - Image with background removed
 */
export async function removeBackground(image, apiKey) {
  const formData = new FormData()
  
  if (image instanceof File) {
    formData.append('image_file', image)
  } else {
    formData.append('image_url', image)
  }
  
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
    },
    body: formData,
  })
  
  if (!response.ok) {
    throw new Error(`Background removal failed: ${response.statusText}`)
  }
  
  return await response.blob()
}

/**
 * Optimize image for web
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} quality - JPEG quality (0-1) or PNG compression
 * @returns {Promise<File>} - Optimized image file
 */
export async function optimizeImage(file, maxWidth = 1920, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(optimizedFile)
          },
          file.type,
          quality
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}











