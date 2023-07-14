import { parseParametersFromURL } from '../src/lib/helpers'

describe('parseParametersFromURL', () => {
  it('should parse parameters from a URL with query params only', () => {
    const url = new URL('https://supabase.com')
    url.searchParams.set('a', 'b')
    url.searchParams.set('b', 'c')

    const result = parseParametersFromURL(url.href)
    expect(result).toMatchObject({
      a: 'b',
      b: 'c',
    })
  })

  it('should parse parameters from a URL with fragment params only', () => {
    const url = new URL('https://supabase.com')
    const fragmentParams = new URLSearchParams({ a: 'b', b: 'c' })
    url.hash = fragmentParams.toString()

    const result = parseParametersFromURL(url.href)
    expect(result).toMatchObject({
      a: 'b',
      b: 'c',
    })
  })

  it('should parse parameters from a URL with both query params and fragment params', () => {
    const url = new URL('https://supabase.com')
    url.searchParams.set('a', 'b')
    url.searchParams.set('b', 'c')

    const fragmentParams = new URLSearchParams({ d: 'e' })
    url.hash = fragmentParams.toString()

    const result = parseParametersFromURL(url.href)
    expect(result).toMatchObject({
      a: 'b',
      b: 'c',
      d: 'e',
    })
  })
})
