import {useAppSelector} from "../service/redux-hooks";
export const IsAuth = () => {
    const isAuth = Boolean(useAppSelector((state) => state.users.token))
    return (
        <>
            <IsAuth />
        </>
    )
}
