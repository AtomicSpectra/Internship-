import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const query = (body?.query as string | undefined)?.trim()
    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      const refined = query
        .split(' ')
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
        .join(' ')
      return NextResponse.json({ result: `AI Response (offline): ${refined}.` })
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You refine writing with clear, structured, actionable feedback.' },
          {
            role: 'user',
            content:
              `Refine the following text and provide a cohesive, improved version. Keep the original meaning but enhance clarity, grammar, and flow. Then provide 3 bullet-point suggestions for improvement.\n\nText:\n${query}`,
          },
        ],
        temperature: 0.5,
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: 'Upstream error', details: text }, { status: 502 })
    }
    const data = await resp.json()
    const result = data?.choices?.[0]?.message?.content || 'No response'
    return NextResponse.json({ result })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}


