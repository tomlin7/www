import { NextResponse } from 'next/server';

const FALLBACK_VIDEOS = [
  { id: "FGBhQbmPw38", title: "Daft Punk - One More Time (Official Video)", channel: "Daft Punk", views: "450M views", thumbnail: "https://i.ytimg.com/vi/FGBhQbmPw38/hqdefault.jpg" },
  { id: "s9MszVE7aR4", title: "Daft Punk - Around The World (Official Video)", channel: "Daft Punk", views: "120M views", thumbnail: "https://i.ytimg.com/vi/s9MszVE7aR4/hqdefault.jpg" },
  { id: "5NV6Rdv1a3I", title: "Daft Punk - Get Lucky (Official Audio) ft. Pharrell Williams", channel: "Daft Punk", views: "850M views", thumbnail: "https://i.ytimg.com/vi/5NV6Rdv1a3I/hqdefault.jpg" },
  { id: "gAjR4_CbPpQ", title: "Daft Punk - Harder, Better, Faster, Stronger (Official Video)", channel: "Daft Punk", views: "180M views", thumbnail: "https://i.ytimg.com/vi/gAjR4_CbPpQ/hqdefault.jpg" },
  { id: "nAdNEsK2_54", title: "Daft Punk - Digital Love (Official Video)", channel: "Daft Punk", views: "35M views", thumbnail: "https://i.ytimg.com/vi/nAdNEsK2_54/hqdefault.jpg" },
  { id: "a5uQMwRM21U", title: "Daft Punk - Instant Crush (Official Video) ft. Julian Casablancas", channel: "Daft Punk", views: "620M views", thumbnail: "https://i.ytimg.com/vi/a5uQMwRM21U/hqdefault.jpg" },
  { id: "TBXv37CgxF8", title: "Daft Punk - Lose Yourself to Dance (Official Video)", channel: "Daft Punk", views: "110M views", thumbnail: "https://i.ytimg.com/vi/TBXv37CgxF8/hqdefault.jpg" },
  { id: "HKe37S54G00", title: "Daft Punk - Something About Us (Official Video)", channel: "Daft Punk", views: "50M views", thumbnail: "https://i.ytimg.com/vi/HKe37S54G00/hqdefault.jpg" },
];

async function getYouTubeVideos(query: string) {
  try {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const text = await res.text();
    let jsonStr = '';
    const match = text.match(/ytInitialData\s*=\s*({.+?});/);
    if (match) {
      jsonStr = match[1];
    } else {
      const matchAlt = text.match(/ytInitialData\s*=\s*({.+?})<\/script>/);
      if (matchAlt) {
        jsonStr = matchAlt[1];
      }
    }

    if (!jsonStr) return [];
    const data = JSON.parse(jsonStr);
    const videos: any[] = [];
    
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
    
    for (const item of contents) {
      if (item.videoRenderer) {
        const v = item.videoRenderer;
        const videoId = v.videoId;
        if (!videoId) continue;
        
        const title = v.title?.runs?.[0]?.text || v.title?.accessibility?.accessibilityData?.label || 'YouTube Video';
        const thumbnail = v.thumbnail?.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const channel = v.ownerText?.runs?.[0]?.text || v.shortBylineText?.runs?.[0]?.text || 'Channel';
        const views = v.shortViewCountText?.simpleText || v.viewCountText?.simpleText || 'Views';
        const published = v.publishedTimeText?.simpleText || 'Trending';
        
        videos.push({
          id: videoId,
          title,
          thumbnail,
          channel,
          views,
          published,
        });
      }
    }
    return videos;
  } catch (e) {
    console.error("YouTube search error:", e);
    return [];
  }
}

async function handleYouTubeProxy(targetUrl: string) {
  let videoId = '';
  let searchQuery = '';
  try {
    const urlObj = new URL(targetUrl);
    if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.substring(1);
    } else {
      videoId = urlObj.searchParams.get('v') || '';
    }
    searchQuery = urlObj.searchParams.get('search_query') || urlObj.searchParams.get('q') || '';
  } catch (e) {}

  let title = 'YouTube';
  let bodyContent = '';
  let videos: any[] = [];

  if (videoId) {
    title = 'Watch Video - YouTube';
    videos = await getYouTubeVideos("Daft Punk");
    if (videos.length === 0) {
      videos = FALLBACK_VIDEOS;
    }

    bodyContent = `
      <div class="watch-container">
        <div class="main-video-section">
          <div class="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
          <h1 class="video-title">Playing Video</h1>
          <div class="video-info">
            <div class="channel-info">
              <div class="channel-avatar">YT</div>
              <div>
                <div class="channel-name">YouTube Creator</div>
                <div class="sub-count">10M subscribers</div>
              </div>
            </div>
            <button class="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div class="sidebar-section">
          <h2>Recommended Videos</h2>
          <div class="sidebar-grid">
            ${videos.map(v => `
              <a href="/api/proxy?url=${encodeURIComponent('https://www.youtube.com/watch?v=' + v.id)}" class="sidebar-card">
                <div class="sidebar-thumb" style="background-image: url('${v.thumbnail}')"></div>
                <div class="sidebar-details">
                  <div class="sidebar-title">${v.title}</div>
                  <div class="sidebar-channel">${v.channel}</div>
                  <div class="sidebar-views">${v.views}</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    const queryToUse = searchQuery || 'Daft Punk';
    title = searchQuery ? `${searchQuery} - YouTube Search` : 'YouTube';
    videos = await getYouTubeVideos(queryToUse);
    if (videos.length === 0) {
      videos = FALLBACK_VIDEOS;
    }

    bodyContent = `
      <div class="feed-container">
        <h2 class="section-title">${searchQuery ? `Search Results for "${searchQuery}"` : 'Trending music videos'}</h2>
        <div class="video-grid">
          ${videos.map(v => `
            <a href="/api/proxy?url=${encodeURIComponent('https://www.youtube.com/watch?v=' + v.id)}" class="video-card">
              <div class="video-thumbnail" style="background-image: url('${v.thumbnail}')">
                <div class="play-overlay">▶</div>
              </div>
              <div class="video-details">
                <div class="video-avatar">YT</div>
                <div class="video-meta">
                  <div class="video-title">${v.title}</div>
                  <div class="video-channel">${v.channel}</div>
                  <div class="video-views">${v.views} • ${v.published || 'Trending'}</div>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: #0f0f0f;
          color: #f1f1f1;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding-bottom: 40px;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        header {
          position: sticky;
          top: 0;
          background-color: #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          z-index: 100;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: -0.5px;
          color: #ffffff;
        }
        .logo-icon {
          width: 32px;
          height: 22px;
          background-color: #ff0000;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
        }
        .search-form {
          display: flex;
          flex: 0 1 500px;
          background-color: #222222;
          border: 1px solid #333333;
          border-radius: 40px;
          overflow: hidden;
        }
        .search-input {
          flex: 1;
          background: none;
          border: none;
          padding: 10px 20px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
        }
        .search-btn {
          background-color: #303030;
          border: none;
          color: #ffffff;
          padding: 0 20px;
          cursor: pointer;
          font-size: 16px;
          border-left: 1px solid #444444;
        }
        .search-btn:hover {
          background-color: #404040;
        }
        .profile-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #ff3b30;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .feed-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        .section-title {
          font-size: 22px;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }
        .video-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .video-card:hover {
          transform: scale(1.02);
        }
        .video-thumbnail {
          width: 100%;
          aspect-ratio: 16/9;
          background-size: cover;
          background-position: center;
          background-color: #1a1a1a;
          border-radius: 12px;
          position: relative;
        }
        .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 12px;
        }
        .video-card:hover .play-overlay {
          opacity: 1;
        }
        .video-details {
          display: flex;
          gap: 12px;
          padding: 0 4px;
        }
        .video-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #444;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
          font-weight: bold;
        }
        .video-title {
          font-size: 15px;
          font-weight: 600;
          color: #f1f1f1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
          margin-bottom: 4px;
        }
        .video-channel, .video-views {
          font-size: 13px;
          color: #aaa;
        }
        .watch-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        @media (max-width: 850px) {
          .watch-container {
            grid-template-columns: 1fr;
          }
        }
        .main-video-section {
          display: flex;
          flex-direction: column;
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 12px;
          background-color: black;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .watch-container .video-title {
          font-size: 20px;
          font-weight: 700;
          margin-top: 16px;
          margin-bottom: 12px;
          -webkit-line-clamp: unset;
        }
        .video-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .channel-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .channel-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .channel-name {
          font-weight: 600;
          font-size: 15px;
        }
        .sub-count {
          font-size: 12px;
          color: #aaa;
        }
        .subscribe-btn {
          background-color: #ffffff;
          color: #000000;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }
        .subscribe-btn:hover {
          background-color: #e6e6e6;
        }
        .sidebar-section h2 {
          font-size: 18px;
          margin-bottom: 16px;
        }
        .sidebar-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sidebar-card {
          display: flex;
          gap: 10px;
          transition: transform 0.2s;
        }
        .sidebar-card:hover {
          transform: translateX(4px);
        }
        .sidebar-thumb {
          width: 120px;
          aspect-ratio: 16/9;
          background-size: cover;
          background-position: center;
          background-color: #1a1a1a;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .sidebar-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .sidebar-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.25;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sidebar-channel, .sidebar-views {
          font-size: 12px;
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <header>
        <a href="/api/proxy?url=${encodeURIComponent('https://www.youtube.com')}" class="logo-section">
          <div class="logo-icon">▶</div>
          <span>YouTube</span>
        </a>
        <form class="search-form" method="GET" action="/api/proxy">
          <input type="hidden" name="url" value="https://www.youtube.com/results" />
          <input type="text" name="search_query" class="search-input" placeholder="Search YouTube" value="${searchQuery}" required />
          <button type="submit" class="search-btn">🔍</button>
        </form>
        <div class="profile-btn">U</div>
      </header>
      ${bodyContent}
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  if (targetUrl.includes('youtube.com') || targetUrl.includes('youtu.be')) {
    return handleYouTubeProxy(targetUrl);
  }

  if (targetUrl.includes('google.com')) {
    try {
      const urlObj = new URL(targetUrl);
      urlObj.searchParams.set('gbv', '1');
      targetUrl = urlObj.toString();
    } catch (e) {}
  }

  try {
    const targetUrlObj = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'url') {
        targetUrlObj.searchParams.set(key, value);
      }
    });
    targetUrl = targetUrlObj.toString();
  } catch (e) {}

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    const contentType = response.headers.get('content-type') || '';

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

    html = html.replace(/(src=["'])(?!https?:\/\/|data:|\/\/)([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullPath = p2.startsWith('/') ? p2 : `/${p2}`;
      return `${p1}${origin}${fullPath}${p3}`;
    });

    html = html.replace(/(href=["'])(?!https?:\/\/|data:|\/\/|#)([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullPath = p2.startsWith('/') ? p2 : `/${p2}`;
      const fullUrl = `${origin}${fullPath}`;
      if (match.includes('rel="stylesheet"') || match.includes('rel="icon"') || match.includes('rel="apple-touch-icon"')) {
        return `${p1}${fullUrl}${p3}`;
      }
      return `${p1}/api/proxy?url=${encodeURIComponent(fullUrl)}${p3}`;
    });

    html = html.replace(/(href=["'])(https?:\/\/[^"']*)(["'])/g, (match, p1, p2, p3) => {
      if (p2.includes('/api/proxy')) return match;
      return `${p1}/api/proxy?url=${encodeURIComponent(p2)}${p3}`;
    });

    html = html.replace(/(href=["'])\/\/([^"']*)(["'])/g, (match, p1, p2, p3) => {
      const fullUrl = `https://${p2}`;
      return `${p1}/api/proxy?url=${encodeURIComponent(fullUrl)}${p3}`;
    });

    html = html.replace(/(<form[^>]*action=["'])([^"']*)(["'][^>]*>)/g, (match, p1, p2, p3) => {
      let fullUrl = p2;
      if (!p2.startsWith('http://') && !p2.startsWith('https://')) {
        fullUrl = p2.startsWith('/') ? `${origin}${p2}` : `${origin}/${p2}`;
      }
      return `${p1}/api/proxy${p3}<input type="hidden" name="url" value="${fullUrl}" />`;
    });

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
