import { SecondaryFooter } from "@/components/navigation/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SecondaryFooter />
    </>
  );
}
