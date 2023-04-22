import AuthCheck from "@/components/AuthCheck";
import Head from "next/head";

export default function AdminPostsPage({ }) {
  return (
    <main>
      <AuthCheck>
        <Head>
          <title></title>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@SB_dev" />
        </Head>
        <h1>Admin posts</h1>
      </AuthCheck>
    </main>
  )
}