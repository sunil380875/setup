// export default function Home() {
//   return (
//     <>Home</>
//   );
// }


import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signin");
}