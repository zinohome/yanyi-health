import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // 排除 Payload 后台(admin)、API、Next 内部与静态资源
  matcher: ['/((?!admin|api|_next|_payload|.*\\..*).*)'],
}
