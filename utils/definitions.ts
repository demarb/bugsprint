// Typescript types that will be returned from the database
// Recommendation: Prisma, which automatically generates types based on your database schema.
import { Session } from 'next-auth'

export type ProjectType = {
    id: string;
    title: string;
    owner: string;
  };

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