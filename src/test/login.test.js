import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Login } from "../pages/login";
import { MainContext } from '../contexts/mainContext';
import { MemoryRouter } from 'react-router';

describe('<Login>',()=>{
    let component

    beforeEach(()=>{
        const  MainContextValue= { setUsuario:()=>{},setPassword:()=>{}, usuario:"", password:"" };
        component = render(
        <MainContext.Provider value={MainContextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Login/>
            </MemoryRouter>
        </MainContext.Provider>
        )
    })
    
    test('renderizar login', () => {
        expect(component).toBeDefined();
    })

    test('renderizar componentes login', () => {
        expect(component.getByPlaceholderText("Correo")).toBeDefined();
        expect(component.getByPlaceholderText("Contraseña")).toBeDefined();
        expect(component.getByText("Login")).toBeDefined();
    })

    test('funcionamiento boton',()=>{
        const button = component.getByText("Login")
        fireEvent.click(button)
    })
    
})
