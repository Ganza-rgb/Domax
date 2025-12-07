/**
 * Script to remove backgrounds from images using Remove.bg API
 * 
 * Usage:
 *   node scripts/remove-background.js <input-image> <output-image> [api-key]
 * 
 * Or set REMOVE_BG_API_KEY environment variable
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const apiKey = process.env.REMOVE_BG_API_KEY || process.argv[4]
const inputPath = process.argv[2]
const outputPath = process.argv[3]

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/remove-background.js <input-image> <output-image> [api-key]')
  console.error('Or set REMOVE_BG_API_KEY environment variable')
  process.exit(1)
}

if (!apiKey) {
  console.error('Error: API key required. Set REMOVE_BG_API_KEY or pass as argument')
  process.exit(1)
}

if (!fs.existsSync(inputPath)) {
  console.error(`Error: Input file not found: ${inputPath}`)
  process.exit(1)
}

const imageData = fs.readFileSync(inputPath)

const options = {
  hostname: 'api.remove.bg',
  path: '/v1.0/removebg',
  method: 'POST',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': imageData.length,
  },
}

const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2)
const formData = `--${boundary}\r\nContent-Disposition: form-data; name="image_file"; filename="${path.basename(inputPath)}"\r\nContent-Type: image/png\r\n\r\n${imageData.toString('binary')}\r\n--${boundary}--\r\n`

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Error: API returned status ${res.statusCode}`)
    res.pipe(process.stderr)
    return
  }

  const outputDir = path.dirname(outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const fileStream = fs.createWriteStream(outputPath)
  res.pipe(fileStream)

  fileStream.on('finish', () => {
    console.log(`✅ Background removed! Saved to: ${outputPath}`)
  })
})

req.on('error', (error) => {
  console.error('Error:', error.message)
})

// For binary data, we need to send it properly
const FormData = require('form-data')
const form = new FormData()
form.append('image_file', fs.createReadStream(inputPath))

form.submit(
  {
    host: 'api.remove.bg',
    path: '/v1.0/removebg',
    headers: {
      'X-Api-Key': apiKey,
    },
  },
  (err, res) => {
    if (err) {
      console.error('Error:', err.message)
      return
    }

    if (res.statusCode !== 200) {
      let errorData = ''
      res.on('data', (chunk) => {
        errorData += chunk
      })
      res.on('end', () => {
        console.error(`Error: API returned status ${res.statusCode}`)
        console.error(errorData)
      })
      return
    }

    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const fileStream = fs.createWriteStream(outputPath)
    res.pipe(fileStream)

    fileStream.on('finish', () => {
      console.log(`✅ Background removed! Saved to: ${outputPath}`)
    })
  }
)











