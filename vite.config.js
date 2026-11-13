import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.ANTHROPIC_API_KEY) {
    process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
  }
  if (env.ASK_KAVI_MODEL) {
    process.env.ASK_KAVI_MODEL = env.ASK_KAVI_MODEL
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-ask-kavi-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/ask-kavi', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }
            let bodyText = ''
            req.on('data', (chunk) => {
              bodyText += chunk
            })
            req.on('end', async () => {
              try {
                req.body = JSON.parse(bodyText || '{}')
              } catch {
                req.body = {}
              }
              res.status = (code) => {
                res.statusCode = code
                return res
              }
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
              try {
                const apiModule = await import('./api/ask-kavi.js')
                await apiModule.default(req, res)
              } catch (err) {
                console.error('Local API error:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  }
})

