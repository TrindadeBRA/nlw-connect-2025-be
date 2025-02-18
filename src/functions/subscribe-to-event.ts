import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

export interface SubscribeToEventParams {
  email: string
  name: string
}

export async function subscribeToEvent({ email, name }: SubscribeToEventParams) {

  const result = await db.insert(subscriptions).values({
    email,
    name,
  }).returning()

  const subscription = result[0]

  return {
    subscriberId: subscription.id,
  }
}
