/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useState } from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import { useWebPubSub } from 'webpubsub-react'

export const Time = () => {
    const webpubsub = useWebPubSub()
    const [isLoading, setLoadingState] = useState<boolean>(false)
    const [time, setTime] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handlePress = useCallback(async () => {
        setLoadingState(true)
        try {
            const { timetoken } = await webpubsub.time()

            setError(null)
            setTime(timetoken)
        } catch (error) {
            setTime(null)
            setError(error.message)
        } finally {
            setLoadingState(false)
        }
    }, [])

    let textComponent

    if (isLoading) {
        textComponent = (
            <Text style={[styles.viewItem, styles.loading]}>Loading...</Text>
        )
    } else if (error !== null) {
        textComponent = (
            <Text style={[styles.viewItem, styles.error]}>
                An error has occured: {error}
            </Text>
        )
    } else if (time) {
        textComponent = (
            <>
                <Text style={styles.viewItem}>
                    Current WebPubSub time is {time}
                </Text>
            </>
        )
    }

    return (
        <>
            <Button
                disabled={isLoading}
                title="get current webpubsub time"
                onPress={handlePress}
            />
            {textComponent}
        </>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        padding: 32
    },

    error: {
        color: 'red'
    },

    loading: {
        color: 'rgb(200, 200, 200)'
    }
})
