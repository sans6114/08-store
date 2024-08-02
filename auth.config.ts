import {
  db,
  eq,
  User,
} from 'astro:db';
//import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';

export default defineConfig({
    providers: [
        // GitHub({
        //   clientId: import.meta.env.GITHUB_CLIENT_ID,
        //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        // }),
        Credentials({
            credentials: {
                email: { label: 'Correo', type: 'email' },
                password: { label: 'Contraseña', type: 'password' }
            },
            authorize: async ({ email, password }) => {


                const [user] = await db.select().from(User).where(eq(User.email, email as string))

                if (!user) {
                    throw new Error('error en login')
                }
                if (!bcrypt.compareSync(password as string, user.password)) {
                    throw new Error('Contraseña incorrecta')
                }


                const { password: _, ...rest } = user
                //console.log(rest)
                return rest
            }
        })
    ],

    callbacks: {

        jwt: ({ token, user }) => {

            if (user) {
                token.user = user
            }


            return token
        },


        session: ({ session, token }) => {
            //console.log(session)
            session.user = token.user as AdapterUser
            return session
        }

    }
});