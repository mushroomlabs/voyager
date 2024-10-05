import React, {
  RefObject,
  createContext,
  useState,
} from "react";

enum AccountRegistrationType {
  NewAccount,
  ExistingAccount,
  RedditMigration
}

interface IOnboardingContext {
  pageRef: RefObject<HTMLElement | undefined> | undefined;
  hasLemmyAccount: boolean | undefined;
  hasRedditAccount: boolean | undefined;
};

export const OnboardingContext = createContext<IOnboardingontext>({
  pageRef: undefined,
  hasLemmyAccount: undefined,
  hasRedditAccount: undefined
});
