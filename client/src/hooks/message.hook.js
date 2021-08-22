import {useCallback} from 'react'
// custom hook to work with messages
export const useMessage = () => {
    return useCallback( text => {
        if (window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}