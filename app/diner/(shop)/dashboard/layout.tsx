import ProcessOrder from "@/components/dashboard/ProcessOrder";

export const metadata = {
  title: "BB Bunch",
  description: "Grab a Bunch, Start Your Day Right.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:grid md:grid-cols-4 w-full h-[89vh]">
      <div className="md:col-span-3">
        {children}
      </div>

      <div className="border-l p-2 hidden md:block">
        <ProcessOrder />
      </div>
    </div>
  );
}
