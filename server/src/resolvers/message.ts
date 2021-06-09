import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription, PubSub, Root, PubSubEngine
} from 'type-graphql';
import { Message } from '../entities/Message';

const channel = 'CHAT_CHANNEL';

@InputType({ description: 'New message data' })
class PostMessageInput implements Partial<Message> {
  @Field()
  user: string;
  @Field()
  content: string;
}

@Resolver()
export class MessageResolver {
  private messageStore: Message[] = [];

  @Mutation((returns) => Int)
  async postMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('data') { user, content }: PostMessageInput
  ): Promise<number> {
    const id = this.messageStore.length;
    const message = { id, user, content };
    this.messageStore.push(message);
    await pubSub.publish(channel, message);
    return id;
  }

  @Query((returns) => [Message])
  async messages() {
    return await this.messageStore;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() messageSentPayload: Message): Message {
    return messageSentPayload;
  }
}
