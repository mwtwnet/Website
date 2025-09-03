import { NextResponse } from 'next/server'
import path from 'path'
import { readFileSync } from 'fs'

// Verify Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY
    
    if (!secretKey) {
        console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
        return true // Allow in development if not configured
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
            }),
        })

        const data = await response.json()
        return data.success === true
    } catch (error) {
        console.error('Turnstile verification error:', error)
        return false
    }
}

export async function GET(request: Request) {
    try {
        // Skip Turnstile verification in development
        // if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
        //     const response = await fetch('http://localhost:3000/api/shards')
        //     const data = await response.json()
        //     return NextResponse.json(data)
        // }

        // Extract Turnstile token from headers
        const url = new URL(request.url)
        const turnstileToken = url.searchParams.get('cf-turnstile-response') || 
                                                    request.headers.get('cf-turnstile-response')

        const skipVerification = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY === '1x00000000000000000000AA'

        // Verify the Turnstile token
        if (!skipVerification) {
            if (!turnstileToken) {
                return NextResponse.json(
                    { error: 'Turnstile verification required' },
                    { status: 401 }
                )
            }
            const isValid = await verifyTurnstileToken(turnstileToken)

            if (!isValid) {
                return NextResponse.json(
                    { error: 'Invalid Turnstile token' },
                    { status: 403 }
                )
            }
        }

        // If verification passed, fetch the data
        const dataUrl = skipVerification ? "http://192.168.28.54:20000/api/shards" : "http://192.168.28.54:20000/api/shards"

        const response = await fetch(dataUrl).catch((error) => {
            // console.error('Error fetching shard data:', error)
            return null
        })

        if (!response) {
            return NextResponse.json(
                { error: 'Failed to fetch shard data' },
                { status: 500 }
            )
        }

        const data = await response.json()
        
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error reading status data:', error)
        return NextResponse.json(
            { error: 'Failed to load status data' },
            { status: 500 }
        )
    }
}
