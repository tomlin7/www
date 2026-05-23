import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // Prepend protocol if missing
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  // Auto-inject legacy HTML parameter for Google to avoid complex JS blocking framing
  if (targetUrl.includes('google.com')) {
    try {
      const urlObj = new URL(targetUrl);
      urlObj.searchParams.set('gbv', '1');
      targetUrl = urlObj.toString();
    } catch (e) {
      // Ignore URL parsing errors
    }
  }

  try {
    // Append any extra search parameters (e.g. from GET forms) back to the target URL
    const targetUrlObj = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'url') {
        targetUrlObj.searchParams.set(key, value);
      }
    });
    targetUrl = targetUrlObj.toString();
  } catch (e) {
    // Ignore URL parsing errors
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    const contentType = response.headers.get('content-type') || '';

    // If the response is not HTML (e.g., CSS, JS, images), return it directly
    if (!contentType.includes('text/html')) {
      const blob = await response.blob();
      return new NextResponse(blob, {
        headers: {
          'Content-Type': contentType,
        },
      });
    }

    let html = await response.text();
    const urlObj = new URL(targetUrl);
    const origin = urlObj.origin;

    // 1. Rewrite relative src links to absolute links (pointing to original site)
    html = html.replace(/(src=["'])(?!https?:\/\/|data:|\/\/)([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullPath = p2.startsWith('/') ? p2 : `/${p2}`;
      return `${p1}${origin}${fullPath}${p3}`;
    });

    // 2. Rewrite relative href links to absolute links pointing to original site
    // (except for links that should go through the proxy)
    // E.g., <link href="/styles.css"> -> href="https://site.com/styles.css"
    html = html.replace(/(href=["'])(?!https?:\/\/|data:|\/\/|#)([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullPath = p2.startsWith('/') ? p2 : `/${p2}`;
      const fullUrl = `${origin}${fullPath}`;
      // Stylesheets, icons, and preloads can load directly from origin;
      // navigation links and anchor tags should route through the proxy
      if (match.includes('rel="stylesheet"') || match.includes('rel="icon"') || match.includes('rel="apple-touch-icon"')) {
        return `${p1}${fullUrl}${p3}`;
      }
      return `${p1}/api/proxy?url=${encodeURIComponent(fullUrl)}${p3}`;
    });

    // 3. Rewrite absolute href links to route through our proxy
    html = html.replace(/(href=["'])(https?:\/\/[^"']*)(["'])/g, (match, p1, p2, p3) => {
      // Don't proxy if it is already our proxy
      if (p2.includes('/api/proxy')) return match;
      return `${p1}/api/proxy?url=${encodeURIComponent(p2)}${p3}`;
    });

    // 4. Rewrite protocol-relative href links (//example.com) to route through our proxy
    html = html.replace(/(href=["'])\/\/([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullUrl = `https://${p2}`;
      return `${p1}/api/proxy?url=${encodeURIComponent(fullUrl)}${p3}`;
    });

    // 5. Rewrite form action attributes so they submit through the proxy with url payload
    html = html.replace(/(<form[^>]*action=["'])([^"']*)(["'][^>]*>)/g, (match, p1, p2, p3) => {
      let fullUrl = p2;
      if (!p2.startsWith('http://') && !p2.startsWith('https://')) {
        fullUrl = p2.startsWith('/') ? `${origin}${p2}` : `${origin}/${p2}`;
      }
      return `${p1}/api/proxy${p3}<input type="hidden" name="url" value="${fullUrl}" />`;
    });

    // Remove meta tags attempting Content-Security-Policy or X-Frame-Options inside the page
    html = html.replace(/<meta[^>]*http-equiv=["']?content-security-policy["']?[^>]*>/gi, '');
    html = html.replace(/<meta[^>]*http-equiv=["']?x-frame-options["']?[^>]*>/gi, '');

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    return new NextResponse(`Proxy error: ${error}`, { status: 500 });
  }
}
