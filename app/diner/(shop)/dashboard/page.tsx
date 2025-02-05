
import Menu from "@/components/dashboard/Menu";
import RecentOrders from "@/components/dashboard/RecentOrders";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col">
      <RecentOrders />
      <Menu />
    </div>
  );
}
