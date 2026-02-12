import { PaletteIcon } from 'lucide-react'
import { THEMES } from '../constants'
import { useThemeStore } from '../store/useThemeStore'

const ThemeSelector = () => {
   const {  theme, setTheme} = useThemeStore()

 
   
  return (
    <div className='dropdown dropdown-end'>
          <button tabIndex={0} className='btn  btn-ghost btn-circle'>
              <PaletteIcon size={15}/>
              </button>
          <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10'>
              {THEMES.map((themeOption) => (
                  <button
                      key={themeOption.name}
                      onClick={() => { setTheme(themeOption.name) }}
                      className={ `w-full cursor-pointer px-4 py-3 rounded-xl flex items-center gap-3  transition-colors ${theme === themeOption.name ? 'bg-base-content/10' : 'hover:bg-base-content/5' }`}>
                      <PaletteIcon size={14} />
                      <span className='text-sm font-medium'>{themeOption.name}</span>
                      <div className='ml-auto flex gap-1 '>
                          {themeOption.colors.map((color) => (
                              <span
                                  key={color}
                                  className={`size-2 rounded-full `}
                                  style={{backgroundColor:color}}
                              ></span>
                          ))}
                          
                      </div>
                  </button>))}
              
      </div>
    </div>
  )
}

export default ThemeSelector
