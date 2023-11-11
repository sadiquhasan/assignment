import Layout from "./Layout";
import { useRouter } from 'next/router';


const Home = () => {

  const router = useRouter();
  return (
    <Layout>
      <div
        style={{ height: '70vh' }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-12 text-white flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to Kaban Portal</h1>
        <p className="text-lg mb-6 text-center">
          Elevate your experience with our innovative solutions. Explore the possibilities and unlock
          new horizons.
        </p>
        <div className="flex space-x-4">
          <button onClick={() => router.push('/kabanBoard')} className="bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300">
            Kaban Board
          </button>
          <button className="bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </Layout>
  );
};


export default Home;
