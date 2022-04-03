import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Query from './Query'
import { sleep, measure, activity, heartRate } from '../models/models'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Query model={sleep} />
        <Query model={measure} />
        <Query model={activity} />
        <Query model={heartRate} />
      </QueryClientProvider>
    </>
  )
}

export default App
