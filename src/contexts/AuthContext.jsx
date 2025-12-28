// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { supabase } from '../utils/supabaseClient';

// const AuthContext = createContext({});

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authRedirect, setAuthRedirect] = useState(null);

//   useEffect(() => {
//     // Check active sessions and subscribe to auth changes
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session);
//         setUser(session?.user ?? null);
//         setLoading(false);
        
//         if (event === 'SIGNED_IN') {
//           // Fetch user profile from your users table
//           if (session?.user) {
//             const { data: profile } = await supabase
//               .from('users')
//               .select('*')
//               .eq('id', session.user.id)
//               .single();
            
//             setUser(prev => ({ ...prev, profile }));
//           }
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   const requireAuth = (redirectTo = null) => {
//     if (!user) {
//       setAuthRedirect(redirectTo);
//       setShowAuthModal(true);
//       return false;
//     }
//     return true;
//   };

//   const value = {
//     user,
//     session,
//     loading,
//     showAuthModal,
//     setShowAuthModal,
//     requireAuth,
//     authRedirect,
//     setAuthRedirect
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };