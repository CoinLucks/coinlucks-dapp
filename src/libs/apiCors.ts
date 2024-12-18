import type { NextApiResponse } from "next"

/**
 * Enables CORS for a NextJS API endpoint response.
 * @link https://vercel.com/guides/how-to-enable-cors#enabling-cors-in-a-next.js-app
 */
export function enableCors(res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )
  }
  