import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../modules/auth/redux/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers;
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    console.log("Mandando el refresh token")

    const refreshResult = await baseQuery('/api/v1/auth/refresh', api, extraOptions)
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      api.dispatch(setCredentials({...refreshResult.data, user}))

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut())
    }
  }

  return result;
}

export const apiSlide = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})
