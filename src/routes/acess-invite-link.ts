import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/acess-invite-link'
// import { redis } from '../redis/client'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Acess invite link and redirect user',
        tags: ['referral'],
        description: 'Acess invite link and redirect user',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            inviteLink: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      console.log(subscriberId)

      await acessInviteLink({ subscriberId })
    //   console.log('acessInviteLink', await redis.hgetall('referral:acess-count'))

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
