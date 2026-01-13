import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO } from '@/config'
import { getGitLabAuthConfig } from '@/config/auth'
import type { GitLabUser } from '@/types/auth'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const config = getGitLabAuthConfig()

  // 检查是否有GitLab认证用户
  const gitlabUserCookie = request.cookies.get('gitlab_user')?.value

  if (config.enabled && gitlabUserCookie) {
    try {
      const gitlabUser: GitLabUser = JSON.parse(gitlabUserCookie)
      // 使用GitLab用户ID作为用户标识
      const user = `${userPrefix}gitlab_${gitlabUser.id}_${gitlabUser.username}`
      return {
        sessionId: `gitlab_${gitlabUser.id}`,
        user,
      }
    } catch (error) {
      console.error('Failed to parse GitLab user cookie:', error)
      // 回退到匿名用户
    }
  }

  // 匿名用户（原有逻辑）
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
