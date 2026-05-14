import { createContext, useContext, createElement } from 'react';

const OrganizerEventsContext = createContext();

export function OrganizerEventsProvider({ children, value }) {
  // Usiamo createElement invece del tag <Context.Provider> per evitare il JSX
  // in un file .js ed evitare problemi con il Fast Refresh di Vite.
  return createElement(OrganizerEventsContext.Provider, { value }, children);
}

export function useOrganizerEventsContext() {
  const context = useContext(OrganizerEventsContext);
  if (!context) {
    throw new Error("useOrganizerEventsContext deve essere usato all'interno di OrganizerEventsProvider");
  }
  return context;
}
