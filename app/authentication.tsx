'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface Props {
    children: React.ReactNode
}

/**
 * AuthenticationProvider component provides authentication functionality to its children components.
 * It checks if the user is authenticated and if the account is disconnected.
 * If the account is disconnected, it signs out the user.
 *
 * For example, if user wallet is locked or disconnected.
 *
 * @component
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const AuthenticationProvider: React.FC<Props> = ({ children }) => {
    const { isDisconnected } = useAccount()
    const { status } = useSession()
    const router = useRouter()

    const isMetaMaskUnlocked = async (): Promise<boolean> => {
        const u = await window.ethereum?._metamask.isUnlocked()
        return u
    }
    useEffect(() => {
        isMetaMaskUnlocked().then(u => {
            if (status === 'loading') return

            if (status == 'authenticated' && (isDisconnected || !u)) {
                localStorage.clear()
                signOut()
            }
            if (status == 'authenticated' && (!isDisconnected || u)) {
                router.refresh()
            }
            if (status == 'unauthenticated' && !isDisconnected) {
                localStorage.clear()
            }
        })
    }, [isDisconnected, status, router])

    return <>{children}</>
}
export default AuthenticationProvider
