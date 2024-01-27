// Typescript types that will be returned from the database
// Recommendation: Prisma, which automatically generates types based on your database schema.
import { Session } from 'next-auth'

export type ProjectType = {
    id: string;
    title: string;
    owner: string;
  };

export type ProjectTypePRIMARY = {
  project_id?: string;
  owner_id?: string;
  title: string;
  description : string;
  industry : string;
  client : string;
  additional_notes  : string;
  created_at?: string;
};

export type ProjectFormProps = {
    type: string;
    submitting: boolean;
    project: ProjectTypePRIMARY;
    setProject: React.Dispatch<React.SetStateAction<ProjectTypePRIMARY>>; 
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

// export type ProjectTileProps = {
//   project: ProjectType;
// }


export type ProjectTileProps = {
  project: ProjectTypePRIMARY;
}

// export type BugType = {
//   id: string,
//   title: string,
//   status: string,
//   priority: string,
//   severity: string,
//   creator: string,
//   created_at: string,
//   assignees: [
//     {
//       name: string,
//     },
//     {
//       name: string,
//     },
//   ],
//   customer_reported: boolean,
// };

export type BugType = {
  id: string,
  title: string,
  status: string,
  priority: string,
  severity: string,
  creator: string,
  created_at: string,
  assignees: string,
  customer_reported: boolean,
};

export interface ProviderProps {
  children: React.ReactNode;
  session?: Session;
}