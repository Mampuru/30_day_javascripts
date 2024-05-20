// import { signIn, signOut, useSession } from 'next-auth/client';
// import { Nav } from 'next/navigation'; // Importing Nav from next/navigation
import {SignupForm } from './pages/signup'

export default function Home() {
  // const [session, loading] = useSession();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   await signIn('credentials', { redirect: false, username, password });
  //   Nav.push('/bookings'); // Using Nav from next/navigation instead of direct router import
  // };

  // const handleLogout = async () => {
  //   await signOut();
  //   Nav.replace('/'); // Using Nav from next/navigation instead of direct router import
  // };

  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SignupForm />
    </div>
  );
}
