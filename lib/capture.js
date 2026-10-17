'use client'

import jsQR from 'jsqr'
import { decodePageCode } from '@/lib/scriptCodes'

/*
 * Turns one photo of an answer page into what Domax needs: a smaller
 * grayscale image to store, the page code read from it, and a quick quality
 * check so a bad photo is caught while the paper is still in hand.
 *
 * The thresholds are first guesses for the prototype and should be tuned on
 * real scripts photographed in real classrooms.
 */
const STORE_MAX_SIDE = 1600
const READ_MAX_SIDE = 1000
const DARK_BELOW = 70
const BLURRY_BELOW = 45

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('This file is not a photo Domax can read.'))
    }
    img.src = url
  })
}

function drawScaled(img, maxSide) {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return { canvas, ctx }
}

function toGray(data) {
  const gray = new Float32Array(data.length / 4)
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    gray[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
  }
  return gray
}

// Mean brightness and the variance of a Laplacian filter (a standard sharpness measure).
function measure(gray, width, height) {
  let sum = 0
  for (let i = 0; i < gray.length; i++) sum += gray[i]
  const mean = sum / gray.length

  let lapSum = 0
  let lapSq = 0
  let count = 0
  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      const i = y * width + x
      const lap = gray[i - width] + gray[i + width] + gray[i - 1] + gray[i + 1] - 4 * gray[i]
      lapSum += lap
      lapSq += lap * lap
      count++
    }
  }
  const lapMean = lapSum / count
  return { mean, sharpness: lapSq / count - lapMean * lapMean }
}

export async function processPhoto(file) {
  const img = await loadImage(file)

  // Read the code and check quality on a mid-size copy (fast enough on a phone).
  const read = drawScaled(img, READ_MAX_SIDE)
  const { data, width, height } = read.ctx.getImageData(0, 0, read.canvas.width, read.canvas.height)
  const qr = jsQR(data, width, height, { inversionAttempts: 'dontInvert' })
  const code = qr ? decodePageCode(qr.data) : null
  const gray = toGray(data)
  const { mean, sharpness } = measure(gray, width, height)

  const problems = []
  if (mean < DARK_BELOW) problems.push('too dark')
  if (sharpness < BLURRY_BELOW) problems.push('blurred')

  // Store a grayscale copy: smaller to keep and easier to read.
  const store = drawScaled(img, STORE_MAX_SIDE)
  const pixels = store.ctx.getImageData(0, 0, store.canvas.width, store.canvas.height)
  for (let i = 0; i < pixels.data.length; i += 4) {
    const g = 0.299 * pixels.data[i] + 0.587 * pixels.data[i + 1] + 0.114 * pixels.data[i + 2]
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = g
  }
  store.ctx.putImageData(pixels, 0, 0)
  const blob = await new Promise((resolve) => store.canvas.toBlob(resolve, 'image/jpeg', 0.8))

  return { blob, code, problems, rawCode: qr?.data || null }
}
