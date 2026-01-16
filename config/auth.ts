import type { GitLabAuthConfig } from '@/types/auth'

const config: GitLabAuthConfig = {
  enabled: true,
  clientId: process.env.GITLAB_CLIENT_ID || '',
  clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
  baseUrl: process.env.GITLAB_BASE_URL || 'https://gitlab.com',
  redirectUri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/gitlab/callback`,
}

if (process.env.NEXT_PUBLIC_GITLAB_AUTH_ENABLED === 'true') {
  config.enabled = true
}

export const getGitLabAuthConfig = (): GitLabAuthConfig => {
  return config
}

export const isGitLabAuthEnabled = (): boolean => {
  return getGitLabAuthConfig().enabled
}

export const validateGitLabConfig = (config: GitLabAuthConfig): boolean => {
  if (!config.enabled) {
    return true
  }

  return !!(config.clientId && config.clientSecret && config.baseUrl)
}
