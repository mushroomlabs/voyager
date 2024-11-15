import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { happyOutline } from "ionicons/icons";
import { PostView } from "lemmy-js-client";

import Ago from "#/features/labels/Ago";
import Edited from "#/features/labels/Edited";
import Vote from "#/features/labels/Vote";

import Stat from "./Stat";
import TimeStat from "./TimeStat";

export const sharedStatsClass = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Container = styled.div`
  font-size: 0.8rem;
  color: var(--ion-color-text-aside);
`;

interface StatsProps {
  post: PostView;
}

export default function Stats({ post }: StatsProps) {
  return (
    <Container className={sharedStatsClass}>
      <Vote item={post} />
      <Stat icon={happyOutline}>
        {Math.round(
          (post.counts.upvotes + post.counts.downvotes
            ? post.counts.upvotes /
              (post.counts.upvotes + post.counts.downvotes)
            : 1) * 100,
        )}
        %
      </Stat>
      <TimeStat>
        <Ago date={post.post.published} />
      </TimeStat>
      <Edited item={post} showDate />
    </Container>
  );
}
