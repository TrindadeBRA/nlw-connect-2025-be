import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}
export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 } //indice começa em 0 por isso somamos 1
}
