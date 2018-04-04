import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should increase after upvote', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should raise voteChanged event when upvoted', () => {
    let totalvotes;
    component.voteChanged.subscribe(v => {
      totalvotes = v;
    });

    component.upVote();

    expect(totalvotes).toBe(1);
  });
});
