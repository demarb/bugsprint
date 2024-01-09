// Typescript types that will be returned from the database
// Recommendation: Prisma, which automatically generates types based on your database schema.


export type ProjectType = {
    id: string;
    title: string;
    owner: string;
  };