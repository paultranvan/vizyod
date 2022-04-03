import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Query from './Query'
import { sleep, measure, activity } from '../models/models'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Query model={sleep} />
        <Query model={measure} />
        <Query model={activity} />
      </QueryClientProvider>
    </>
  )
}

export default App
