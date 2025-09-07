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

    if (!token || token.trim() === '') {
        console.warn('Empty or invalid token provided')
        return false
    }

    try {
        console.log('Verifying Turnstile token...')
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }).toString(),
        })

        if (!response.ok) {
            console.error('Turnstile API request failed:', response.status, response.statusText)
            return false
        }

        const data = await response.json()
        console.log('Turnstile verification response:', data)
        
        if (data.success === true) {
            console.log('Turnstile verification successful')
            return true
        } else {
            console.warn('Turnstile verification failed:', data['error-codes'] || 'Unknown error')
            return false
        }
    } catch (error) {
        console.error('Turnstile verification error:', error)
        return false
    }
}

export async function GET(request: Request) {
    try {
        // Extract Turnstile token from headers
        const url = new URL(request.url)
        const turnstileToken = url.searchParams.get('cf-turnstile-response') || 
                                                    request.headers.get('cf-turnstile-response')

        const skipVerification = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY === '1x00000000000000000000AA' ||
                                process.env.NODE_ENV === 'development'

        console.log('API Request received:', {
            hasToken: !!turnstileToken,
            tokenLength: turnstileToken?.length,
            skipVerification,
            nodeEnv: process.env.NODE_ENV
        })

        // Verify the Turnstile token
        if (!skipVerification) {
            if (!turnstileToken) {
                console.warn('No Turnstile token provided')
                return NextResponse.json(
                    { error: 'Turnstile verification required' },
                    { status: 401 }
                )
            }
            
            const isValid = await verifyTurnstileToken(turnstileToken)

            if (!isValid) {
                console.warn('Turnstile token verification failed')
                return NextResponse.json(
                    { error: 'Invalid Turnstile token' },
                    { status: 403 }
                )
            }
            
            console.log('Turnstile verification passed')
        } else {
            console.log('Skipping Turnstile verification (development mode)')
        }

        // If verification passed, fetch the data
        const dataUrl = "http://192.168.28.54:20000/api/shards"
        console.log('Fetching data from:', dataUrl)

        const response = await fetch(dataUrl, {
            headers: {
                'User-Agent': 'FrogMusic-Status-Dashboard'
            }
        }).catch((error) => {
            console.error('Error fetching shard data:', error)
            return null
        })

        if (!response) {
            console.error('Failed to fetch data - no response')
            return NextResponse.json(
                { error: 'Failed to fetch shard data - service unavailable' },
                { status: 500 }
            )
        }

        if (!response.ok) {
            console.error('API response not ok:', response.status, response.statusText)
            return NextResponse.json(
                { error: `Shard API returned ${response.status}` },
                { status: 500 }
            )
        }

        const data = await response.json()
        console.log('Data fetched successfully, clusters:', data.totalClusters || 'unknown')
        
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in API route:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
