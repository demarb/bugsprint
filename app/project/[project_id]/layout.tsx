import Sidebar from '@/components/Sidebar';
 
export default function Layout({ children, params }: { children: React.ReactNode,  params: { "project_id": string }}) {
    // { params }: { params: { "project_id": string } }
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar project_id={params.project_id} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}