# README for Secret Diary
-----

Welcome to the super secure secret diary system! 

To begin, please make an account! 

be sure to remember your username and password, you wouldn't want to get logged out of your own journal. 

-----

## Setup:
required dependencies: 
- supabase
- @supabase/supabase-js
- zod
- @hookform/resolvers

Supabase:
Basic Supabase project used for authentication only. Enable email sign-up/sign-in, disable email confirmation for testing purposes.
.env.local file required with Supabase url stored to EXPO_PUBLIC_SUPABASE_URL and public key stored to EXPO_PUBLIC_SUPABASE_ANON_KEY.
Sign-up will prompt for user name, saved to Supabase user table in display name column.
All test accounts used are [name]@test.com. 
