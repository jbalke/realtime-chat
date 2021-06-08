import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({description: 'A message post'})
export class Message {
  @Field(type => Int)
  id: number;
  @Field()
  user: string;
  @Field()
  content: string;
}