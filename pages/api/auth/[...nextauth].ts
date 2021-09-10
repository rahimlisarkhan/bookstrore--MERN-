import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectDataBase, documentFindDataBase } from '../../../db/mongoDB'
import { verifyPassword } from '../../../utils/const-util'


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials: any) {
                const client = await connectDataBase()

                const user = await documentFindDataBase(client, 'users', { email: credentials.email })
                console.log(user);
                

                if (!user) {    
                    client.close()
                    throw new Error('User not found')
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if (!isValid) {
                    client.close()
                    throw new Error('Could not log you in')
                }

                client.close()

                return {email:user.email,id:user._id }
            }
        })
    ]
})