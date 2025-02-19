import { redis } from '../redis/client'

export interface AcessInviteLinkParams {
  subscriberId: string
}

export async function acessInviteLink({ subscriberId }: AcessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
