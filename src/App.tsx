import InspectionForm from './InspectionForm';
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main>
      <h1>{user?.signInDetails?.loginId ?? 'User'}'s Inspection</h1>
      <InspectionForm />
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
