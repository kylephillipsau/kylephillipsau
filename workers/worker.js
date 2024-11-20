export default {
  async fetch(request, env, ctx) {
    const gitlabUsername = '8801313';
    const gitlabApiUrl = `https://gitlab.com/api/v4/users/${gitlabUsername}/events`;
    
    try {
      const response = await fetch(gitlabApiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch GitLab data');
      }
      const events = await response.json();
      
      const svg = generateTimelineSvg(events);
      
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=300',
        },
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.valueOf() - date.valueOf();
  const days = Math.floor(diff / 86400000);

  if (days === 0) {
    return 'today';
  } else if (days === 1) {
    return 'yesterday';
  } else {
    return `${days}d ago`;
  }
}

function generateTimelineSvg(events) {
  const width = 800;
  const height = 100;
  const padding = 60;
  const maxEvents = 8;
  const recentEvents = events.slice(0, maxEvents);
  
  let svg = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 ${width} ${height}"
      style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"
    >
      <!-- Background Rectangle -->
      <rect
        x="1"
        y="1"
        width="${width - 2}"
        height="${height - 2}"
        rx="8"
        fill="white"
        stroke="#e5e7eb"
        stroke-width="1"
      />

      <defs>
        <linearGradient id="eventGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Title -->
      <text
        x="${padding}"
        y="${padding / 2}"
        font-size="14"
        font-weight="500"
        fill="#1f2937"
      >Recent GitLab Activity</text>

      <!-- Timeline line -->
      <line 
        x1="${padding}" 
        y1="60" 
        x2="${width - padding}" 
        y2="60" 
        stroke="#e5e7eb" 
        stroke-width="2"
      />

      <!-- Event markers and dates -->
      ${recentEvents.map((event, index) => {
        const x = padding + (index * (width - padding * 2) / (Math.max(recentEvents.length - 1, 1)));
        const date = formatDate(event.created_at);
        
        return `
          <g>
            <circle 
              cx="${x}" 
              cy="60" 
              r="4" 
              fill="url(#eventGradient)"
            />
            <text 
              x="${x}" 
              y="80" 
              font-size="11" 
              fill="#6b7280" 
              text-anchor="middle"
            >${date}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;

  return svg;
}
