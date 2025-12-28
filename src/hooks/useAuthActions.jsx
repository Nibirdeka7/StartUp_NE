// import { useState } from 'react';
// import { supabase } from '../utils/supabaseClient';
// import { useAuth } from '../contexts/AuthContext';

// export const useAuthActions = () => {
//   const { setShowAuthModal, setAuthRedirect } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const signOut = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       return { success: true };
//     } catch (error) {
//       console.error('Error signing out:', error);
//       return { success: false, error };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showLoginModal = (redirectTo = null) => {
//     setAuthRedirect(redirectTo);
//     setShowAuthModal(true);
//   };

//   const hideAuthModal = () => {
//     setShowAuthModal(false);
//     setAuthRedirect(null);
//   };

//   return {
//     signOut,
//     showLoginModal,
//     hideAuthModal,
//     loading
//   };
// };