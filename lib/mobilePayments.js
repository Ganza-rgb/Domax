const FLUTTERWAVE_BASE = 'https://api.flutterwave.com/v3'

export async function createFlutterwavePayment(payload) {
  if (!process.env.FLUTTERWAVE_SECRET_KEY) {
    return {
      status: 'mocked',
      data: {
        link: 'https://checkout.flutterwave.com/mock',
        reference: `mock-${Date.now()}`,
      },
    }
  }

  const response = await fetch(`${FLUTTERWAVE_BASE}/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Flutterwave error: ${error}`)
  }

  return response.json()
}









