import { styled } from "@linaria/react";
import { useAppSelector } from "../../../../store";
import { IonButton, IonNavLink, IonSpinner } from "@ionic/react";
import PickJoinServer from "../pickJoinServer/PickJoinServer";
import LearnMore from "../LearnMore";
import PickLoginServer from "../login/PickLoginServer";
import useStartJoinFlow from "../pickJoinServer/useStartJoinFlow";


export function NewOrExistingAccountPrompt() {
  return (
    <>
      <TopSpacer />
      <Question>
        Do you already have the account?
      </Question>
      <Container>
        <IonButton
          expand="block"
          onClick={() => console.log("Existing")}
        >
          I have an account
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => console.log("New")}
        >
          I am new
        </IonButton>
      </Container>
      <BottomSpacer />
    </>
  );
}
