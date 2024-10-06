
import { useTheme } from '../context/ThemeContext'
import { Button } from '@/components/ui/button'

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  )
}

export default ThemeToggleButton
