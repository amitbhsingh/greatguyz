import {render,screen} from '@testing-library/react'
import { describe,it } from 'vitest'
import {WrappedApp,App} from './App';
import { MemoryRouter } from 'react-router-dom';
// import NotFound from './pages/NotFound';



describe('App',()=>{
  it('Renders hello world', ()=>{
    render(<WrappedApp />)
    expect(
      screen.getByRole('heading',{
      level: 1,
    })
    ).toHaveTextContent('Hello World');
  });
  it('Renders not found if inavlid path', ()=>{
    <MemoryRouter initialEntries={['/banana']} >
      <App />
    </MemoryRouter>

  })
})