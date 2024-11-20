# GitLab Activity Timeline

A Cloudflare Worker that generates a SVG visualization of your recent GitLab activity. Designed to be added to your GitHub profile, documentation, or anywhere else you want to showcase your GitLab contributions.

![Recent GitLab Activity](https://gitlab-heatmap-generator.kylephillips.workers.dev/)

## Features

- 🎨 Clean, simple design with a timeline visualization
- ⚡ Fast and efficient with edge caching
- 🔄 Auto-updates every hour
- 🎯 Shows your most recent GitLab activities
- 🖼️ Displays in any size while maintaining quality (SVG)

## Usage

### Quick Start

1. Add this image to your markdown:
```markdown
![GitLab Activity](https://gitlab-heatmap-generator.kylephillips.workers.dev/)
```

2. Or in HTML:
```html
<img src="https://gitlab-heatmap-generator.kylephillips.workers.dev/" alt="GitLab Activity" />
```

### Deploy Your Own

This project is currently part of my personal profile repository. Requires [Node.js](https://nodejs.org/en/download/package-manager)

```bash
git clone https://github.com/kylephillipsau/kylephillipsau
cd kylephillipsau/workers/
```

### Configuration

1. Update the `wrangler.toml` with your GitLab user ID. 
   - Find your ID by going to your GitLab profile
   - Click the Copy user ID button (nested under the three dots next to Edit Profile)
   ![GitLab Account ID](https://github.com/user-attachments/assets/0389b0f9-4a2c-4c40-8c31-1bb78d9cdd80)

```toml
[vars]
GITLAB_USERNAME = "your-user-id"
```

#### Deployment

1. Log in to Cloudflare: `npx wrangler login`
2. Deploy: `npx wrangler deploy`

## Credits

Made by [Kyle Phillips](https://kyle.au)

Built with:
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [GitLab API](https://docs.gitlab.com/ee/api/rest/)
- [SVG](https://www.w3.org/TR/SVG/)

---

Remember to star ⭐ this repo if you found it useful!
