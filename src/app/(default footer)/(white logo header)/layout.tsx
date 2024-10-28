import { Header } from "@/components/navigation/header";
import { AOSProvider } from "../../../../providers/aos";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AOSProvider>
      <Header variant='white' />
      {children}
    </AOSProvider>
  );
}
