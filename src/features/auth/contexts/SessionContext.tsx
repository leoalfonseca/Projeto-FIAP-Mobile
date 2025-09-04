import { createContext, ReactNode, useEffect, useState } from 'react';

import { Project } from '@/shared/model/Project';
import { User } from '@/shared/model/User';

export interface SessionContextInterface {
  user: User;
  needRefetch: boolean;
  project: Project | null;
  selectProject: (project: Project) => void;
  setUser: (user: User) => void;
  setNeedRefetch: () => void;
}

export const SessionContext = createContext<SessionContextInterface>({} as SessionContextInterface);

export function SessionProvider({
  user: userInput,
  project: projectInput,
  children
}: {
  user: User | null;
  project?: Project;
  children: ReactNode;
}) {
  const [user, setUserState] = useState<User>(userInput ?? ({} as User));
  const [needRefetch, setNeedRefetchState] = useState<boolean>(false);

  const [project, setProject] = useState<Project | null>(projectInput || null);

  useEffect(() => {
    setProject(projectInput ?? null);
  }, [projectInput]);

  function selectProject(project: Project) {
    setProject(project);
  }

  function setUser(user: User) {
    setUserState(user);
  }

  function setNeedRefetch() {
    setNeedRefetchState(true);
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        needRefetch,
        setNeedRefetch,
        project,
        selectProject
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
