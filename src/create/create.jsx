import React from "react";

import { Created } from './created';
import { PendingCreation } from './pendingCreation';
import { CreatedState } from './createdState';

export function Create() {
    const [createdState, setCreatedState] = React.useState(CreatedState.Pending);  

    return (
      <main>
        {createdState === CreatedState.Pending && (
          <PendingCreation onCreate={() => setCreatedState(CreatedState.Created)}/>
        )}
        {createdState === CreatedState.Created && (
          <Created onRefresh={() => setCreatedState(CreatedState.Pending)} />
        )

        }
      </main>
    );
}