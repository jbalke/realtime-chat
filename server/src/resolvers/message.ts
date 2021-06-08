import { Arg, Field, ID, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";

@InputType({description: 'New message data'})
class PostMessageInput implements Partial<Message> {
  @Field()
  user: string;
  @Field()
  content: string;
}
  
@Resolver()
export class MessageResolver {
  private messageStore: Message[] = [];

  @Mutation(returns => Int)
  async postMessage(@Arg("data") {user, content}: PostMessageInput): Promise<number> {
    const id = this.messageStore.length;
    this.messageStore.push({ id, user, content });
    return id;
  }
  
  @Query(returns => [Message])
  async messages() {
    return await this.messageStore;
  }

  
}