import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
