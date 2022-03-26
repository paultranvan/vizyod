import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";

import SleepGraph from './SleepGraph'
import MeasuresGraph from './MeasuresGraph'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SleepGraph />
        <MeasuresGraph />
      </QueryClientProvider>
    </>
  )
}


export default App;
