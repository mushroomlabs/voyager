import { IonItem } from "@ionic/react";
import { styled } from "@linaria/react";
import { heart } from "ionicons/icons";
import { CommunityView } from "lemmy-js-client";

import Ago from "#/features/labels/Ago";
import CommunityLink from "#/features/labels/links/CommunityLink";
import { ActionButton } from "#/features/post/actions/ActionButton";
import { maxWidthCss } from "#/features/shared/AppContent";
import InlineMarkdown from "#/features/shared/markdown/InlineMarkdown";
import { buildCommunityLink } from "#/helpers/appLinkBuilder";
import { formatNumber } from "#/helpers/number";
import { useBuildGeneralBrowseLink } from "#/helpers/routes";

import { ToggleIcon } from "./ToggleIcon";
import useCommunityActions from "./useCommunityActions";

const CustomIonItem = styled(IonItem)`
  --padding-start: 0;
  --inner-padding-end: 0;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCommunityLink = styled(CommunityLink)`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

  ${maxWidthCss}
`;

const Stats = styled.div`
  font-size: 0.9rem;
  color: var(--ion-color-medium);
`;

const Description = styled.div`
  font-size: 0.875em;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface CommunitySummaryProps {
  community: CommunityView;
}

export default function CommunitySummary({ community }: CommunitySummaryProps) {
  const buildGeneralBrowseLink = useBuildGeneralBrowseLink();
  const { isSubscribed, subscribe } = useCommunityActions(
    community.community,
    community.subscribed,
  );

  return (
    <CustomIonItem
      routerLink={buildGeneralBrowseLink(
        buildCommunityLink(community.community),
      )}
      detail={false}
    >
      <Contents>
        <Title>
          <StyledCommunityLink
            community={community.community}
            showInstanceWhenRemote
            subscribed={community.subscribed}
            hideSubscribed
          />
          <RightContainer>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                subscribe();
              }}
            >
              <ToggleIcon icon={heart} selected={isSubscribed} />
            </ActionButton>
          </RightContainer>
        </Title>
        <Stats>
          {formatNumber(community.counts.subscribers)} Subscriber
          {community.counts.subscribers !== 1 ? "s" : ""} ·{" "}
          <Ago date={community.community.published} /> Old{" "}
        </Stats>
        {community.community.description && (
          <Description>
            <InlineMarkdown>{community.community.description}</InlineMarkdown>
          </Description>
        )}
      </Contents>
    </CustomIonItem>
  );
}
