import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {

  let com: VoteComponent;
  beforeEach (() => {
    com = new VoteComponent();
  });

  it('total votes should increase if upvote', () => {
    com.upVote();
    expect(com.totalVotes).toBe(1);
  });

  it('total votes should decrease if downvote', () => {
    com.downVote();
    expect(com.totalVotes).toBe(-1);
  });
});
