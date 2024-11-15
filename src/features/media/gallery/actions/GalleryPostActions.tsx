import { Share } from "@capacitor/share";
import { IonIcon } from "@ionic/react";
import { styled } from "@linaria/react";
import { StashMedia } from "capacitor-stash-media";
import { chatbubbleOutline } from "ionicons/icons";
import { PostView } from "lemmy-js-client";
import React, { useContext } from "react";
import { useLocation } from "react-router";

import { InFeedContext } from "#/features/feed/Feed";
import MoreActions from "#/features/post/shared/MoreActions";
import { VoteButton } from "#/features/post/shared/VoteButton";
import { buildPostLink } from "#/helpers/appLinkBuilder";
import { getShareIcon, isNative } from "#/helpers/device";
import { useBuildGeneralBrowseLink } from "#/helpers/routes";
import useAppToast from "#/helpers/useAppToast";
import { useOptimizedIonRouter } from "#/helpers/useOptimizedIonRouter";
import { calculateSeparateScore, calculateTotalScore } from "#/helpers/vote";
import { OVoteDisplayMode } from "#/services/db";
import { useAppSelector } from "#/store";

import { GalleryContext } from "../GalleryProvider";
import AltText from "./AltText";
import GalleryActions from "./GalleryActions";
import { BottomContainer, BottomContainerActions } from "./shared";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5em;

  max-width: 600px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Amount = styled.div`
  font-size: 1rem;
`;

interface GalleryPostActionsProps {
  post: PostView;
  imgSrc: string;
  alt?: string;
}

export default function GalleryPostActions({
  post,
  imgSrc,
  alt,
}: GalleryPostActionsProps) {
  const buildGeneralBrowseLink = useBuildGeneralBrowseLink();
  const router = useOptimizedIonRouter();
  const location = useLocation();
  const presentToast = useAppToast();
  const { close } = useContext(GalleryContext);

  async function shareImage() {
    if (!isNative()) {
      Share.share({ url: imgSrc });
      return;
    }

    try {
      await StashMedia.shareImage({
        url: imgSrc,
        title: post.post.name,
      });
    } catch (error) {
      presentToast({
        message: "Error sharing photo",
        color: "danger",
        position: "top",
        fullscreen: true,
      });

      throw error;
    }
  }

  return (
    <BottomContainer>
      <AltText alt={alt} />
      <BottomContainerActions withBg>
        <Container onClick={(e) => e.stopPropagation()}>
          <Voting post={post} imgSrc={imgSrc} />
          <div
            onClick={() => {
              close();

              const link = buildGeneralBrowseLink(
                buildPostLink(post.community, post.post),
              );

              if (!location.pathname.startsWith(link)) router.push(link);
            }}
          >
            <Section>
              <IonIcon icon={chatbubbleOutline} />
              <Amount>{post.counts.comments}</Amount>
            </Section>
          </div>
          <IonIcon icon={getShareIcon()} onClick={shareImage} />
          {isNative() ? (
            <GalleryActions post={post} imgSrc={imgSrc} />
          ) : (
            <InFeedContext.Provider value={true}>
              <MoreActions post={post} />
            </InFeedContext.Provider>
          )}
        </Container>
      </BottomContainerActions>
    </BottomContainer>
  );
}

function Voting({ post }: GalleryPostActionsProps): React.ReactElement {
  const postVotesById = useAppSelector((state) => state.post.postVotesById);

  const voteDisplayMode = useAppSelector(
    (state) => state.settings.appearance.voting.voteDisplayMode,
  );

  switch (voteDisplayMode) {
    case OVoteDisplayMode.Total: {
      const score = calculateTotalScore(post, postVotesById);

      return (
        <Section>
          <VoteButton type="up" post={post} />
          <Amount>{score}</Amount>
          <VoteButton type="down" post={post} />
        </Section>
      );
    }
    case OVoteDisplayMode.Separate: {
      const { upvotes, downvotes } = calculateSeparateScore(
        post,
        postVotesById,
      );

      return (
        <Section>
          <VoteButton type="up" post={post} />
          <Amount>{upvotes}</Amount>
          <VoteButton type="down" post={post} />
          <Amount>{downvotes}</Amount>
        </Section>
      );
    }
    case OVoteDisplayMode.Hide:
      return (
        <Section>
          <VoteButton type="up" post={post} />
          <VoteButton type="down" post={post} />
        </Section>
      );
  }
}
