import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Serie from './Serie'
import { sleep, measure } from '../models/models'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Serie model={sleep} />
        <Serie model={measure} />
      </QueryClientProvider>
    </>
  )
}

export default App
