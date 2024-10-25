import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  redirect(
    "https://airtable.com/appYIG35eAHZmzkqz/shrWZZEal9dtF1YqN",
    RedirectType.replace
  );

  return <>Join our team</>;
}
