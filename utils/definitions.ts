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
  access_code?: string;
};

export type ProjectTypeSECONDARY = {
  project_id: string;
  project_title: string;
  role : string;
  owner_image : string;
  owner_username : string;
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


// export type ProjectTileProps = {
//   project: ProjectTypePRIMARY;
// }

export type ProjectTileProps = {
  project: ProjectTypeSECONDARY;
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

export type BugTypePRIMARY = {
  bug_id?: string,
  project_id?: string,
  creator_id?: string,
  title: string,
  description: string,
  status: "Open" | "In Progress"| "Closed",
  priority: "Low" | "Medium"| "High" | "Critical",
  severity: "Minor" | "Moderate"| "Major" | "Critical",
  environment: string,
  is_user_reported: boolean,
  attachment?: string,
  created_at?: string,
  updated_at?: string,
}

export type BugFormProps = {
  type: string;
  submitting: boolean;
  bug: BugTypePRIMARY;
  setBug: React.Dispatch<React.SetStateAction<BugTypePRIMARY>>; 
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ProviderProps {
  children: React.ReactNode;
  session?: Session;
}

export type JoinRequestType = {
  id? : number;
  user_id : string;
  project_id : string;
  status? : "Pending" | "Approved" | "Denied";
  created_at?: string;
}

export type UserJoinRequestType = {
  joinrequest_id: number;
  project_id: string;
  user_id: string;
  email: string;
  username: string;
  image: string;
}