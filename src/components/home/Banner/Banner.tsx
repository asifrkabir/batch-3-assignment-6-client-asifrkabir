import Link from "next/link";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner_container}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-default">
        <h1 className="text-4xl font-bold text-black text-center">
          Welcome to Pawfect!
        </h1>
        <p className="mt-4 text-lg text-black text-center">
          Your go-to platform for pet care tips, stories, and nutrition needs.
        </p>
        <div className="mt-8">
          <Link
            href="/user-dashboard/news-feed"
            className="px-4 py-2 text-black bg-[#FCBE4F] rounded hover:bg-[#e6a93c] transition"
          >
            Go to Newsfeed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
