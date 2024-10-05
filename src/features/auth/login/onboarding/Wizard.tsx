import React, { useState, createContext } from "react";
import { IonContent, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import BaseSvg from "./assets/base.svg?react";
import AndroidClose from "./AndroidClose";
import { styled } from "@linaria/react";
import AppHeader from "../../../shared/AppHeader";

// slot attribute not allowed for some reason??
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = any;

const StyledIonContent = styled(IonContent)`
  &::part(scroll) {
    z-index: 1;

    display: flex;
    flex-direction: column;
  }

  --background: linear-gradient(0deg, #bfd5ff, #e3edff 33%, #ffff);

  .ion-palette-dark & {
    --background: linear-gradient(0deg, #001233ff, #000a1c 33%, #0000);
  }
`;

const StyledBaseSvg = styled(BaseSvg)`
  opacity: 0.4;
  margin: 0 -2rem;
  position: absolute;
  bottom: 0;

  pointer-events: none;

  filter: brightness(2.7);

  .ion-palette-dark & {
    filter: none;
  }
` as AnyComponent;

const TopSpacer = styled.div`
  flex: 2;
`;

const BottomSpacer = styled.div`
  flex: 7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  margin: 2rem;

  margin-top: auto;
`;

const Question = styled.div`
  flex: 2;
  font-size: 1.25em;
  gap: 0.5rem;
  margin: 2rem;
  margin-top: auto;
  text-align: center;

`;

enum AccountSetupOptions {
  NewAccount,
  ExistingAccount,
};


function () {
  const hasAnswered = () => {
    return newAccount !== null || existingAccount !== null;
  }

  return (
    <NewOrExistingAccountPromptContext.Provider hasAnswered={hasAnswered}>
      <TopSpacer />
      <Question>
        Do you already have the account?
      </Question>
      <Container>
        <IonButton
          expand="block"
          onClick={() => setExistingAccount(true)}
        >
          I have an account
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => setNewAccount(true)}
        >
          I am new
        </IonButton>
      </Container>
      <BottomSpacer />
    </>
  );
}

const SignInExistingAccount() {
    return (
        <>
            </>
    )
};


export default function Wizard() {
    const [newAccount, setNewAccount] = useState(null);
  const [existingAccount, setExistingAccount] = useState(null);


  return (
    <>
      <AppHeader>
        <IonToolbar>
          <IonTitle>Account Setup</IonTitle>

          <AndroidClose />
        </IonToolbar>
      </AppHeader>
      <StyledIonContent fullscreen>
        <AppHeader collapse="condense">
          <IonToolbar color=" ">
            <IonTitle size="large">Add Account</IonTitle>
          </IonToolbar>
        </AppHeader>

        <StyledBaseSvg slot="fixed" />
        <NewOrExistingAccountPrompt />
      </StyledIonContent>
    </>
  );
}
