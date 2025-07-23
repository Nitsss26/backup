
import { AdminBookListings } from "@/components/admin/AdminBookListings";

export default function AdminBooksPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold font-headline">Book Management</h1>
      <AdminBookListings />
    </div>
  );
}
