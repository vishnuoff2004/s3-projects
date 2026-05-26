import Auth from "./context-api/authContext"
import AppRoutes from "./routes/AppRoutes"

function App() {

  return (
    <>
    <Auth>
      <AppRoutes></AppRoutes>
    </Auth>
    </>
  )
}

export default App
