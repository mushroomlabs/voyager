import { IonButton, IonIcon } from "@ionic/react";
import { styled } from "@linaria/react";
import { noop } from "es-toolkit";
import { checkmark, ellipsisVertical, removeCircle } from "ionicons/icons";
import React, { createContext, useContext, useRef, useState } from "react";

import { isIosTheme } from "#/helpers/device";

export function ListEditorProvider({ children }: React.PropsWithChildren) {
  const [editing, setEditing] = useState(false);

  return (
    <ListEditorContext.Provider value={{ editing, setEditing }}>
      {children}
    </ListEditorContext.Provider>
  );
}

interface ListEditorContextValue {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListEditorContext = createContext<ListEditorContextValue>({
  editing: false,
  setEditing: noop,
});

export function ListEditButton() {
  const { editing, setEditing } = useContext(ListEditorContext);

  return (
    <IonButton
      onClick={(e) => {
        setEditing((editing) => {
          if (e.target instanceof HTMLElement) {
            e.target
              .closest(".ion-page")
              ?.querySelectorAll("ion-list")
              .forEach((l) => l.closeSlidingItems());
          }

          return !editing;
        });
      }}
    >
      {(() => {
        if (isIosTheme()) {
          if (!editing) return "Edit";
          return "Done";
        }

        return <IonIcon icon={!editing ? ellipsisVertical : checkmark} />;
      })()}
    </IonButton>
  );
}

const RemoveIcon = styled(IonIcon)`
  position: relative;
  font-size: 1.6rem;

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: white;
  }
`;

export function RemoveItemButton() {
  const { editing } = useContext(ListEditorContext);
  const ref = useRef<HTMLIonButtonElement>(null);

  if (!editing) return;

  return (
    <IonButton
      color="none"
      slot="start"
      ref={ref}
      onClick={(e) => {
        if (!(e.target instanceof HTMLElement)) return;

        const slider = e.target.closest("ion-item-sliding");
        if (!slider) return;

        slider.open("end");
      }}
    >
      <RemoveIcon icon={removeCircle} color="danger" slot="icon-only" />
    </IonButton>
  );
}
